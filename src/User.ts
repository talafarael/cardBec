import { parseInitData } from "@telegram-apps/sdk-react";
import { IUser } from "./Room";
import { TelegramData } from "./telegramType";
import { hash } from "crypto";
import WebSocket from "ws";
export interface IUserManager {
  userParser(user: string): IUserTg;
  ws: WebSocket;
}

export class UserManager implements IUserManager {
  ws;
  #ws;
  constructor(ws: WebSocket) {
    this.#ws = ws;
    ws = ws;
  }
  userParser(user: string) {
    const parserUser = parseInitData(user) as Partial<IUserTg>;
    if (!parserUser.user) {
      // WSH.
    }

    return parserUser as IUserTg;
  }
}
export interface IUserTg {
  hash: string;
  user: {
    id: number;
    allowsWriteToPm: boolean;
    username: string;
    firstName: string;
  };
}
