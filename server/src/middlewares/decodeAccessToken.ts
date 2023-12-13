import jwt from "../util/jwtpromisify";
import { JwtPayload } from "jsonwebtoken";
import parseAccessToken from "../util/parseAccessToken";
import handleError from "../util/handleError";
import logger from "../util/winstonLog";
import { NextFunction, Request, Response } from "express";
import { ExtendsResponse } from "../types";

const decodeAccessToken = async (
  req: Request,
  res: ExtendsResponse,
  next: NextFunction
) => {
  try {
    let token: string = parseAccessToken(req);

    const decoded = await jwt.verify(token);

    const { email, name, picture, id } = decoded as JwtPayload;

    res.locals.user = { email, name, picture, id };
    next();
  } catch (err) {
    logger(module).info(err);
    handleError(err as Error, res);
  }
};

export default decodeAccessToken;
