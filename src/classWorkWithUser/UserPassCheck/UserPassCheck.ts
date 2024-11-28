import { IPlayers } from "../../Room";

export interface IUserPassCheck {
  UserPassCheck(users: IPlayers[]): boolean;
}

export class UserPassCheck {
  UserPassCheck(users: IPlayers[]) {
    let statePass = true;
    users.map((elem) => {
      if (!elem.passState) {
        statePass = false;
      }
    });
    return statePass;
  }
}
