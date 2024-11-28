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
  level: number;
}
export interface IPlayers {
  user: IUser;
  card: ICard[];
  ws: WebSocket;
  state: string;
  startGameState: boolean;
  passState: boolean;
}
export interface IRoom {
  players: IPlayers[];
  isGameActive: boolean;
  roomId: string;
  card: ICard[];
  owner: string;
  trump: ICard | null;
  pass: ICard[];
  cardsOnTable: ICardInGame[];
}

export interface ICardInGame {
  attack: ICard;
  deffit: ICard | null;
}
export interface IRooms {
  // rooms: { [key: string]: IRoom | {} };
  saveRoom(roomId: string, room: IRoom): void;
  getRoom(id: string): IRoom | null;
}
export class Rooms implements IRooms {
  private rooms: { [key: string]: IRoom } = {};

  getRoom(roomId: string): IRoom | null {
    return this.rooms[roomId] ?? null;
  }

  saveRoom(roomId: string, room: IRoom): void {
    this.rooms[roomId] = room;
  }
  // getRoom(roomId: string): IRoom | null {

  //   return this.rooms[roomId] ?? null;
  // }
}
export interface ICard {
  rank: string;
  suit: string;
}
export interface IData {
  roomId: string | undefined;
  userData: string;
  action: string;
  card: ICard | null;
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
