import { FRONTEND_URL } from "../config/app";
import { googleoauth2api, oauth2client, scopes } from "../config/googleOauth";
import { Request, Response } from "express";
import jwt from "../util/jwtpromisify";
import parseAccessToken from "../util/parseAccessToken";
import handleError, { HTTPError } from "../util/handleError";
import logger from "../util/winstonLog";

export const urlLogin = async (req: Request, res: Response) => {
  try {
    // Validate jwt
    let token = parseAccessToken(req);
    if (token)
      if (await jwt.verify(token)) return res.redirect(FRONTEND_URL as string);

    // generate url
    const url = oauth2client.generateAuthUrl({
      access_type: "online",
      scope: scopes,
      prompt: "select_account",
      // TODO Add state for csrf
    });

    res.status(302).json({
      message: "redirect to google oauth",
      url: url,
    });
  } catch (err) {
    logger(module).info(err);
    handleError(err as Error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    if (!code)
      return new HTTPError({
        message: "Code query needed",
        name: "CodeQueryError",
        status: 400,
      });

    const { tokens } = await oauth2client.getToken(code as string);

    oauth2client.setCredentials(tokens);

    const result = await googleoauth2api.userinfo.get({
      auth: oauth2client,
    });

    const {
      data: { email, name, picture },
    } = result;

    const signed = await jwt.sign({ email, name, picture });

    //TODO store refresh token after created account or sign in

    res
      .cookie("access_token", signed, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
      })
      .status(200)
      .json({
        message: "Login Success",
        access_token: signed,
        email,
        name,
        picture,
      });
  } catch (err) {
    logger(module).info(err);
    handleError(err as Error, res);
  }
};

export const logout = async (_: Request, res: Response) => {
  res.clearCookie("access_token").status(202).json({
    message: "Logout Success",
  });
};
