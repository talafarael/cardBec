import { IPlayerPublisher, IPlayers, IUser, IUserTg } from "src/Type";
import WebSocket from "ws";
import IUserManager from "./IUserManager";

class UserManager implements IUserManager {
  transformUserForRoom(userData: IUserTg, session: string) {
    const user: IUser = {
      photoUrl: userData.user.photoUrl ?? "",
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
      photoUrl: user.user.photoUrl ? user.user.photoUrl : "",
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
    const player: IPlayers = {
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

export default UserManager;
