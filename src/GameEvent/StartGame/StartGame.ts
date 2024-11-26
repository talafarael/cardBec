import { IMixCards } from "../../Card/MixCard/MixCard";
import { ISimpleCardDealer } from "../../Card/SimpleCardDealer/SimpleCardDealer";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserReadinessCheck } from "../../classWorkWithUser/UserReadinessCheck/UserReadinessCheck";
import { IData, IRoom, IRooms } from "../../Room";

export interface IStartGame {}
export class StartGame implements IStartGame {
  #userReadinessCheck: IUserReadinessCheck;
  #rooms: IRooms;
  #notifyUser: INotifyUser;
  #mixCards: IMixCards;
  #simpleCardDealer: ISimpleCardDealer;
  constructor(
    UserReadinessCheck: IUserReadinessCheck,
    rooms: IRooms,
    MixCards: IMixCards,
    SimpleCardDealer: ISimpleCardDealer,
    NotifyUser: INotifyUser
  ) {
    this.#userReadinessCheck = UserReadinessCheck;
    this.#rooms = rooms;
    this.#mixCards = MixCards;
    this.#simpleCardDealer = SimpleCardDealer;
    this.#notifyUser = NotifyUser;
  }
  StartGame(data: IData) {
    if (!data.roomId) {
      return;
    }

    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    if (Room.players.length < 2) {
      return;
    }
    if (!this.#userReadinessCheck.UserReadinessCheck(Room.players)) {
      return;
    }

    Room.card = this.#mixCards.Mix(Room.card);
    Room.trump = this.#simpleCardDealer.setTrumps(Room.card);
    this.#simpleCardDealer.startGame(Room);

    this.#notifyUser.sendNotification(Room, "startGame");
    this.#rooms.saveRoom(data.roomId, Room);
  }
}
