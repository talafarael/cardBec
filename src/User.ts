import { parseInitData } from "@telegram-apps/sdk-react";
import { IUser } from "./Room";
import { TelegramData } from "./telegramType";
import { hash } from "crypto";
import WebSocket from "ws";
export interface IUserManager {
  userParser(user: string): IUserTg;
  userTransformToRoo(userData: IUserTg, session: string): IUser;
}

export class UserManager implements IUserManager {
  #ws;
  constructor(ws: WebSocket) {
    this.#ws = ws;
  }
  userParser(user: string) {
    const userData = parseInitData(user) as Partial<IUserTg>;
    if (!userData.user) {
      // WSH.
    }

    return userData as IUserTg;
  }
  userTransformToRoom(userData: IUserTg, session: string) {
    const user: IUser = {
      session: session,
      hash: userData.hash,
      id: userData.user.id,
      allowsWriteToPm: userData.user.allowsWriteToPm,
      username: userData.user.username,
      firstName: userData.user.firstName,
    };
    return user;
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
