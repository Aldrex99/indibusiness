import { body } from 'express-validator';

export const register = [
  body('email')
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
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères.')
    .matches(/\d/)
    .withMessage('Le mot de passe doit contenir au moins 1 chiffre.')
    .matches(/[a-z]/)
    .withMessage('Le mot de passe doit contenir au moins 1 lettre minuscule.')
    .matches(/[A-Z]/)
    .withMessage('Le mot de passe doit contenir au moins 1 lettre majuscule.')
    .matches(/[^a-zA-Z0-9]/)
    .withMessage('Le mot de passe doit contenir au moins 1 caractère spécial.')
    .not()
    .matches(/^$|\s/)
    .withMessage('Le mot de passe ne doit pas contenir d\'espace.'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Les deux mots de passe ne correspondent pas.');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  body('role')
    .isIn(['individual', 'company'])
    .withMessage('Vous devez choisir un rôle.'),
  body('firstname')
    .optional()
    .isString()
    .withMessage('Le prénom doit être une chaîne de caractères.'),
  body('lastname')
    .optional()
    .isString()
    .withMessage('Le nom doit être une chaîne de caractères.'),
  body('name')
    .optional()
    .isString()
    .withMessage('Le nom doit être une chaîne de caractères.'),
  body('legalForm')
    .optional()
    .isString()
    .withMessage('La forme juridique doit être une chaîne de caractères.'),
];

export const verifyEmail = [
  body('token')
    .notEmpty()
    .isString()
    .withMessage('Le token est requis.'),
  body('userId')
    .notEmpty()
    .isString()
    .withMessage('L\'identifiant de l\'utilisateur est requis.'),
];

