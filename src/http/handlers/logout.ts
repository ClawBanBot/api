import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    // TODO FIX THE TYPES
    req.app.get("bot").remove_user((req as any).user);

    res.sendStatus(200);
}
