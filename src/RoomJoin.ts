import { IData, IPlayers, IRoom, IRooms, IUser } from "./Room";
import { v4 as uuidv4 } from "uuid";
import { cardData } from "./card.data";
import { parseInitData } from "@telegram-apps/sdk-react";

import { WebSocket } from "ws";
import { IManagerRoom, ManagerRoom } from "./ManagerRoom";
import {
  IUserManager,
  IUserTg,
  UserManager,
} from "./classWorkWithUser/UserManager";
import { IUserFindRoom } from "./classWorkWithUser/UserFindRoom";
export class RoomJoin {
  rooms;
  ws;
  managerRoom;
  userManager;
  UserFindIndexInRoom;
  constructor(
    rooms: IRooms,
    ws: WebSocket,
    ManagareRoom: IManagerRoom,
    UserManager: IUserManager,
    UserFindIndexInRoom: IUserFindRoom
  ) {
    this.rooms = rooms;
    this.ws = ws;
    this.managerRoom = ManagareRoom;
    this.userManager = UserManager;
    this.UserFindIndexInRoom = UserFindIndexInRoom;
  }
  joinRoom(data: IData) {
    if (!data.roomId) {
      const RoomId: string = uuidv4();

      const session = uuidv4();
      const parserUser = this.userManager.userParser(data.userData) as IUserTg;

      const Room: IRoom = this.managerRoom.createRoom(
        parserUser.user.id.toString()
      );
      const user = this.userManager.transformUserForRoom(parserUser, session);

      Room.players.push({
        state: false,
        startGameState: false,
        user: user,
        card: [],
        ws: this.ws,
      });
      this.rooms.saveRoom(RoomId, Room);
      const res = {
        session: session,
        action: "join",
        Room: Room,
        roomId: RoomId,
        you: user,
      };

      this.ws.send(JSON.stringify(res));
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
    const parserUser = this.userManager.userParser(data.userData);
    const playerIndex = this.UserFindIndexInRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );

    const session = uuidv4();
    if (playerIndex != -1) {
      Room.players[playerIndex].ws = this.ws;
      this.rooms.saveRoom(data.roomId, Room);
    } else {
      const user = this.userManager.transformUserForRoom(parserUser, session);

      // (this.rooms.rooms[data.roomId] as IRoom).players[playerIndex].ws = this.ws;
      Room.players.push({
        state: false,
        startGameState: false,
        user: user,
        card: [],
        ws: this.ws,
      });
    }
    this.rooms.saveRoom(data.roomId, Room);
    const res = {
      session: session,
      action: "join",
      Room: Room,
      roomId: data.roomId,
      you: parserUser,
    };
    this.ws.send(JSON.stringify(res));
  }
  private sendError(message: string) {
    this.ws.send(JSON.stringify({ status: "error", message }));
  }
}
