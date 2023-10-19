import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();

export const PORT = process.env.PORT;
export const FRONTEND_URL = process.env.FRONTEND_URL;

export const JWT_SECRET = process.env.JWT_SECRET;
export const CSRF_SECRET = process.env.CSRF_SECRET;

// Load google oauth key
const pathFile = path.resolve(__dirname, "..", "..", "oauth.json");
const data = fs.readFileSync(pathFile, { encoding: "utf-8" });
const jsonData = JSON.parse(data);

export const GOOGLE_CLIENT_ID = jsonData.web.client_id;
export const GOOGLE_CLIENT_SECRET = jsonData.web.client_secret;
export const GOOGLE_REDIRECT_URIS = jsonData.web.redirect_uris;
export const GOOGLE_JAVASCRIPT_ORIGINS = jsonData.web.javascript_origins;
