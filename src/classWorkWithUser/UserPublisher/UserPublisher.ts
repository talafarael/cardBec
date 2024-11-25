import { IPlayerPublisher } from "../../classMessage/ResponseFactory";
import { IPlayers } from "../../Room";
import { IUserManager, UserManager } from "../UserManager/UserManager";

export interface IUserPublisher {
  mapPlayersToPublish(users: IPlayers[]): IPlayerPublisher[];
}
export class UserPublisher {
  #userManager: IUserManager;

  constructor(userManager: IUserManager) {
    this.#userManager = userManager;
  }
  mapPlayersToPublish(users: IPlayers[]) {
    const userPublish: IPlayerPublisher[] = [];
    users.map((elem) => {
      userPublish.push(this.#userManager.transformedPlayerPublisher(elem));
      
    });
    return userPublish;
  }
}
