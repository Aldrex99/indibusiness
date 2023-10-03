import { body } from "express-validator";

export const createReceivable = [
  body("client_name")
    .isString()
    .withMessage("Le nom du client doit être une chaîne de caractères")
    .trim(),
  body("name")
    .isString()
    .withMessage("Le nom de la créance doit être une chaîne de caractères")
    .trim(),
  body("amount")
    .isFloat()
    .withMessage("Le montant de la créance doit être un nombre positif"),
  body("dueDate")
    .isDate()
    .withMessage("La date d'échéance doit être une date valide"),
  body("status")
    .isString()
    .withMessage("Le statut de la créance doit être une chaîne de caractères")
    .trim(),
  body("comment")
    .optional()
    .isString()
    .withMessage("Le commentaire doit être une chaîne de caractères")
    .trim(),
];

export const getFilteredReceivables = [
  body("search")
    .optional()
    .isString()
    .withMessage("La recherche doit être une chaîne de caractères")
    .trim(),
  body("status")
    .optional()
    .isString()
    .withMessage("Le statut doit être une chaîne de caractères")
    .trim(),
  body("orderBy")
    .optional()
    .isString()
    .withMessage("Le champ de tri doit être une chaîne de caractères")
    .trim(),
  body("order")
    .optional()
    .isString()
    .withMessage("L'ordre de tri doit être une chaîne de caractères")
    .trim(),
];

export const updateReceivable = [
  body("client_id")
    .optional()
    .isInt({min: 1})
    .withMessage("L'identifiant du client doit être un nombre entier positif"),
  body("client_name")
    .optional()
    .isString()
    .withMessage("Le nom du client doit être une chaîne de caractères")
    .trim(),
  body("name")
    .optional()
    .isString()
    .withMessage("Le nom de la créance doit être une chaîne de caractères")
    .trim(),
  body("amount")
    .optional()
    .isFloat()
    .withMessage("Le montant de la créance doit être un nombre positif"),
  body("dueDate")
    .optional()
    .isDate()
    .withMessage("La date d'échéance doit être une date valide"),
  body("status")
    .optional()
    .isString()
    .withMessage("Le statut de la créance doit être une chaîne de caractères")
    .trim(),
  body("comment")
    .optional()
    .isString()
    .withMessage("Le commentaire doit être une chaîne de caractères")
    .trim(),
];