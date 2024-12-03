import { WebSocket } from "ws";

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
