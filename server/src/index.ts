import { PORT } from "./config/app";
import http from "http";
import fs from "fs/promises";
import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";

async function main() {
  const app = express();
  const server = http.createServer(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // helmet for security purposes
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
      legacyHeaders: true, // Disable the `X-RateLimit-*` headers
    })
  );
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
    })
  );

  app.get("/ping", (_, res) => res.send("healthy"));

  const routeFiles = await fs.readdir(path.resolve(__dirname, "routes"));

  for (let fileName of routeFiles) {
    const importFile = await import(`./routes/${fileName}`);
    const removeExtensionName = path.parse(fileName).name;
    app.use(`/api/${removeExtensionName}`, importFile.default);
  }

  server.listen(PORT, () => {
    console.log(`[Server] Server listening on port : ${PORT}`);
  });
}

main();
