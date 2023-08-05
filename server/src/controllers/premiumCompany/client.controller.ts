import { Response, NextFunction } from "express";
import { IRequestUser } from "../../models/user.model";
import { validationResult } from "express-validator";
import * as clientService from "../../services/client.service";
import { IClient } from "../../models/client.model";

export const createClient = async (req: IRequestUser, res: Response, next: NextFunction) => {
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
    legalForm = null,
    name,
    address = null,
    addressComplement = null,
    zipCode = null,
    city = null,
    email,
    phone = null,
    siret = null,
    siren = null,
    tva = null,
    comment = null,
    paymentDelay = null,
    paymentMethod = null,
    totalReceivable = 0
  }: IClient = req.body;

  try {
    const client = await clientService.createClient({
      user_id,
      legalForm,
      name,
      address,
      addressComplement,
      zipCode,
      city,
      email,
      phone,
      siret,
      siren,
      tva,
      comment,
      paymentDelay,
      paymentMethod,
      totalReceivable
    });

    return res.status(201).json({
      message: "Client créé",
      client: client,
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}

export const getAllClients = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const userId = req.user.id;

  try {
    const clients = await clientService.getAllClients(userId);

    return res.status(200).json({
      message: "Liste des clients",
      clients: clients,
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}

export const getClient = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const clientId = parseInt(req.params.id);

  try {
    const client = await clientService.getClient(userId, clientId);

    return res.status(200).json({
      message: "Client trouvé",
      client: client,
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}

export const updateClient = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const clientId = parseInt(req.params.id);

  const {
    legalForm,
    name,
    address,
    addressComplement,
    zipCode,
    city,
    email,
    phone,
    siret,
    siren,
    tva,
    comment,
    paymentDelay,
    paymentMethod,
  }: Partial<IClient> = req.body;

  try {
    const client = await clientService.updateClient(userId, clientId, {
      legalForm,
      name,
      address,
      addressComplement,
      zipCode,
      city,
      email,
      phone,
      siret,
      siren,
      tva,
      comment,
      paymentDelay,
      paymentMethod,
    });

    return res.status(200).json({
      message: "Client mis à jour",
      client: client,
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}

export const deleteClient = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const clientId = parseInt(req.params.id);

  try {
    const client = await clientService.deleteClient(userId, clientId);

    return res.status(200).json({
      message: "Client supprimé",
      client: client,
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}