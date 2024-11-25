import { IUserManager } from "../../classWorkWithUser/UserManager/UserManager";
import { IPlayers, IRoom } from "../../Room";
import { IResponseFactory } from "../ResponseFactory";

export interface INotifyUserJoined {
  responseFactory: IResponseFactory;
  userManager: IUserManager;
  sendJoinNotification(room: IRoom, id: number): void;
}

export class notifyUserJoined implements INotifyUserJoined {
  responseFactory;
  userManager;
  constructor(ResponseFactory: IResponseFactory, UserManager: IUserManager) {
    this.responseFactory = ResponseFactory;
    this.userManager = UserManager;
  }
  sendJoinNotification(room: IRoom, id: number) {
    room.players.map((elem) => {
    
      const you = elem.user;
      // this.responseFactory(user.session, "join");
    });
  }
}
