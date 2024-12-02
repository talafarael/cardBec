import { ICardOnTable } from "../../Card/CardOnTable/CardOnTable";
import { ICheckCardOnTable } from "../../Card/CheckCardOnTable/CheckCardOnTable";
import { ISimpleCardDealer } from "../../Card/SimpleCardDealer/SimpleCardDealer";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserChakeState } from "../../classWorkWithUser/UserChakeState/UserChakeState";
import { IUserFindRoom } from "../../classWorkWithUser/UserFindRoom/UserFindRoom";
import { IUserTg } from "../../classWorkWithUser/UserManager/UserManager";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserPass } from "../../classWorkWithUser/UserPass/UserPass";

import { ICard, ICardInGame, IData, IRoom, IRooms } from "../../Room";
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

 class GrabCardAction {
  readonly #rooms: IRooms;
  readonly #userParser: IUserParser;
  readonly #userFindRoom: IUserFindRoom;
  readonly #notifyUser: INotifyUser;
  readonly #userChakeState: IUserChakeState;
  readonly #checkCardOnTable: ICheckCardOnTable;
  readonly #cardOnTable: ICardOnTable;
  readonly #simpleCardDealer: ISimpleCardDealer;
  readonly #userPass: IUserPass;

  constructor(config: IGrabCardActionConfig) {
    this.#rooms = config.rooms;
    this.#userParser = config.userParser;
    this.#userFindRoom = config.userFindRoom;
    this.#notifyUser = config.notifyUser;
    this.#userChakeState = config.userChakeState;
    this.#checkCardOnTable = config.checkCardOnTable;
    this.#cardOnTable = config.cardOnTable;
    this.#simpleCardDealer = config.simpleCardDealer;
    this.#userPass = config.userPass;
  }
  grabAll(data: IData) {
    if (!data.roomId) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser: IUserTg = this.#userParser.userParser(data.userData);
    const indexUser: number = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    console.log(1);
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
export default GrabCardAction;
