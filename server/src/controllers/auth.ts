import { FRONTEND_URL, JWT_MAX_AGE, LOCAL_STORAGE } from "../config/app";
import { googleoauth2api, oauth2client, scopes } from "../config/googleOauth";
import { Request, Response } from "express";
import jwt from "../util/jwtpromisify";
import parseAccessToken from "../util/parseAccessToken";
import handleError, { HTTPError } from "../util/handleError";
import logger from "../util/winstonLog";
import { ExtendsResponse } from "../types";
import { Users } from "../models";
import HttpStatusCode from "../constants/StatusCode";
import fs from "fs";
import path from "path";

export const urlLogin = async (req: Request, res: ExtendsResponse) => {
  try {
    // Validate jwt
    let token = parseAccessToken(req);
    // it should if(token && await jwt.verify(token))
    if (token)
      if (await jwt.verify(token)) return res.redirect(FRONTEND_URL as string);

    // generate url
    const url = oauth2client.generateAuthUrl({
      access_type: "online",
      scope: scopes,
      prompt: "select_account",
      // TODO Add state for csrf
    });

    res.status(HttpStatusCode.FOUND_302).json({
      message: "redirect to google oauth",
      url: url,
    });
  } catch (err) {
    logger(module).info(err);
    handleError(err as Error, res);
  }
};

export const login = async (req: Request, res: ExtendsResponse) => {
  try {
    const { code } = req.query;

    if (!code)
      throw new HTTPError({
        message: "Code query needed",
        name: "CodeQueryError",
        status: HttpStatusCode.BAD_REQUEST_400,
      });

    const { tokens } = await oauth2client.getToken(code as string);

    oauth2client.setCredentials(tokens);

    const result = await googleoauth2api.userinfo.get({
      auth: oauth2client,
    });

    const {
      data: { email, name, picture },
    } = result;

    let users = await Users.exists({ email });
    if (!users) {
      const newUsers = new Users({ email });
      await newUsers.save();
      users = { _id: newUsers._id };
    }

    const signed = await jwt.sign({ email, name, picture, id: users._id });

    if (
      !fs.existsSync(
        path.join(LOCAL_STORAGE, "videos", users._id.toString())
      ) &&
      !fs.existsSync(
        path.join(LOCAL_STORAGE, "thumbnails", users._id.toString())
      )
    ) {
      fs.mkdirSync(path.join(LOCAL_STORAGE, "videos", users._id.toString()));
      fs.mkdirSync(
        path.join(LOCAL_STORAGE, "thumbnails", users._id.toString())
      );
    }

    res
      .cookie("access_token", signed, {
        httpOnly: true,
        maxAge: 1000 * 60 * parseInt(JWT_MAX_AGE as string),
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
