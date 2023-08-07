import { body } from 'express-validator';

export const createDebt = [
  body("supplier_name")
    .isString()
    .withMessage("Le nom du fournisseur doit être une chaîne de caractères"),
  body("name")
    .isString()
    .withMessage("Le nom de la dette doit être une chaîne de caractères"),
  body("amount")
    .isFloat({min: 0})
    .withMessage("Le montant de la dette doit être un nombre positif"),
  body("dueDate")
    .isDate()
    .withMessage("La date d'échéance doit être une date valide"),
  body("status")
    .isString()
    .withMessage("Le statut de la dette doit être une chaîne de caractères"),
  body("renewalDate")
    .optional()
    .isDate()
    .withMessage("La date de renouvellement doit être une date valide"),
  body("renewalType")
    .optional()
    .isString()
    .withMessage("Le type de renouvellement doit être une chaîne de caractères"),
  body("comment")
    .optional()
    .isString()
    .withMessage("Le commentaire doit être une chaîne de caractères"),
];

export const getFilteredDebts = [
  body("search")
    .optional()
    .isString()
    .withMessage("La recherche doit être une chaîne de caractères"),
  body("status")
    .optional()
    .isString()
    .withMessage("Le statut doit être une chaîne de caractères"),
  body("isRenewable")
    .optional()
    .isBoolean()
    .withMessage("Le renouvellement doit être un booléen"),
  body("orderBy")
    .optional()
    .isString()
    .withMessage("Le champ de tri doit être une chaîne de caractères"),
  body("order")
    .optional()
    .isString()
    .withMessage("L'ordre de tri doit être une chaîne de caractères"),
];

export const updateDebt = [
  body("supplier_id")
    .optional()
    .isInt({min: 1})
    .withMessage("L'identifiant du fournisseur doit être un nombre entier positif"),
  body("supplier_name")
    .optional()
    .isString()
    .withMessage("Le nom du fournisseur doit être une chaîne de caractères"),
  body("name")
    .optional()
    .isString()
    .withMessage("Le nom de la dette doit être une chaîne de caractères"),
  body("amount")
    .optional()
    .isFloat()
    .withMessage("Le montant de la dette doit être un nombre positif"),
  body("dueDate")
    .optional()
    .isDate()
    .withMessage("La date d'échéance doit être une date valide"),
  body("status")
    .optional()
    .isString()
    .withMessage("Le statut de la dette doit être une chaîne de caractères"),
  body("renewalDate")
    .optional()
    .isDate()
    .withMessage("La date de renouvellement doit être une date valide"),
  body("renewalType")
    .optional()
    .isString()
    .withMessage("Le type de renouvellement doit être une chaîne de caractères"),
  body("comment")
    .optional()
    .isString()
    .withMessage("Le commentaire doit être une chaîne de caractères"),
];
