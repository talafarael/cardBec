import { IPlayerPublisher, IPlayers } from "src/Type";
import IUserManager from "../UserManager/IUserManager";
import IUserPublisher from "./IUserPublisher";
declare class UserPublisher implements IUserPublisher {
    #private;
    constructor(userManager: IUserManager);
    mapPlayersToPublish(users: IPlayers[]): IPlayerPublisher[];
}
export default UserPublisher;
