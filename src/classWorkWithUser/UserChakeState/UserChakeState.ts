import { IPlayers } from "../../Room";
import IUserChakeState from "./IUserChakeState";

class UserChakeState implements IUserChakeState {
  ChakeStateAttack(user: IPlayers) {
    if (user.state == "attacking") {
      return true;
    }
    return false;
  }
  ChakeStateDefending(user: IPlayers) {
    if (user.state == "defending") {
      return true;
    }
    return false;
  }
  //   "defending"
}
export default UserChakeState;
