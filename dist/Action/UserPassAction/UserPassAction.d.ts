import ICheckCardOnTable from "src/Card/CheckCardOnTable/ICheckCardOnTable";
import { INotifyUser } from "src/classMessage";
import { IUserFindRoom, IUserPass } from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
import { IRooms } from "src/Room/Room/Room";
import { IData } from "src/Type";
declare class UserPassAction {
    #private;
    constructor(rooms: IRooms, UserParser: IUserParser, UserFindRoom: IUserFindRoom, NotifyUser: INotifyUser, CheckStateRoom: ICheckStateRoom, CheckCardOnTable: ICheckCardOnTable, UserPass: IUserPass);
    UserPassAttacAction(data: IData): void;
}
export default UserPassAction;
