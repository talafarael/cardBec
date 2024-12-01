import { IPlayers } from "../../Room";

export interface IUserPass {
  UserPassTrue(user: IPlayers): IPlayers;
  UpdateAllUserPass(users: IPlayers[]): IPlayers[];
}
export class UserPass implements IUserPass {
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
