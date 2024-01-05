import { Request } from "express";

function parseAccessToken(req: Request): string {
  let token: string = "";
  if (req.headers.authorization) {
    token = req.headers.authorization;
    token = token.slice(7);
  } else if (req.cookies.access_token) token = req.cookies.access_token;

  return token;
}

export default parseAccessToken;
