import { IPlayerPublisher, IPlayers, IUser, IUserTg } from "src/Type";
import WebSocket from "ws";
import IUserManager from "./IUserManager";
declare class UserManager implements IUserManager {
    transformUserForRoom(userData: IUserTg, session: string): IUser;
    transformedPlayerPublisher(user: IPlayers): IPlayerPublisher;
    transformedPlayer(user: IUser, ws: WebSocket): IPlayers;
}
export default UserManager;
