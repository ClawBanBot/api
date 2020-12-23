import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import Ban from "../../data/Ban";

export default async (req: Request, res: Response) => {
  let ban = await Ban.findOne({ twitch_id: req.body.twitch_id }).exec();
  if (!ban) {
    res.sendStatus(404);
  }

  req.app.get("bot").removeBan(ban.twitch_name);
  ban.delete();
  res.sendStatus(202);
};
