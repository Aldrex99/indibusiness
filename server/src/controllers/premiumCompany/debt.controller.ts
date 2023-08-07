import { Response, NextFunction } from "express";
import { IRequestUser } from "../../models/user.model";
import { validationResult } from "express-validator";
import * as debtService from "../../services/debt.service";
import { addAtTotalDebt, removeAtTotalDebt } from "../../services/supplier.service";
import { convertDateToISO8601 } from "../../utils/dateFormat.util";
import { IDebt, IGetFilteredDebts } from "../../models/debt.model";

export const createDebt = async (req: IRequestUser, res: Response, next: NextFunction) => {
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
    supplier_id = null,
    supplier_name,
    name,
    amount,
    status,
    renewalDate = null,
    renewalType = null,
    comment = null
  }: IDebt = req.body;

  const dueDate = convertDateToISO8601(req.body.dueDate);

  try {
    const debt = await debtService.createDebt({
      user_id,
      supplier_id,
      supplier_name,
      name,
      amount,
      dueDate,
      status,
      renewalDate,
      renewalType,
      comment
    });

    if (status === "pending" && supplier_id !== null) {
      await addAtTotalDebt(user_id, supplier_id, amount);
    }

    return res.status(201).json({
      message: "Dette créée",
      debt: debt,
    });
  } catch (err) {
    next(err);
  }
}

export const getFilteredDebts = async (req: IRequestUser, res: Response, next: NextFunction) => {
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
    isRenewable = false,
    orderBy = "createdAt",
    order = "asc"
  }: IGetFilteredDebts = req.body;

  try {
    const debts = await debtService.getFilteredDebts({
      user_id,
      skip,
      take,
      search,
      status,
      isRenewable,
      orderBy,
      order
    });

    return res.status(200).json({
      message: "Dette récupérées",
      debts: debts,
    });
  } catch (err) {
    next(err);
  }
}

export const getDebt = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const user_id = req.user.id;
  const debt_id = parseInt(req.params.id);

  try {
    const debt = await debtService.getDebt(user_id, debt_id);

    return res.status(200).json({
      message: "Dette récupérée",
      debt: debt,
    });
  } catch (err) {
    next(err);
  }
}

export const updateDebt = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const user_id = req.user.id;
  const debt_id = parseInt(req.params.id);

  const {
    supplier_name,
    name,
    amount,
    dueDate,
    status,
    renewalDate,
    renewalType,
    comment
  }: Partial<IDebt> = req.body;

  try {
    const oldDebt = await debtService.getDebt(user_id, debt_id);

    console.log(oldDebt);

    if (amount && oldDebt[0].amount !== amount) {
      if (status && oldDebt[0].status !== status && oldDebt[0].supplier_id) {
        if ((status === "paid" || status === "canceled") && oldDebt[0].status === "pending") {
          await removeAtTotalDebt(user_id, oldDebt[0].supplier_id, oldDebt[0].amount);
        } else if (status === "pending" && (oldDebt[0].status === "paid" || oldDebt[0].status === "canceled")) {
          await removeAtTotalDebt(user_id, oldDebt[0].supplier_id, oldDebt[0].amount);
          await addAtTotalDebt(user_id, oldDebt[0].supplier_id, amount);
        }
      } else {
        if (oldDebt[0].supplier_id) {
          await removeAtTotalDebt(user_id, oldDebt[0].supplier_id, oldDebt[0].amount);
          await addAtTotalDebt(user_id, oldDebt[0].supplier_id, amount);
        }
      }
    } else {
      if (status && oldDebt[0].status !== status && oldDebt[0].supplier_id) {
        if ((status === "paid" || status === "canceled") && oldDebt[0].status === "pending") {
          await removeAtTotalDebt(user_id, oldDebt[0].supplier_id, oldDebt[0].amount);
        } else if (status === "pending" && (oldDebt[0].status === "paid" || oldDebt[0].status === "canceled")) {
          await addAtTotalDebt(user_id, oldDebt[0].supplier_id, oldDebt[0].amount);
        }
      }
    }

    const debt = await debtService.updateDebt(user_id, debt_id, {
      supplier_name,
      name,
      amount,
      dueDate,
      status,
      renewalDate,
      renewalType,
      comment
    });

    return res.status(200).json({
      message: "Dette modifiée",
      debt: debt,
    });
  } catch (err) {
    next(err);
  }
}

export const deleteDebt = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const user_id = req.user.id;
  const debt_id = parseInt(req.params.id);

  try {
    const oldDebt = await debtService.getDebt(user_id, debt_id);

    if (oldDebt[0].status === "pending" && oldDebt[0].supplier_id !== null) {
      await removeAtTotalDebt(user_id, oldDebt[0].supplier_id, oldDebt[0].amount);
    }

    const deletedDebt = await debtService.deleteDebt(user_id, debt_id);

    return res.status(200).json({
      message: "Dette supprimée",
      debt: deletedDebt,
    });
  } catch (err) {
    next(err);
  }
}