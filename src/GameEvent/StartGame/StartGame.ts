import { IUserReadinessCheck } from "src/classWorkWithUser";
import { IRoomStater } from "../../Room/RoomStater/RoomStater";
import { IMixCards } from "src/Card";
import ISimpleCardDealer from "src/Card/SimpleCardDealer/ISimpleCardDealer";
import { INotifyUser } from "src/classMessage";
import { IData, IRoom } from "src/Type";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
import { IRooms } from "src/Room/Room/Room";
import { IRoleAssigner } from "src/Role";

export interface IStartGameConfig {
  userReadinessCheck: IUserReadinessCheck;
  rooms: IRooms;
  mixCards: IMixCards;
  simpleCardDealer: ISimpleCardDealer;
  notifyUser: INotifyUser;
  roomStater: IRoomStater;
  checkStateRoom: ICheckStateRoom;
  roleAssigner: IRoleAssigner;
}
export interface IStartGame {}
class StartGame implements IStartGame {
  readonly #userReadinessCheck: IUserReadinessCheck;
  readonly #rooms: IRooms;
  readonly #notifyUser: INotifyUser;
  readonly #roomStater: IRoomStater;
  readonly #mixCards: IMixCards;
  readonly #simpleCardDealer: ISimpleCardDealer;
  readonly #checkState: ICheckStateRoom;
  readonly #roleAssigner: IRoleAssigner;
  constructor(config: IStartGameConfig) {
    this.#userReadinessCheck = config.userReadinessCheck;
    this.#rooms = config.rooms;
    this.#mixCards = config.mixCards;
    this.#simpleCardDealer = config.simpleCardDealer;
    this.#notifyUser = config.notifyUser;
    this.#roomStater = config.roomStater;
    this.#checkState = config.checkStateRoom;
    this.#roleAssigner = config.roleAssigner;
  }
  StartGame(data: IData) {
    if (!data.roomId) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    if (!this.#checkState.checkUserCount(Room)) {
      return;
    }
    if (this.#checkState.checkStateGame(Room)) {
      return;
    }
    if (!this.#userReadinessCheck.UserReadinessCheck(Room.players)) {
      return;
    }

    Room.card = this.#mixCards.Mix(Room.card);
    Room.trump = this.#simpleCardDealer.setTrumps(Room.card);
    this.#simpleCardDealer.startGame(Room);
    this.#roomStater.roomStart(Room);
    this.#roleAssigner.startAssignRole(Room);
    this.#notifyUser.sendNotification(Room, "startGame");

    this.#rooms.saveRoom(data.roomId, Room);
  }
}
export default StartGame;
