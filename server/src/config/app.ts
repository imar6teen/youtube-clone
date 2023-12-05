import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();

export const PORT = process.env.PORT;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const NODE_ENV = process.env.NODE_ENV;

export const JWT_SECRET = process.env.JWT_SECRET;
export const CSRF_SECRET = process.env.CSRF_SECRET;
// in minutes
export const JWT_MAX_AGE = process.env.JWT_MAX_AGE;
export const RATE_LIMIT_REFRESH = process.env.RATE_LIMIT_REFRESH;

// Load google oauth key
const pathFile = path.resolve(__dirname, "..", "..", "oauth.json");
const data = fs.readFileSync(pathFile, { encoding: "utf-8" });
const jsonData = JSON.parse(data);

export const GOOGLE_CLIENT_ID = jsonData.web.client_id;
export const GOOGLE_CLIENT_SECRET = jsonData.web.client_secret;
export const GOOGLE_REDIRECT_URIS = jsonData.web.redirect_uris;
export const GOOGLE_JAVASCRIPT_ORIGINS = jsonData.web.javascript_origins;

// MONGO
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_CERT = path.join(
  process.cwd(),
  "keys",
  process.env.MONGO_CERT as string
);
export const MONGO_URL = process.env.MONGO_URL;