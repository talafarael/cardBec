import ICardOnTable from "src/Card/CardOnTable/ICardOnTable";
import ICheckCardOnTable from "src/Card/CheckCardOnTable/ICheckCardOnTable";
import ISimpleCardDealer from "src/Card/SimpleCardDealer/ISimpleCardDealer";
import { INotifyUser } from "src/classMessage";
import {
  IUserChakeState,
  IUserFindRoom,
  IUserPass,
} from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { IRooms } from "src/Room";
import { ICard, ICardInGame, IData, IRoom, IUserTg} from "src/Type";

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
