import { Response } from "express";

interface LocalsUser {
  user: {
    email: string;
    name: string;
    picture: string;
    id: string;
  };
}

interface ClientWatch {
  clientId: string;
}

interface ExtendsResponse extends Response<any, LocalsUser> {}

export default ExtendsResponse;
