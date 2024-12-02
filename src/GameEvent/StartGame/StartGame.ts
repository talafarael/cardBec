import { IMixCards } from "../../Card/MixCard/MixCard";
import { ISimpleCardDealer } from "../../Card/SimpleCardDealer/SimpleCardDealer";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";

import { IUserReadinessCheck } from "../../classWorkWithUser/UserReadinessCheck/UserReadinessCheck";
import { IRoleAssigner } from "../../Role/RoleAssigner/RoleAssigner";
import { IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";
import { IRoomStater } from "../../Room/RoomStater/RoomStater";

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
export class StartGame implements IStartGame {
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
