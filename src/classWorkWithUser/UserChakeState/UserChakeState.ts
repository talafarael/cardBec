import { IPlayers } from "../../Room";

export interface IUserChakeState {
  ChakeStateAttack(user: IPlayers): boolean;
}

export class UserChakeState implements IUserChakeState {
  ChakeStateAttack(user: IPlayers) {
    if (user.state == "attacking") {
      return true;
    }
    return false;
  }
  //   "defending"
}
