import { body } from 'express-validator';

export const login = [
  body('email')
    .exists().withMessage('L\'adresse email est requise')
    .isEmail()
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      outlookdotcom_remove_subaddress: false,
      yahoo_remove_subaddress: false,
      icloud_remove_subaddress: false,
    })
    .withMessage('Adresse email invalide.'),
  body('password')
    .exists().withMessage('Le mot de passe est requis')
    .isString().withMessage('Le mot de passe doit être une chaîne de caractères'),
];