import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      !req.headers.authorization
    ) {
      throw new Error();
    }

    // TODO fix this typing
    (req as any).user = (jwt.verify(req.headers.authorization, process.env.JWT_KEY) as any);
  } catch (e) {
    return res.sendStatus(403);
  }
  next();
};
