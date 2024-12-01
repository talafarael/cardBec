import { ICardOnTable } from "../../Card/CardOnTable/CardOnTable";
import { ICheckCardInUser } from "../../Card/CheckCardInUser/CheckCardInUser";
import { ICheckCardOnTable } from "../../Card/CheckCardOnTable/CheckCardOnTable";
import {
  ISimpleCardDealer,
  SimpleCardDealer,
} from "../../Card/SimpleCardDealer/SimpleCardDealer";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserCardRemove } from "../../classWorkWithUser/UserCardRemove/UserCardRemove";
import { IUserChakeState } from "../../classWorkWithUser/UserChakeState/UserChakeState";
import { IUserChangeStartGame } from "../../classWorkWithUser/UserChangeStartGame/UserChangeStartGame";
import { IUserFindRoom } from "../../classWorkWithUser/UserFindRoom/UserFindRoom";
import { IUserTg } from "../../classWorkWithUser/UserManager/UserManager";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserPass } from "../../classWorkWithUser/UserPass/UserPass";
import { IUserPassCheck } from "../../classWorkWithUser/UserPassCheck/UserPassCheck";
import { IRoleAssigner } from "../../Role/RoleAssigner/RoleAssigner";
import { ICard, ICardInGame, IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";

export class GrabCardAction {
  #rooms;
  #userParser;
  #userFindRoom;

  #notifyUser;
  #userChakeState;

  #checkCardOnTable: ICheckCardOnTable;

  #cardOnTable: ICardOnTable;

  #simpleCardDealer: ISimpleCardDealer;

  #roleAssigner: IRoleAssigner;
  #userPass: IUserPass;
  constructor(
    rooms: IRooms,
    UserParser: IUserParser,
    UserFindRoom: IUserFindRoom,

    NotifyUser: INotifyUser,

    UserChakeState: IUserChakeState,

    CheckCardOnTable: ICheckCardOnTable,
    CardOnTable: ICardOnTable,

    SimpleCardDealer: ISimpleCardDealer,
    // ManagareRoom: IManagerRoom,
    RoleAssigner: IRoleAssigner,
    UserPass: IUserPass
  ) {
    this.#rooms = rooms;
    this.#userParser = UserParser;
    this.#userFindRoom = UserFindRoom;

    this.#notifyUser = NotifyUser;

    this.#userChakeState = UserChakeState;

    this.#checkCardOnTable = CheckCardOnTable;
    this.#cardOnTable = CardOnTable;

    this.#simpleCardDealer = SimpleCardDealer;
    this.#roleAssigner = RoleAssigner;
    this.#userPass = UserPass;
    // this.#managerRoom = ManagareRoom;
  }
  grabAll(data: IData) {
    if (!data.roomId) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser = this.#userParser.userParser(data.userData) as IUserTg;
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    console.log(1)
    if (this.#checkCardOnTable.checkIfCardIsZero(Room.cardsOnTable)) {
      return;
    }
    const user = Room.players[indexUser];
    
   
    if (!this.#userChakeState.ChakeStateDefending(user)) {
      return;
    }

    ({ cardOnTable: Room.cardsOnTable, card: user.card } =
      this.#cardOnTable.pickUpAllCard(Room.cardsOnTable, user.card) as {
        cardOnTable: ICardInGame[];
        card: ICard[];
      });
    this.#simpleCardDealer.startGame(Room);

    Room.players = this.#userPass.UpdateAllUserPass(Room.players);
    this.#rooms.saveRoom(data.roomId, Room);
    this.#notifyUser.sendNotification(Room, "grab");
  }
}
