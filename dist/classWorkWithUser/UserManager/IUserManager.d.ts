import { IPlayerPublisher, IPlayers, IUser, IUserTg } from "src/Type";
import { WebSocket } from "ws";
interface IUserManager {
    transformUserForRoom(userData: IUserTg, session: string): IUser;
    transformedPlayerPublisher(user: IPlayers): IPlayerPublisher;
    transformedPlayer(user: IUser, ws: WebSocket): IPlayers;
}
export default IUserManager;
