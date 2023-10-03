import { Response, NextFunction } from "express";
import { IRequestUser } from "../../models/user.model";
import { validationResult } from "express-validator";
import * as receivableService from "../../services/receivable.service";
import { addAtTotalReceivable, removeAtTotalReceivable } from "../../services/client.service";
import { convertDateToISO8601 } from "../../utils/dateFormat.util";
import { IReceivable, IGetFilteredReceivables } from "../../models/receivable.model";
import { updateStatusDocument } from "../../services/document.service";

export const createReceivable = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "Les données envoyées sont incorrectes",
      errors: errors.array(),
    });
  }

  const user_id = req.user.id;

  const {
    client_id = null,
    client_name,
    name,
    amount,
    status,
    comment = null
  }: IReceivable = req.body;

  const dueDate = convertDateToISO8601(req.body.dueDate);

  try {
    const receivable = await receivableService.createReceivable({
      user_id,
      client_id,
      client_name,
      name,
      amount,
      dueDate,
      status,
      comment
    });

    if (status === "pending" && client_id !== null) {
      await addAtTotalReceivable(user_id, client_id, amount);
    }

    return res.status(201).json({
      message: "Créance créée",
      receivable: receivable,
    });
  } catch (err) {
    next(err);
  }
}

export const getFilteredReceivables = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "Les données envoyées sont incorrectes",
      errors: errors.array(),
    });
  }

  const user_id = req.user.id;
  const {
    skip = 0,
    take = 10,
    search = "",
    status = "",
    orderBy = "createdAt",
    order = "desc"
  }: IGetFilteredReceivables = req.body;

  try {
    const receivables = await receivableService.getFilteredReceivables({
      user_id,
      skip,
      take,
      search,
      status,
      orderBy,
      order
    })

    return res.status(200).json({
      message: "Créances récupérées",
      receivables: receivables
    });
  } catch (err) {
    next(err);
  }
}

export const getReceivable = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const user_id = req.user.id;
  const receivable_id = parseInt(req.params.id);

  try {
    const receivable = await receivableService.getReceivable(user_id, receivable_id);

    return res.status(200).json({
      message: "Créance récupérée",
      receivable: receivable
    });
  } catch (err) {
    next(err);
  }
}

export const updateReceivable = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const user_id = req.user.id;
  const receivable_id = parseInt(req.params.id);

  const {
    client_name,
    name,
    amount,
    status,
    comment,
  }: Partial<IReceivable> = req.body;

  let dueDate: string;
  if (req.body.dueDate) {
    dueDate = convertDateToISO8601(req.body.dueDate);
  }

  try {
    const oldReceivable = await receivableService.getReceivable(user_id, receivable_id);

    if (oldReceivable[0].document_id !== null && amount !== undefined) {
      return res.status(422).json({
        code: 401,
        message: "Vous ne pouvez pas modifier le montant de la créance si un document est associé",
      });
    }

    if (amount && oldReceivable[0].amount !== amount) {
      if (status && oldReceivable[0].status !== status && oldReceivable[0].client_id) {
        if ((status === "paid" || status === "canceled") && oldReceivable[0].status === "pending") {
          await removeAtTotalReceivable(user_id, oldReceivable[0].client_id, oldReceivable[0].amount);
        } else if (status === "pending" && (oldReceivable[0].status === "paid" || oldReceivable[0].status === "canceled")) {
          await removeAtTotalReceivable(user_id, oldReceivable[0].client_id, oldReceivable[0].amount);
          await addAtTotalReceivable(user_id, oldReceivable[0].client_id, amount);
        }
      } else {
        if (oldReceivable[0].client_id) {
          await removeAtTotalReceivable(user_id, oldReceivable[0].client_id, oldReceivable[0].amount);
          await addAtTotalReceivable(user_id, oldReceivable[0].client_id, amount);
        }
      }
    } else {
      if (status && oldReceivable[0].status !== status && oldReceivable[0].client_id) {
        if ((status === "paid" || status === "canceled") && oldReceivable[0].status === "pending") {
          await removeAtTotalReceivable(user_id, oldReceivable[0].client_id, oldReceivable[0].amount);
        } else if (status === "pending" && (oldReceivable[0].status === "paid" || oldReceivable[0].status === "canceled")) {
          await addAtTotalReceivable(user_id, oldReceivable[0].client_id, oldReceivable[0].amount);
        }
      }
    }

    if (oldReceivable[0].status !== status && oldReceivable[0].document_id !== null) {
      await updateStatusDocument(user_id, oldReceivable[0].document_id, status)
    }

    const receivable = await receivableService.updateReceivable(user_id, receivable_id, {
      client_name,
      name,
      amount,
      dueDate,
      status,
      comment,
    });

    return res.status(200).json({
      message: "Créance modifiée",
      receivable: receivable
    });
  } catch (err) {
    next(err);
  }
}

export const deleteReceivable = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const user_id = req.user.id;
  const receivable_id = parseInt(req.params.id);

  try {
    const oldReceivable = await receivableService.getReceivable(user_id, receivable_id);

    if (oldReceivable[0].document_id !== null) {
      return res.status(422).json({
        code: 401,
        message: "Vous ne pouvez pas supprimer une créance si un document est associé",
      });
    }

    if (oldReceivable[0].status === "pending" && oldReceivable[0].client_id !== null) {
      await removeAtTotalReceivable(user_id, oldReceivable[0].client_id, oldReceivable[0].amount);
    }

    const deletedReceivable = await receivableService.deleteReceivable(user_id, receivable_id);

    return res.status(200).json({
      message: "Créance supprimée",
      receivable: deletedReceivable
    });
  } catch (err) {
    next(err);
  }
}