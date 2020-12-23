import { Request, Response } from "express";
import Ban from "../../data/Ban";

export default async (req: Request, res: Response) => {
  let bans = (await Ban.find().exec()).map((ban) => ({
    twitch_id: ban.twitch_id,
    twitch_name: ban.twitch_name,
  }));

  res.json(bans);
};
