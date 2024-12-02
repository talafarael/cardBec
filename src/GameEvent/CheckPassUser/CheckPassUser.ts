import { ICardOnTable } from "../../Card/CardOnTable/CardOnTable";
import { ISimpleCardDealer } from "../../Card/SimpleCardDealer/SimpleCardDealer";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserFindRoom } from "../../classWorkWithUser/UserFindRoom/UserFindRoom";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserPass } from "../../classWorkWithUser/UserPass/UserPass";
import { IUserPassCheck } from "../../classWorkWithUser/UserPassCheck/UserPassCheck";
import { IRoleAssigner } from "../../Role/RoleAssigner/RoleAssigner";
import { ICardInGame, IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";

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

export class CheckPassUser {
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
