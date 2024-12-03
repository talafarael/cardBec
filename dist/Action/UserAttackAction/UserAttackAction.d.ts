import { ICheckCardInUser } from "src/Card";
import ICardOnTable from "src/Card/CardOnTable/ICardOnTable";
import ICheckCardOnTable from "src/Card/CheckCardOnTable/ICheckCardOnTable";
import { INotifyUser } from "src/classMessage";
import { IUserCardRemove, IUserChakeState, IUserFindRoom, IUserPass } from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
import { IRooms } from "src/Room/Room/Room";
import { IData } from "src/Type";
export interface IUserAttackActionConfig {
    rooms: IRooms;
    userParser: IUserParser;
    userFindRoom: IUserFindRoom;
    notifyUser: INotifyUser;
    checkStateRoom: ICheckStateRoom;
    userChakeState: IUserChakeState;
    checkCardInUser: ICheckCardInUser;
    checkCardOnTable: ICheckCardOnTable;
    cardOnTable: ICardOnTable;
    userCardRemove: IUserCardRemove;
    userPass: IUserPass;
}
declare class UserAttackAction {
    #private;
    constructor(config: IUserAttackActionConfig);
    UserAttack(data: IData): void;
}
export default UserAttackAction;
