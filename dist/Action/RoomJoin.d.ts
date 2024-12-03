import { INotifyUser } from "src/classMessage";
import { IUserFindRoom, IUserManager } from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { IManagerRoom } from "src/ManagerRoom";
import { IData } from "src/Type";
import { WebSocket } from "ws";
import { IRooms } from "src/Room/Room/Room";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
export interface IRoomJoinConfig {
    rooms: IRooms;
    ws: WebSocket;
    managerRoom: IManagerRoom;
    userManager: IUserManager;
    userFindIndexInRoom: IUserFindRoom;
    userParser: IUserParser;
    notifyUser: INotifyUser;
    checkStateRoom: ICheckStateRoom;
}
declare class RoomJoin {
    #private;
    constructor(config: IRoomJoinConfig);
    joinRoom(data: IData): void;
    private sendError;
}
export default RoomJoin;
