import { ICheckCardInUser, ICheckRankOnTable } from "src/Card";
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
export interface IUserAddCardActionConfig {
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
  checkRankOnTable: ICheckRankOnTable;
  userPass: IUserPass;
}
class UserAddCardAction {
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
  readonly #checkRankOnTable: ICheckRankOnTable;
  readonly #userPass: IUserPass;
  constructor(config: IUserAddCardActionConfig) {
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
    this.#checkRankOnTable = config.checkRankOnTable;
    this.#userPass = config.userPass;
  }
  UserAddCardAction(data: IData) {
    if (!data.roomId || !data.card) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser: IUserTg = this.#userParser.userParser(data.userData);
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    //state room in game
    console.log(1);
    if (!this.#checkState.checkStateGame(Room)) {
      return;
    }
    if (indexUser === -1) {
      return;
    }

    const user = Room.players[indexUser];
    if (this.#userChakeState.ChakeStateDefending(user)) {
      return;
    }
    const indexCard = this.#checkCardInUser.CheckCardInUser(user, data.card);
    if (indexCard == -1) {
      return;
    }
    if (
      !this.#checkRankOnTable.CheckRankOnTable(Room.cardsOnTable, data.card)
    ) {
      return;
    }
    if (!this.#checkCardOnTable.checkIfCardMaxMinForAdd(Room.cardsOnTable)) {
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

    this.#notifyUser.sendNotification(Room, "attack");
  }
}
export default UserAddCardAction;
