import { IMixCards } from "../../Card/MixCard/MixCard";
import { ISimpleCardDealer } from "../../Card/SimpleCardDealer/SimpleCardDealer";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserReadinessCheck } from "../../classWorkWithUser/UserReadinessCheck/UserReadinessCheck";
import { IRoleAssigner } from "../../Role/RoleAssigner/RoleAssigner";
import { IData, IRoom, IRooms } from "../../Room";
import {
  CheckStateRoom,
  ICheckStateRoom,
} from "../../Room/CheckStateRoom/CheckStateRoom";
import { IRoomStater, RoomStater } from "../../Room/RoomStater/RoomStater";

export interface IStartGame {}
export class StartGame implements IStartGame {
  #userReadinessCheck: IUserReadinessCheck;
  #rooms: IRooms;
  #notifyUser: INotifyUser;
  #roomStater: IRoomStater;
  #mixCards: IMixCards;
  #simpleCardDealer: ISimpleCardDealer;
  #checkState: ICheckStateRoom;
  #roleAssigner: IRoleAssigner;
  constructor(
    UserReadinessCheck: IUserReadinessCheck,
    rooms: IRooms,
    MixCards: IMixCards,
    SimpleCardDealer: ISimpleCardDealer,
    NotifyUser: INotifyUser,
    RoomStater: IRoomStater,
    CheckStateRoom: ICheckStateRoom,
    RoleAssigner: IRoleAssigner
  ) {
    this.#userReadinessCheck = UserReadinessCheck;
    this.#rooms = rooms;
    this.#mixCards = MixCards;
    this.#simpleCardDealer = SimpleCardDealer;
    this.#notifyUser = NotifyUser;
    this.#roomStater = RoomStater;
    this.#checkState = CheckStateRoom;
    this.#roleAssigner = RoleAssigner;
  }
  StartGame(data: IData) {
    if (!data.roomId) {
      return;
    }

    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    if (!this.#checkState.checkUserCount(Room)) {
      return;
    }
    if(this.#checkState.checkStateGame(Room)){
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
