import { INotifyUser } from "src/classMessage";
import { IUserFindRoom, IUserManager } from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { IManagerRoom } from "src/ManagerRoom";

import { IData, IDataUserJoinWeb, IRoom, IUserTg } from "src/Type";
import { WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";
import { IRooms } from "src/Room/Room/Room";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";

export interface IRoomJoinConfig {
  rooms: IRooms;
  ws: WebSocket;
  managerRoom: IManagerRoom;
  userManager: IUserManager;
  userFindIndexInRoom: IUserFindRoom;
  userParser: IUserParser;
  notifyUser: INotifyUser;
  checkStateRoom: ICheckStateRoom;
}
class RoomJoin {
  readonly #rooms;
  readonly #ws;
  readonly #notifyUser: INotifyUser;
  readonly #managerRoom;
  readonly #userManager;
  readonly #userFindIndexInRoom;
  readonly #userParser;
  readonly #checkState: ICheckStateRoom;
  constructor(config: IRoomJoinConfig) {
    this.#rooms = config.rooms;
    this.#ws = config.ws;
    this.#managerRoom = config.managerRoom;
    this.#userManager = config.userManager;
    this.#userFindIndexInRoom = config.userFindIndexInRoom;
    this.#userParser = config.userParser;
    this.#notifyUser = config.notifyUser;
    this.#checkState = config.checkStateRoom;
  }
  joinRoomToTg(data: IDataUserJoinWeb) {
    if (!data.roomId) {
      const session = uuidv4();
      const roomId = uuidv4();
    }
  }
  joinRoom(data: IData | IDataUserJoinWeb) {
    let parserUser;
    if (typeof data.userData == "string") {
      parserUser = this.#userParser.userParser(data.userData);
    } else {
      console.log(data.userData)
      parserUser = data.userData
    }
    if (!data.roomId) {
      const session = uuidv4();
      const roomId = uuidv4();

      const Room: IRoom = this.#managerRoom.createRoom(
        parserUser.user.id.toString(),
        roomId
      );
      const user = this.#userManager.transformUserForRoom(parserUser, session);

      Room.players.push(this.#userManager.transformedPlayer(user, this.#ws));
      this.#rooms.saveRoom(Room.roomId, Room);
      this.#notifyUser.sendNotification(Room, "join");
      return;
    }

    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    if (!Room) {
      Room = this.#managerRoom.createRoom(
        parserUser.user.id.toString(),
        data.roomId.toString()
      );
      const session = uuidv4();
      const user = this.#userManager.transformUserForRoom(parserUser, session);
      Room.players.push(this.#userManager.transformedPlayer(user, this.#ws));
      console.log("new room");
    }
    if (Room.players.length == 0) {
      return;
    }

    const playerIndex = this.#userFindIndexInRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    if (this.#checkState.checkStateGame(Room) && playerIndex == -1) {
      return;
    }
    const session = uuidv4();
    if (playerIndex != -1) {
      Room.players[playerIndex].ws = this.#ws;

      this.#rooms.saveRoom(data.roomId, Room);
    } else {
      const user = this.#userManager.transformUserForRoom(parserUser, session);

      // (this.rooms.rooms[data.roomId] as IRoom).players[playerIndex].ws = this.ws;
      Room.players.push(this.#userManager.transformedPlayer(user, this.#ws));
    }
    this.#rooms.saveRoom(data.roomId, Room);
    this.#notifyUser.sendNotification(Room, "join");
  }
  private sendError(message: string) {
    this.#ws.send(JSON.stringify({ status: "error", message }));
  }
}
export default RoomJoin;
