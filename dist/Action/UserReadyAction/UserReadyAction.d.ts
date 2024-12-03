import { INotifyUser } from "src/classMessage";
import { IUserChangeStartGame, IUserFindRoom } from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
import { IRooms } from "src/Room/Room/Room";
import { IData } from "src/Type";
declare class UserReadyAction {
    #private;
    constructor(rooms: IRooms, UserParser: IUserParser, UserFindRoom: IUserFindRoom, UserChangeStartGame: IUserChangeStartGame, NotifyUser: INotifyUser, CheckStateRoom: ICheckStateRoom);
    UserReady(data: IData): void;
}
export default UserReadyAction;
