import {body} from "express-validator";
import { IProductDocumentCreation } from "../models/product.model";

export const createDocument = [
  body("client_id")
    .exists().withMessage("Le client est obligatoire")
    .isInt({min: 0}).withMessage("L'identifiant du client doit être un nombre entier positif"),
  body("type")
    .exists().withMessage("Le type est obligatoire")
    .isString().withMessage("Le type doit être une chaîne de caractères"),
  body("number")
    .exists().withMessage("Le numéro de document est obligatoire")
    .isString().withMessage("Le numéro de document doit être une chaîne de caractères"),
  body("date")
    .exists().withMessage("La date est obligatoire")
    .isDate().withMessage("La date doit être une date valide"),
  body("dueDate")
    .optional()
    .isDate().withMessage("La date d'échéance doit être une date valide"),
  body("clientLegalForm")
    .optional()
    .isString().withMessage("La forme juridique du client doit être une chaîne de caractères"),
  body("clientName")
    .exists().withMessage("Le nom du client est obligatoire")
    .isString().withMessage("Le nom du client doit être une chaîne de caractères"),
  body("clientAddress")
    .exists().withMessage("L'adresse du client est obligatoire")
    .isString().withMessage("L'adresse du client doit être une chaîne de caractères"),
  body("clientAddressComplement")
    .optional()
    .isString().withMessage("Le complément d'adresse du client doit être une chaîne de caractères"),
  body("clientZipCode")
    .exists().withMessage("Le code postal du client est obligatoire")
    .isString().withMessage("Le code postal du client doit être une chaîne de caractères"),
  body("clientCity")
    .exists().withMessage("La ville du client est obligatoire")
    .isString().withMessage("La ville du client doit être une chaîne de caractères"),
  body("products")
    .exists().withMessage("Les produits sont obligatoires")
    .isArray().withMessage("Les produits doivent être un tableau")
    .custom((products: IProductDocumentCreation[]) => {
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (!product.shortId || !product.name || !product.unitPrice || !product.unit || !product.quantity || !product.tvaRate) {
          return false;
        }

        if (product.discountRate && product.discountRate < 0) {
          return false;
        }

        if (product.unitPrice < 0 || product.quantity < 0 || product.tvaRate < 0) {
          return false;
        }

        if (product.description && typeof product.description !== "string") {
          return false;
        }
      }
      return true;
    }).withMessage("Les produits doivent contenir un identifiant, un nom, un prix unitaire HT, une unité, une quantité et un taux de TVA positifs"),
  body("totalHT")
    .exists().withMessage("Le total HT est obligatoire")
    .isFloat().withMessage("Le total HT doit être un nombre positif"),
  body("totalTTC")
    .exists().withMessage("Le total TTC est obligatoire")
    .isFloat().withMessage("Le total TTC doit être un nombre positif"),
  body("totalTVA")
    .exists().withMessage("Le total TVA est obligatoire")
    .isFloat().withMessage("Le total TVA doit être un nombre positif"),
  body("additionalCostName")
    .optional()
    .isString().withMessage("Le nom du coût additionnel doit être une chaîne de caractères"),
  body("additionalCostAmount")
    .optional()
    .isFloat().withMessage("Le montant du coût additionnel doit être un nombre positif"),
  body("generalDiscountRate")
    .optional()
    .isFloat().withMessage("Le taux de remise doit être un nombre positif"),
  body("generalDiscountAmount")
    .optional()
    .isFloat().withMessage("Le montant de la remise doit être un nombre positif"),
  body("specialMention")
    .optional()
    .isString().withMessage("La mention spéciale doit être une chaîne de caractères"),
  body("status")
    .exists().withMessage("Le statut est obligatoire")
    .isString().withMessage("Le statut doit être une chaîne de caractères"),
];

export const getFilteredDocuments = [
  body("type")
    .optional()
    .isString().withMessage("Le type doit être une chaîne de caractères"),
  body("status")
    .optional()
    .isString().withMessage("Le statut doit être une chaîne de caractères"),
  body("search")
    .optional()
    .isString().withMessage("La recherche doit être une chaîne de caractères"),
  body("orderBy")
    .optional()
    .isString().withMessage("L'ordre doit être une chaîne de caractères"),
  body("order")
    .optional()
    .isString().withMessage("L'ordre doit être une chaîne de caractères"),
  body("skip")
    .optional()
    .isInt({min: 0}).withMessage("Le nombre de documents à sauter doit être un nombre entier positif"),
  body("take")
    .optional()
    .isInt({min: 0}).withMessage("Le nombre de documents à prendre doit être un nombre entier positif"),
];