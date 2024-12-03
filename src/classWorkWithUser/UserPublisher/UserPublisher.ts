import { IPlayerPublisher, IPlayers } from "src/Type";
import IUserManager from "../UserManager/IUserManager";
import IUserPublisher from "./IUserPublisher";

class UserPublisher implements IUserPublisher {
  readonly #userManager: IUserManager;

  constructor(userManager: IUserManager) {
    this.#userManager = userManager;
  }
  mapPlayersToPublish(users: IPlayers[]) {
    const userPublish: IPlayerPublisher[] = [];
    users.forEach((elem) => {
      userPublish.push(this.#userManager.transformedPlayerPublisher(elem));
    });
    return userPublish;
  }
}
export default UserPublisher;
