import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/app";

const sign = (payload: object) => {
  return new Promise<string | undefined>((res, rej) => {
    jwt.sign(
      payload,
      JWT_SECRET as string,
      { algorithm: "HS256", expiresIn: 1000 * 60 * 5 },
      (err, encoded) => {
        if (err) rej(err);
        res(encoded);
      }
    );
  });
};

type Decoded = string | undefined | jwt.JwtPayload;

const verify = (token: string) => {
  return new Promise<Decoded>((res, rej) => {
    jwt.verify(
      token,
      JWT_SECRET as string,
      { algorithms: ["HS256"] },
      (err, decoded) => {
        if (err) rej(err);
        res(decoded);
      }
    );
  });
};

export default {
  sign,
  verify,
};
