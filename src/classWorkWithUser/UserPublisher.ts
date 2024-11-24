import { IPublishUser } from "../classMessage/ResponseFactory";
import { IPlayers } from "../Room";

export class PlayerPublisher {
  mapPlayersToPublish(users: IPlayers[]): IPublishUser[] {
    return users.map((elem) => this.transformPlayerForPublish(elem));
  }
}
