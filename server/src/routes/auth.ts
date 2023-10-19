import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URIS,
  FRONTEND_URL,
} from "../config/app";
import express from "express";
import { google } from "googleapis";
import jwt from "../util/jwtpromisify";
import {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from "jsonwebtoken";

const googleoauth2api = google.oauth2("v2");

const router = express.Router();

const oauth2client = new google.auth.OAuth2({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: GOOGLE_REDIRECT_URIS[0],
});

const scopes: string[] = [
  "openid",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

router.get("/url-login", async (req, res) => {
  /**
   * check jwt from header or cookie
   * if jwt is not validate:
   *    generate auth url
   *    redirect user to it
   * redirect to GOOGLE_JAVASCRIPT_ORIGINS[1]
   */

  try {
    // Validate jwt
    let token: string = "";
    if (req.headers.authorization) {
      token = req.headers.authorization;
      token = token.slice(6, -1);
    } else if (req.cookies.access_token) token = req.cookies.access_token;

    if (token) {
      const decoded = await jwt.verify(token);

      if (decoded) return res.redirect(FRONTEND_URL as string);
    }

    // generate url
    const url = oauth2client.generateAuthUrl({
      access_type: "online",
      scope: scopes,
      prompt: "select_account",
      // TODO Add state for csrf
    });

    res.status(302).redirect(url);
  } catch (err) {
    console.error(err);
    if (err instanceof JsonWebTokenError) {
      res.clearCookie("access_token");
      res.status(400).json({
        error: err.name,
        msg: err.message,
      });
    } else if (err instanceof NotBeforeError) {
      res.clearCookie("access_token");
      res.status(500).json({
        error: err.name,
        msg: err.message,
      });
    } else if (err instanceof TokenExpiredError) {
      res.clearCookie("access_token");
      res.status(400).json({
        error: err.name,
        msg: err.message,
      });
    } else {
      res.status(400).json({
        msg: "Something Wrong",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) return new Error("code query is required");

    const { tokens } = await oauth2client.getToken(code as string);

    oauth2client.setCredentials(tokens);

    const result = await googleoauth2api.userinfo.get({
      auth: oauth2client,
    });

    const {
      data: { email, name, picture },
    } = result;

    const signed = await jwt.sign({ email, name, picture });

    // TODO store refresh token after created account or sign in

    res
      .cookie("access_token", signed, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
      })
      .status(200)
      .json({
        msg: "Authenticated",
        access_token: signed,
        email,
        name,
        picture,
      });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      msg: "Something Wrong",
    });
  }
});

export default router;
