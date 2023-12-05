import type { Response } from "express";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import { ExtendsResponse } from "../types";

type HTTPErrorParams = {
  message: string;
  name: string;
  status: number;
};

export class HTTPError extends Error {
  private status: number;
  constructor(params: HTTPErrorParams) {
    super(params.message);
    this.status = params.status;
    this.name = params.name;
  }

  public handle = (res: Response) => {
    res.status(this.getStatus()).json({
      error: this.name,
      msg: this.message,
    });
  };
  public getStatus = () => this.status;
  public getMessage = () => this.message;
  public getName = () => this.name;
}

class JwtError extends HTTPError {
  private clearCookie: boolean;
  constructor(params: HTTPErrorParams, clearCookie: boolean) {
    super(params);
    this.clearCookie = clearCookie;
  }

  public handle = (res: Response) => {
    this.clearCookie ? res.clearCookie("access_token") : null;
    res.status(this.getStatus()).json({
      error: this.name,
      msg: this.message,
    });
  };
}

function errorFactory(err: Error): HTTPError {
  if (err instanceof JsonWebTokenError)
    return new JwtError(
      { message: err.message, name: err.name, status: 400 },
      true
    );
  else if (err instanceof NotBeforeError)
    return new JwtError(
      { message: err.message, name: err.name, status: 500 },
      false
    );
  else if (err instanceof TokenExpiredError)
    return new JwtError(
      { message: err.message, name: err.name, status: 400 },
      true
    );
  else if (err instanceof HTTPError)
    return new HTTPError({
      message: err.getMessage(),
      name: err.getName(),
      status: err.getStatus(),
    });
  else
    return new HTTPError({
      message: "Something Wrong",
      name: "UnknownError",
      status: 500,
    });
}

function handleError(err: Error, res: ExtendsResponse) {
  let errInstance: HTTPError = errorFactory(err);
  errInstance.handle(res);
}

export default handleError;
