import mongoose from "mongoose";
import { MONGO_CERT, MONGO_DB, MONGO_URL } from "./app";
import logger from "../util/winstonLog";

async function databaseConnect() {
  mongoose
    .connect(MONGO_URL as string, {
      tlsAllowInvalidCertificates: true,
      tlsCertificateKeyFile: `${MONGO_CERT}`,
      authMechanism: "MONGODB-X509",
      authSource: "$external",
      dbName: MONGO_DB,
      connectTimeoutMS: 10000,
    })
    .then((_) => {
      logger(module).info({
        name: "DBConnectSuccess",
        message: "Database Connection Successfully",
      });
    })
    .catch((err) => {
      logger(module).error({ name: err.name, message: err.message });
      setTimeout(() => {
        databaseConnect();
      }, 3000);
    });
}

export default databaseConnect;
