import { ICheckCardInUser } from "src/Card";
import ICardOnTable from "src/Card/CardOnTable/ICardOnTable";
import ICheckCardOnTable from "src/Card/CheckCardOnTable/ICheckCardOnTable";
import { INotifyUser } from "src/classMessage";
import {
  IUserCardRemove,
  IUserChakeState,
  IUserFindRoom,
  IUserPass,
} from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { IRooms } from "src/Room";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/CheckStateRoom";
import { IData, IRoom, IUserTg } from "src/Type";
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

class UserAttackAction {
  readonly #rooms;
  readonly #userParser;
  readonly #userFindRoom;
  readonly #notifyUser;
  readonly #userChakeState;
  readonly #checkState: ICheckStateRoom;
  readonly #checkCardOnTable: ICheckCardOnTable;
  readonly #checkCardInUser: ICheckCardInUser;
  readonly #cardOnTable: ICardOnTable;
  readonly #userCardRemove: IUserCardRemove;
  readonly #userPass: IUserPass;
  constructor(config: IUserAttackActionConfig) {
    this.#rooms = config.rooms;
    this.#userParser = config.userParser;
    this.#userFindRoom = config.userFindRoom;
    this.#notifyUser = config.notifyUser;
    this.#checkState = config.checkStateRoom;
    this.#userChakeState = config.userChakeState;
    this.#checkCardInUser = config.checkCardInUser;
    this.#checkCardOnTable = config.checkCardOnTable;
    this.#cardOnTable = config.cardOnTable;
    this.#userCardRemove = config.userCardRemove;
    this.#userPass = config.userPass;
  }
  UserAttack(data: IData) {
    if (!data.roomId || !data.card) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser: IUserTg = this.#userParser.userParser(data.userData);
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );

    if (!this.#checkState.checkStateGame(Room)) {
      return;
    }
    if (indexUser === -1) {
      return;
    }

    const user = Room.players[indexUser];
    if (!this.#userChakeState.ChakeStateAttack(user)) {
      return;
    }

    const indexCard = this.#checkCardInUser.CheckCardInUser(user, data.card);
    if (indexCard == -1) {
      return;
    }
    if (!this.#checkCardOnTable.checkIfCardIsZero(Room.cardsOnTable)) {
      return;
    }

    Room.cardsOnTable = this.#cardOnTable.PutCardAttack(
      data.card,
      Room.cardsOnTable
    );
    Room.players[indexUser].card = this.#userCardRemove.CardRemove(
      user.card,
      indexCard
    );
    Room.players = this.#userPass.UpdateAllUserPass(Room.players);
    this.#rooms.saveRoom(data.roomId, Room);
    console.log(5);
    this.#notifyUser.sendNotification(Room, "attack");
  }
}
export default UserAttackAction;
