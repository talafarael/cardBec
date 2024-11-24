import { parseInitData } from "@telegram-apps/sdk-react";
import { IPlayers, IUser } from "../Room";
import { TelegramData } from "../telegramType";
import { hash } from "crypto";
import WebSocket from "ws";
import { IPublishUser } from "../classMessage/ResponseFactory";
export interface IUserManager {
  userParser(user: string): IUserTg;
  transformUserForRoom(userData: IUserTg, session: string): IUser;
  transformedPlayerPublisher(user: IPlayers): IPublishUser;
}

export class UserManager implements IUserManager {
  userParser(user: string) {
    const userData = parseInitData(user) as Partial<IUserTg>;
    if (!userData.user) {
      // WSH.
    }
    console.log(userData);
    return userData as IUserTg;
  }
  transformUserForRoom(userData: IUserTg, session: string) {
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
  transformedPlayerPublisher(user: IPlayers) {
    const player = {
      id: user.user.id,
      cardCount: user.card.length,
      firstName: user.user.firstName,
    };
    return player;
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
