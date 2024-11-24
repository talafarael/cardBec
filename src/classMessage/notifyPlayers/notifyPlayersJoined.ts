import { IUserManager } from "../../classWorkWithUser/UserManager";
import { IPlayers } from "../../Room";
import { IResponseFactory } from "../ResponseFactory";

export interface INotifyUserJoined {
  responseFactory: IResponseFactory;
  userManager: IUserManager;
  sendJoinNotification(players: IPlayers[], id: number): void;
}

class notifyUserJoined implements INotifyUserJoined {
  responseFactory;

  constructor(ResponseFactory: IResponseFactory, UserManager: IUserManager) {
    this.responseFactory = ResponseFactory;
  }
  sendJoinNotification(players: IPlayers[], id: number) {
    players.map((elem) => {
      const user = elem.user;
      
      this.responseFactory(user.session, "join");
    });
  }
}
