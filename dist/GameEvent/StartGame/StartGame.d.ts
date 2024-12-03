import { IUserReadinessCheck } from "src/classWorkWithUser";
import { IRoleAssigner } from "../../Role/RoleAssigner/RoleAssigner";
import { IRoomStater } from "../../Room/RoomStater/RoomStater";
import { IMixCards } from "src/Card";
import ISimpleCardDealer from "src/Card/SimpleCardDealer/ISimpleCardDealer";
import { INotifyUser } from "src/classMessage";
import { IData } from "src/Type";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
import { IRooms } from "src/Room/Room/Room";
export interface IStartGameConfig {
    userReadinessCheck: IUserReadinessCheck;
    rooms: IRooms;
    mixCards: IMixCards;
    simpleCardDealer: ISimpleCardDealer;
    notifyUser: INotifyUser;
    roomStater: IRoomStater;
    checkStateRoom: ICheckStateRoom;
    roleAssigner: IRoleAssigner;
}
export interface IStartGame {
}
declare class StartGame implements IStartGame {
    #private;
    constructor(config: IStartGameConfig);
    StartGame(data: IData): void;
}
export default StartGame;
