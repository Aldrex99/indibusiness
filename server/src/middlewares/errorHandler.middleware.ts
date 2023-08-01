import {Request, Response, NextFunction} from "express";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  } else {
    next();
  }
}