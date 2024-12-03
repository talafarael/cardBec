import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { IUserFindRoom, IUserPass, IUserPassCheck } from "src/classWorkWithUser";
import { INotifyUser } from "src/classMessage";
import ICardOnTable from "src/Card/CardOnTable/ICardOnTable";
import ISimpleCardDealer from "src/Card/SimpleCardDealer/ISimpleCardDealer";
import { IRoleAssigner } from "src/Role/RoleAssigner/RoleAssigner";
import { IData } from "src/Type";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
import { IRooms } from "src/Room/Room/Room";
export interface ICheckPassUserConfig {
    rooms: IRooms;
    userParser: IUserParser;
    userFindRoom: IUserFindRoom;
    notifyUser: INotifyUser;
    checkStateRoom: ICheckStateRoom;
    cardOnTable: ICardOnTable;
    userPassCheck: IUserPassCheck;
    simpleCardDealer: ISimpleCardDealer;
    roleAssigner: IRoleAssigner;
    userPass: IUserPass;
}
declare class CheckPassUser {
    #private;
    constructor(config: ICheckPassUserConfig);
    CheckPassUser(data: IData): void;
}
export default CheckPassUser;
