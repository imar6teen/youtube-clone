import { NODE_ENV } from "../config/app";
import winston from "winston";

const getLabel = function (callingModule: NodeModule) {
  // const parts = callingModule.filename.split("/");
  // return parts[parts.length - 2] + "/" + parts.pop();
  return callingModule.filename;
};

const logger = (module: NodeModule) => {
  const printFormat = winston.format.printf(
    ({ level, message, timestamp, name }) => {
      const label = getLabel(module);
      return `${timestamp} [${label}] ${level.toUpperCase()} : ${name} : ${message}`;
    }
  );

  const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printFormat
  );

  const consoleFormat = winston.format.combine(
    winston.format.json({ space: 1 }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printFormat
  );

  const createLogger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    // defaultMeta: { service: "user-service" },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({
        filename: "error.log",
        level: "error",
        format: format,
      }),
      new winston.transports.File({
        filename: "combined.log",
        format: format,
      }),
    ],
    exitOnError: false,
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (NODE_ENV !== "production") {
    createLogger.add(
      new winston.transports.Console({
        format: consoleFormat,
      })
    );
  }
  return createLogger;
};

export default logger;
