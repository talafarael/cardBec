import { v4 as uuidv4 } from "uuid";
import { cardData } from "./card.data";
import { parseInitData } from "@telegram-apps/sdk-react";
import { WebSocket } from "ws";
export interface IUser {
  session: string;
  hash: string;
  allowsWriteToPm: boolean | null | undefined;
  firstName: string | null;
  id: number;
  username: string | null | undefined;
}
export interface ICard {
  rank: string;
  suit: string;
}
export interface IPlayers {
  user: IUser;
  card: any[];
  ws: WebSocket;
  state: boolean;
  startGameState: boolean;
}
export interface IRoom {
  players: IPlayers[];
  isGameActive: boolean;
  roomId: string;
  card: ICard[];
  owner: string;
}
export interface IRooms {
  rooms: { [key: string]: IRoom | {} };
}
export class Rooms implements IRooms {
  rooms: { [key: string]: IRoom | {} } = {};
}
interface IData {
  roomId: string | undefined;
  userData: string;
  action: string;
}
export class RoomJoin {
  rooms;
  ws;
  constructor(rooms: IRooms, ws: WebSocket) {
    this.rooms = rooms;
    this.ws = ws;
  }
  joinRoom(data: IData) {
    if (!data.roomId) {
      const RoomId: string = uuidv4();
      const Room: IRoom = {
        players: [],
        roomId: RoomId,
        isGameActive: false,
        card: cardData,
      };
      const session = uuidv4();
      const parserUser = parseInitData(data.userData);
      if (!parserUser.user) {
        return;
      }

      const user: IUser = {
        session: session,
        hash: parserUser.hash,
        id: parserUser.user.id,
        allowsWriteToPm: parserUser.user.allowsWriteToPm,
        username: parserUser.user.username,
        firstName: parserUser.user.firstName,
      };

      Room.players.push({
        state: false,
        startGameState: false,
        user: user,
        card: [],
        ws: this.ws,
      });
      this.rooms.rooms[RoomId] = Room;
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

    const Room = this.rooms.rooms[data.roomId] as IRoom;
    if (!Room) {
      this.ws.send(JSON.stringify(this.sendError("room is not dei")));
      return;
    }
    if (Room.players.length == 0) {
      return;
    }
    const parserUser = parseInitData(data.userData);
    if (!parserUser.user) {
      return;
    }
    const user = parserUser.user;
    const playerIndex = Room.players.findIndex(
      (elem: IPlayers) => elem.user.id == user.id
    );
    if (playerIndex == -1) {
      this.ws.send(JSON.stringify(this.sendError("user is not find")));
      return;
    }

    (this.rooms.rooms[data.roomId] as IRoom).players[playerIndex].ws = this.ws;
    (this.rooms.rooms[data.roomId] as IRoom).players[playerIndex].ws = this.ws;
    const session = uuidv4();
    const res = {
      session: session,
      action: "join",
      Room: Room,
      roomId: data.roomId,
      you: user,
    };
    this.ws.send(JSON.stringify(res));
  }
  private sendError(message: string) {
    this.ws.send(JSON.stringify({ status: "error", message }));
  }
}
// class RoomMAmanger {
//   private rooms: { [key: string]: IRoom };

//   constructor(rooms: { [key: string]: IRoom }) {
//     this.rooms = rooms;
//   }

//   addPlayerToRoom(room: IRoom, player: IPlayers) {
//     Room.players.push({
//       state: false,
//       startGameState: false,
//       user: user,
//       card: [],
//       ws: this.ws,
//     });
//   }
// }
