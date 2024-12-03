import { IPlayers } from "src/Type";
import IUserReadinessCheck from "./IUserReadinessCheck";

class UserReadinessCheck implements IUserReadinessCheck {
  UserReadinessCheck(users: IPlayers[]) {
    let stateGame = true;
    users.forEach((elem) => {
      if (!elem.startGameState) {
        stateGame = false;
      }
    });
    return stateGame;
  }
}
export default UserReadinessCheck;
