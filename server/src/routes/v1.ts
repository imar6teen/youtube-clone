import express from "express";
import jwt from "../util/jwtpromisify";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
  JwtPayload,
} from "jsonwebtoken";

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    // Validate jwt
    let token: string = "";
    if (req.headers.authorization) {
      token = req.headers.authorization;
      token = token.slice(6, -1);
    } else if (req.cookies.access_token) token = req.cookies.access_token;

    const decoded = await jwt.verify(token);

    const { email, name, picture } = decoded as JwtPayload;

    res.locals.user = { email, name, picture };
    next();
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

router.get("/profile", (req, res) => {
  res.status(200).json(res.locals.user);
});

export default router;
