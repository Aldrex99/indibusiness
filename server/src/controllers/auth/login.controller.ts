import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as loginService from "../../services/login.service";
import * as token from "../../utils/tokens.util";
import { IUser } from "../../models/user.model";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "Les données envoyées sont incorrectes",
      errors: errors.array(),
    });
  }

  const {email, password} = req.body;

  try {
    const user: IUser = await loginService.login(email, password);

    const accessToken = token.generateAccessToken(user.id, user.role);
    const refreshToken = token.generateRefreshToken(user.id);

    return res.status(200).json({
      message: "Utilisateur connecté",
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}