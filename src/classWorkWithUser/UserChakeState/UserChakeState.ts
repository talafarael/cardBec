import { IPlayers } from "../../Room";

export interface IUserChakeState {
  ChakeStateAttack(user: IPlayers): boolean;
  ChakeStateDefending(user: IPlayers): boolean;
}

export class UserChakeState implements IUserChakeState {
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
