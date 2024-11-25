import { parseInitData } from "@telegram-apps/sdk-react";
import { IUserTg } from "../UserManager/UserManager";

export interface IUserParser {
  userParser(user: string): IUserTg;
}
export class UserParser implements IUserParser {
  userParser(user: string): IUserTg {
    const userData = parseInitData(user) as Partial<IUserTg>;
    if (!userData.user) {
      throw new Error("Invalid user data"); 
    }
  
    return userData as IUserTg;
  }
}
