import ICardOnTable from "src/Card/CardOnTable/ICardOnTable";
import ICheckCardOnTable from "src/Card/CheckCardOnTable/ICheckCardOnTable";
import ISimpleCardDealer from "src/Card/SimpleCardDealer/ISimpleCardDealer";
import { INotifyUser } from "src/classMessage";
import { IUserChakeState, IUserFindRoom, IUserPass } from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { IRooms } from "src/Room/Room/Room";
import { IData } from "src/Type";
export interface IGrabCardActionConfig {
    rooms: IRooms;
    userParser: IUserParser;
    userFindRoom: IUserFindRoom;
    notifyUser: INotifyUser;
    userChakeState: IUserChakeState;
    checkCardOnTable: ICheckCardOnTable;
    cardOnTable: ICardOnTable;
    simpleCardDealer: ISimpleCardDealer;
    userPass: IUserPass;
}
declare class GrabCardAction {
    #private;
    constructor(config: IGrabCardActionConfig);
    grabAll(data: IData): void;
}
export default GrabCardAction;
