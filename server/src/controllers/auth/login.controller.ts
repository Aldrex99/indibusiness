import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as loginService from "../../services/login.service";
import * as token from "../../utils/tokens.util";
import { IRequestUser, IUser } from "../../models/user.model";

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

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Utilisateur connecté",
      user: user,
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
};

export const checkLogin = async (req: IRequestUser, res: Response, next: NextFunction) => {
  try {
    const user: IUser = await loginService.check(req.user.id);

    const accessToken = token.generateAccessToken(user.id, user.role);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Utilisateur connecté",
      user: user,
    });
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}

export const refresh = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  try {
    const rawUser = await loginService.refresh(userId);

    const accessToken = token.generateAccessToken(rawUser.id, rawUser.role);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "accessToken rafraîchi",
    });

  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}

export const logout = async (req: IRequestUser, res: Response, next: NextFunction) => {
  try {
    const effectiveLogout = await loginService.logout(req.user.id);

    if (effectiveLogout) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return res.status(200).json({
        message: "Utilisateur déconnecté",
      });
    }
  } catch (err) {
    if (err) {
      return next(err);
    }
  }
}