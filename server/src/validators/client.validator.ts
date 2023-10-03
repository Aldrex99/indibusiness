import { body } from 'express-validator';

export const createClient = [
  body('legalForm')
    .optional()
    .isString().withMessage('La forme juridique doit être une chaîne de caractères'),
  body('name')
    .exists().withMessage('Le nom est requis')
    .isString().withMessage('Le nom doit être une chaîne de caractères'),
  body('address')
    .optional()
    .isString().withMessage('L\'adresse doit être une chaîne de caractères'),
  body('addressComplement')
    .optional()
    .isString().withMessage('Le complément d\'adresse doit être une chaîne de caractères'),
  body('zipCode')
    .optional()
    .isString().withMessage('Le code postal doit être une chaîne de caractères'),
  body('city')
    .optional()
    .isString().withMessage('La ville doit être une chaîne de caractères'),
  body('email')
    .exists().withMessage('L\'email est requis')
    .isEmail()
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      outlookdotcom_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false,
    })
    .withMessage('Adresse email invalide.'),
  body('phone')
    .optional()
    .isString().withMessage('Le téléphone doit être une chaîne de caractères'),
  body('siret')
    .optional()
    .isString().withMessage('Le siret doit être une chaîne de caractères'),
  body('siren')
    .optional()
    .isString().withMessage('Le siren doit être une chaîne de caractères'),
  body('tva')
    .optional()
    .isString().withMessage('Le numéro de tva intracommunautaire doit être une chaîne de caractères'),
  body('comment')
    .optional()
    .isString().withMessage('Le commentaire doit être une chaîne de caractères'),
  body('paymentDelay')
    .optional()
    .isNumeric().withMessage('Le délai de paiement doit être un nombre'),
  body('paymentMethod')
    .optional()
    .isString().withMessage('Le mode de paiement doit être une chaîne de caractères'),
  body('totalReceivable')
    .optional()
    .isNumeric().withMessage('Le total des créances doit être un nombre'),
];

export const updateClient = [
  body('user_id')
    .optional()
    .isString().withMessage('L\'id de l\'utilisateur doit être une chaîne de caractères'),
  body('legalForm')
    .optional()
    .isString().withMessage('La forme juridique doit être une chaîne de caractères'),
  body('name')
    .optional()
    .isString().withMessage('Le nom doit être une chaîne de caractères'),
  body('address')
    .optional()
    .isString().withMessage('L\'adresse doit être une chaîne de caractères'),
  body('addressComplement')
    .optional()
    .isString().withMessage('Le complément d\'adresse doit être une chaîne de caractères'),
  body('zipCode')
    .optional()
    .isString().withMessage('Le code postal doit être une chaîne de caractères'),
  body('city')
    .optional()
    .isString().withMessage('La ville doit être une chaîne de caractères'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      outlookdotcom_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false,
    })
    .withMessage('Adresse email invalide.'),
  body('phone')
    .optional()
    .isString().withMessage('Le téléphone doit être une chaîne de caractères'),
  body('siret')
    .optional()
    .isString().withMessage('Le siret doit être une chaîne de caractères'),
  body('siren')
    .optional()
    .isString().withMessage('Le siren doit être une chaîne de caractères'),
  body('tva')
    .optional()
    .isString().withMessage('Le numéro de tva intracommunautaire doit être une chaîne de caractères'),
  body('comment')
    .optional()
    .isString().withMessage('Le commentaire doit être une chaîne de caractères'),
  body('paymentDelay')
    .optional()
    .isNumeric().withMessage('Le délai de paiement doit être un nombre'),
  body('paymentMethod')
    .optional()
    .isString().withMessage('Le mode de paiement doit être une chaîne de caractères'),
  body('totalReceivable')
    .optional()
    .isNumeric().withMessage('Le total des créances doit être un nombre'),
];
