import express from "express";
import { profile } from "../controllers/v1";
import decodeAccessToken from "../middlewares/decodeAccessToken";

const router = express.Router();

router.use(decodeAccessToken);

router.get("/profile", profile);

export default router;
