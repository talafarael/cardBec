import { IPlayers } from "../../Room";

export interface IUserReadinessCheck {
  UserReadinessCheck(users: IPlayers[]): boolean;
}

export class UserReadinessCheck implements IUserReadinessCheck {
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
