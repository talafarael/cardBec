import { IData, IPlayers, IRoom, IRooms, IUser } from "../Room";
import { v4 as uuidv4 } from "uuid";
import { cardData } from "../card.data";
import { parseInitData } from "@telegram-apps/sdk-react";

import { WebSocket } from "ws";
import { IManagerRoom, ManagerRoom } from "../ManagerRoom";
import {
  IUserManager,
  IUserTg,
  UserManager,
} from "../classWorkWithUser/UserManager/UserManager";
import { IUserFindRoom } from "../classWorkWithUser/UserFindRoom/UserFindRoom";
import {
  IUserParser,
  UserParser,
} from "../classWorkWithUser/UserParser/UserParser";
import { INotifyUser } from "../classMessage/NotifyUser/NotifyUser";
import { ICheckStateRoom } from "../Room/CheckStateRoom/CheckStateRoom";
export class RoomJoin {
  rooms;
  ws;
  #notifyUser: INotifyUser;
  managerRoom;
  userManager;
  UserFindIndexInRoom;
  userParser;
  #checkState: ICheckStateRoom;
  constructor(
    rooms: IRooms,
    ws: WebSocket,
    ManagareRoom: IManagerRoom,
    UserManager: IUserManager,
    UserFindIndexInRoom: IUserFindRoom,
    UserParser: IUserParser,
    NotifyUser: INotifyUser,
    CheckStateRoom: ICheckStateRoom
  ) {
    this.rooms = rooms;
    this.ws = ws;
    this.managerRoom = ManagareRoom;
    this.userManager = UserManager;
    this.UserFindIndexInRoom = UserFindIndexInRoom;
    this.userParser = UserParser;
    this.#notifyUser = NotifyUser;
    this.#checkState = CheckStateRoom;
  }
  joinRoom(data: IData) {
    if (!data.roomId) {
      const session = uuidv4();
      const parserUser = this.userParser.userParser(data.userData) as IUserTg;

      const Room: IRoom = this.managerRoom.createRoom(
        parserUser.user.id.toString()
      );
      const user = this.userManager.transformUserForRoom(parserUser, session);

      Room.players.push(this.userManager.transformedPlayer(user, this.ws));
      this.rooms.saveRoom(Room.roomId, Room);
      this.#notifyUser.sendNotification(Room, "join");
      return;
    }

    let Room = this.rooms.getRoom(data.roomId) as IRoom;

    if (!Room) {
      this.ws.send(JSON.stringify(this.sendError("room is not dei")));
      return;
    }
    if (Room.players.length == 0) {
      return;
    }

    const parserUser = this.userParser.userParser(data.userData);
    const playerIndex = this.UserFindIndexInRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    if (this.#checkState.checkStateGame(Room) && playerIndex == -1) {
      return;
    }
    const session = uuidv4();
    if (playerIndex != -1) {
      Room.players[playerIndex].ws = this.ws;
      this.rooms.saveRoom(data.roomId, Room);
    } else {
      const user = this.userManager.transformUserForRoom(parserUser, session);

      // (this.rooms.rooms[data.roomId] as IRoom).players[playerIndex].ws = this.ws;
      Room.players.push(this.userManager.transformedPlayer(user, this.ws));
    }
    this.rooms.saveRoom(data.roomId, Room);
    this.#notifyUser.sendNotification(Room, "join");
  }
  private sendError(message: string) {
    this.ws.send(JSON.stringify({ status: "error", message }));
  }
}
