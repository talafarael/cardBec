import { parseInitData } from "@telegram-apps/sdk-react";
import { IUser } from "./Room";
import { TelegramData } from "./telegramType";
export interface IUserManager {
  userParser(user: string): any;
}
export class UserManager implements IUserManager {
  userParser(user: string) {
    const parserUser = parseInitData(user);
    if (!parserUser.user) {
      return false;
    }
    return parserUser;
  }
}
