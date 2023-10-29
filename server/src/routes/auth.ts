import express from "express";
import { urlLogin, login, logout } from "../controllers/auth";
import decodeAccessToken from "../middlewares/decodeAccessToken";

const router = express.Router();

router.get("/url-login", urlLogin);

router.post("/login", login);

router.get("/logout", decodeAccessToken, logout);

export default router;
