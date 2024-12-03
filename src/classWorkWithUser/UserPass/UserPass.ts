import { IPlayers } from "src/Type";
import IUserPass from "./IUserPass";

class UserPass implements IUserPass {
  UserPassTrue(user: IPlayers) {
    user.passState = true;
    return user;
  }

  UpdateAllUserPass(users: IPlayers[]) {
    users.forEach((elem) => {
      this.#UserPassFalse(elem);
    });
    return users;
  }
  #UserPassFalse(user: IPlayers) {
    user.passState = false;
  }
}
export default UserPass;
