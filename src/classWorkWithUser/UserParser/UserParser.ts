import { parseInitData } from "@telegram-apps/sdk-react";
import { IUserTg } from "src/Type";
import IUserParser from "./IUserParser";

class UserParser implements IUserParser {
  userParser(user: string): IUserTg {
    const userData = parseInitData(user) as Partial<IUserTg>;
    console.log(userData);
    if (!userData.user) {
      throw new Error("Invalid user data");
    }

    return userData as IUserTg;
  }
}
export default UserParser;
