import { Request, Response } from "express";

export const profile = (req: Request, res: Response) => {
  res.status(200).json(res.locals.user);
};
