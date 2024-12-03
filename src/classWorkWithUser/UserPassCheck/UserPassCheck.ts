import { IPlayers } from "src/Type";
import IUserPassCheck from "./IUserPassCheck";

export class UserPassCheck implements IUserPassCheck {
  UserPassCheck(users: IPlayers[]) {
    let statePass = true;
    users.forEach((elem) => {
      if (!elem.passState) {
        statePass = false;
      }
    });
    return statePass;
  }
}
export default UserPassCheck;
