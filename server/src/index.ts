import { LOCAL_STORAGE, PORT, RATE_LIMIT_REFRESH } from "./config/app";
import http from "http";
import fs from "fs/promises";
import path from "path";
import express, { NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import databaseConnect from "./config/database";
import mongoose from "mongoose";
import HLSServer from "hls-server";
import httpAttach from "http-attach";
import hls from "./controllers/hls";

async function shutdown(server: http.Server) {
  const shut = () => {
    server.close((err) => {
      if (err) {
        console.error(err);
        process.exit(81);
      }
      console.log("[SERVER] server is terminated");
      mongoose.disconnect();
      process.exit();
    });
  };
  process.on("SIGINT", () => {
    console.log("[SERVER] process received SIGINT");
    shut();
  });
  process.on("SIGTERM", () => {
    console.log("[SERVER] process received SIGTERM");
    shut();
  });
}

async function main() {
  const app = express();
  const server = http.createServer(app);

  app.use(
    "/static",
    express.static(path.join(process.cwd(), "storages", "thumbnails"))
  );
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // helmet for security purposes
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: parseInt(RATE_LIMIT_REFRESH as string) * 60 * 1000, // 5 minutes
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

  app.get("/ping", async (_, res) => res.send("healthy"));

  const routeFiles = await fs.readdir(path.resolve(__dirname, "routes"));

  for (let fileName of routeFiles) {
    const importFile = await import(`./routes/${fileName}`);
    const removeExtensionName = path.parse(fileName).name;
    app.use(`/api/${removeExtensionName}`, importFile.default);
  }

  new HLSServer(server, {
    provider: {
      exists: hls.exists,
      getManifestStream: hls.getManifestStream,
      getSegmentStream: hls.getSegmentStream,
    },
  });

  // prevent cors for hls server
  httpAttach(
    server,
    cors({
      credentials: true,
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
    })
  );

  server.listen(PORT, () => {
    console.log(`[Server] Server listening on port : ${PORT}`);
  });

  shutdown(server);
}

databaseConnect().then(() => {
  main();
});
