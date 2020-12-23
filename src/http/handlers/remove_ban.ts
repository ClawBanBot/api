import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import Ban from "../../data/Ban";

export default async (req: Request, res: Response) => {
  // Check user is an admin
  try {
    if (
      !req.headers.authorization ||
      (jwt.verify(req.headers.authorization, process.env.JWT_KEY) as any)
        .role !== "admin"
    ) {
      throw new Error();
    }
  } catch (e) {
    return res.sendStatus(403);
  }

  let ban = await Ban.findOne({ twitch_id: req.body.twitch_id }).exec();
  if (!ban) {
    res.sendStatus(404);
  }

  req.app.get("bot").removeBan(ban.twitch_name);
  ban.delete();
  res.sendStatus(202);
};
