import express from "express";
import { urlLogin, login } from "../controllers/auth";

const router = express.Router();

router.get("/url-login", urlLogin);

router.post("/login", login);

export default router;
