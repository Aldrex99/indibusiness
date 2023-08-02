import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import * as registerService from "../../services/register.service";
import * as emailVerificationService from "../../services/emailVerification.service";
import * as mail from "../../utils/mailer.util";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "Les données envoyées sont incorrectes",
      errors: errors.array(),
    });
  }

  const {email, password, role, firstname, lastname, name, legalForm} = req.body;

  const alreadyExists = await registerService.alreadyExists(email);
  if (alreadyExists) {
    return res.status(422).json({
      code: 422,
      message: "L'utilisateur existe déjà",
    });
  }

  try {
    const user = await registerService.register(email, password, role, firstname, lastname, name, legalForm);
    const emailVerification : {token: string} = await emailVerificationService.create(user.id);

    await mail.sendMails(email, "Vérification de votre adresse email", `<p>Veuillez cliquer sur le lien suivant pour vérifier votre adresse email : <a href="${process.env.CLIENT_URL}/verify/${user.id}/${emailVerification.token}">Lien</a></p>`);

    return res.status(200).json({
      message: "Utilisateur créé",
      user: user,
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "Les données envoyées sont incorrectes",
      errors: errors.array(),
    });
  }

  const {token, userId} = req.body;

  const expired = await emailVerificationService.checkExpiration(token, userId);
  if (!expired) {
    return res.status(422).json({
      code: 422,
      message: "Le lien a expiré",
    });
  }

  try {
    await emailVerificationService.verify(token, userId);

    return res.status(200).json({
      message: "Email vérifié",
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}
