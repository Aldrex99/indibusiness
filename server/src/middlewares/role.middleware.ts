import { IRequestUser } from "../models/user.model";
import { Response, NextFunction } from "express";

export const checkUserRole = (roles: string[]) => {
  return (req: IRequestUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      console.log()
      res.status(401).json({message: 'Unauthorized'});
    }
  }
}