import { NextFunction, Response } from 'express';
import * as token from '../utils/tokens.util';
import * as loginService from '../services/login.service';
import { ISODateToTimestampWithoutMili } from "../utils/dateFormat.util";
import { IRequestUser } from "../models/user.model";
import { JwtPayload } from "jsonwebtoken";

export const checkAccessToken = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      code: 401,
      message: "Vous n'êtes pas autorisé à accéder à cette ressource",
    });
  }

  try {
    const rawUser: string | JwtPayload = await token.verifyAccessToken(accessToken);

    if (typeof rawUser === "string") {
      return res.status(403).json({
        code: 403,
        message: "Votre token n'est pas valide",
      });
    }

    if (rawUser.exp < Date.now() / 1000) {
      return res.status(403).json({
        code: 403,
        message: "Votre token n'est plus valide",
      });
    }

    req.user = {
      id: rawUser.id,
      role: rawUser.role,
    }

    next();
  } catch (err) {
    if (err) {
      return res.status(403).json({
        code: 403,
        message: "Votre token n'est pas valide",
      });
    }
  }
}

export const checkRefreshToken = async (req: IRequestUser, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      code: 401,
      message: "Vous n'êtes pas autorisé à accéder à cette ressource",
    });
  }

  try {
    const rawUser: string | JwtPayload = await token.verifyRefreshToken(refreshToken);

    if (typeof rawUser === "string") {
      return res.status(403).json({
        code: 403,
        message: "Votre token n'est pas valide",
      });
    }

    const lastLogout = await loginService.getLastLogout(rawUser.userId);

    if (ISODateToTimestampWithoutMili(lastLogout.lastLogout) > rawUser.iat) {
      return res.status(403).json({
        code: 403,
        message: "Votre token n'est plus valide",
      });
    }

    if (rawUser.exp < Date.now() / 1000) {
      return res.status(403).json({
        code: 403,
        message: "Votre token n'est plus valide",
      });
    }

    req.user = {
      id: rawUser.userId,
    }

    next();
  } catch (err) {
    if (err) {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const decodedToken: any = await token.decodeToken(refreshToken);

      if (decodedToken) {
        const reinitialisationAccount = loginService.logout(decodedToken.userId);

        if (reinitialisationAccount) {
          res.clearCookie("accessToken");
          res.clearCookie("refreshToken");
        }
      }
      return res.status(403).json({
        code: 403,
        message: "Votre token n'est pas valide",
      });
    }
  }
}