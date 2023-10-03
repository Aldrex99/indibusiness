import { Response, NextFunction } from "express";
import { IRequestUser } from "../../models/user.model";
import { validationResult } from "express-validator";
import * as supplierService from "../../services/supplier.service";
import { ISupplier } from "../../models/supplier.model";

export const createSupplier = async (req: IRequestUser, res: Response, next: NextFunction) => {
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
    totalDebt = 0
  }: ISupplier = req.body;

  try {
    const supplier = await supplierService.createSupplier({
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
      totalDebt
    });

    return res.status(201).json({
      message: "Fournisseur créé",
      supplier: supplier,
    });
  } catch (err) {
    next(err);
  }
}

export const getAllSuppliers = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const user_id = req.user.id;

  try {
    const suppliers = await supplierService.getAllSuppliers(user_id);

    return res.status(200).json({
      message: "Liste des fournisseurs",
      suppliers: suppliers,
    });
  } catch (err) {
    next(err);
  }
}

export const getSupplier = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const id = parseInt(req.params.id);

  try {
    const supplier = await supplierService.getSupplier(userId, id);

    return res.status(200).json({
      message: "Fournisseur trouvé",
      supplier: supplier,
    });
  } catch (err) {
    next(err);
  }
}

export const updateSupplier = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const id = parseInt(req.params.id);

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
  }: Partial<ISupplier> = req.body;

  try {
    const supplier = await supplierService.updateSupplier(userId, id, {
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
    });

    return res.status(200).json({
      message: "Fournisseur mis à jour",
      supplier: supplier,
    });
  } catch (err) {
    next(err);
  }
}

export const deleteSupplier = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const id = parseInt(req.params.id);

  try {
    await supplierService.deleteSupplier(userId, id);

    return res.status(200).json({
      message: "Fournisseur supprimé",
    });
  } catch (err) {
    next(err);
  }
}