"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rooms {
    constructor() {
        this.rooms = {};
        // getRoom(roomId: string): IRoom | null {
        //   return this.rooms[roomId] ?? null;
        // }
    }
    getRoom(roomId) {
        var _a;
        return (_a = this.rooms[roomId]) !== null && _a !== void 0 ? _a : null;
    }
    saveRoom(roomId, room) {
        this.rooms[roomId] = room;
        console.log(roomId);
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
exports.default = Rooms;
