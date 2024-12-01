import { IPlayers, IUser } from "../../Room";
import WebSocket from "ws";
import { IPlayerPublisher } from "../../classMessage/ResponseFactory/ResponseFactory";

export interface IUserManager {
  transformUserForRoom(userData: IUserTg, session: string): IUser;
  transformedPlayerPublisher(user: IPlayers): IPlayerPublisher;
  transformedPlayer(user: IUser, ws: WebSocket): IPlayers;
}

export class UserManager implements IUserManager {
  transformUserForRoom(userData: IUserTg, session: string) {
    const user: IUser = {
      session: session,
      hash: userData.hash,
      id: userData.user.id,
      allowsWriteToPm: userData.user.allowsWriteToPm,
      username: userData.user.username,
      firstName: userData.user.firstName,
    };
    return user;
  }
  transformedPlayerPublisher(user: IPlayers) {
    const player: IPlayerPublisher = {
      id: user.user.id,
      cardCount: user.card.length,
      firstName: user.user.firstName,
      startGame: user.startGameState,
      state: user.state,
      passState: user.passState,
    };
    return player;
  }
  transformedPlayer(user: IUser, ws: WebSocket) {
    const player = {
      state: "",
      startGameState: false,
      user: user,
      card: [],
      ws: ws,
      passState: false,
    };
    return player;
  }
}
export interface IUserTg {
  hash: string;
  user: {
    id: number;
    allowsWriteToPm: boolean;
    username: string;
    firstName: string;
  };
}
