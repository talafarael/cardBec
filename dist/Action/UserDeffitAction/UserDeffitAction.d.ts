import { ICheckCardInUser, IComparisonCard } from "src/Card";
import ICardOnTable from "src/Card/CardOnTable/ICardOnTable";
import { INotifyUser } from "src/classMessage";
import { IUserCardRemove, IUserChakeState, IUserFindRoom, IUserPass } from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
import { IRooms } from "src/Room/Room/Room";
import { ICard, IData } from "src/Type";
export interface IDefData extends IData {
    attacCard: ICard;
}
export interface IUserDeffitActionConfig {
    rooms: IRooms;
    userParser: IUserParser;
    userFindRoom: IUserFindRoom;
    notifyUser: INotifyUser;
    checkStateRoom: ICheckStateRoom;
    userChakeState: IUserChakeState;
    checkCardInUser: ICheckCardInUser;
    cardOnTable: ICardOnTable;
    userCardRemove: IUserCardRemove;
    comparisonCard: IComparisonCard;
    userPass: IUserPass;
}
export declare class UserDeffitAction {
    #private;
    constructor(config: IUserDeffitActionConfig);
    UserDeffitAction(data: IDefData): void;
}
