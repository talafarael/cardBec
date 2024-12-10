import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import {
  IUserFindRoom,
  IUserPass,
  IUserPassCheck,
} from "src/classWorkWithUser";
import { INotifyUser } from "src/classMessage";
import ICardOnTable from "src/Card/CardOnTable/ICardOnTable";
import ISimpleCardDealer from "src/Card/SimpleCardDealer/ISimpleCardDealer";
import { ICardInGame, IData, IRoom } from "src/Type";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
import { IRooms } from "src/Room/Room/Room";
import { IRoleAssigner } from "src/Role";

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

class CheckPassUser {
  readonly #rooms;
  readonly #userParser;
  readonly #userFindRoom;
  readonly #notifyUser;
  readonly #checkStateRoom: ICheckStateRoom;

  readonly #cardOnTable: ICardOnTable;

  readonly #simpleCardDealer: ISimpleCardDealer;
  readonly #userPassCheck: IUserPassCheck;
  readonly #roleAssigner: IRoleAssigner;
  readonly #userPass: IUserPass;
  constructor(config: ICheckPassUserConfig) {
    this.#rooms = config.rooms;
    this.#userParser = config.userParser;
    this.#userFindRoom = config.userFindRoom;
    this.#notifyUser = config.notifyUser;
    this.#checkStateRoom = config.checkStateRoom;
    this.#cardOnTable = config.cardOnTable;
    this.#userPassCheck = config.userPassCheck;
    this.#simpleCardDealer = config.simpleCardDealer;
    this.#roleAssigner = config.roleAssigner;
    this.#userPass = config.userPass;
  }
  CheckPassUser(data: IData) {
    if (!data.roomId) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser = this.#userParser.userParser(data.userData);
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );

    if (!this.#checkStateRoom.checkStateGame(Room)) {
      return;
    }

    if (indexUser === -1) {
      return;
    }

    if (!this.#userPassCheck.UserPassCheck(Room.players)) {
      return;
    }

    this.#simpleCardDealer.startGame(Room);
    this.#roleAssigner.nextAssignRole(Room);

    Room.players = this.#userPass.UpdateAllUserPass(Room.players);
    const { cardOnTable, pass } = this.#cardOnTable.removeCard(
      Room.cardsOnTable,
      Room.pass
    ) as {
      cardOnTable: ICardInGame[];
      pass: ICardInGame[];
    };
    Room.cardsOnTable = cardOnTable;
    Room.pass = pass;
    this.#rooms.saveRoom(data.roomId, Room);
    this.#notifyUser.sendNotification(Room, "pass");
  }
}
export default CheckPassUser;
