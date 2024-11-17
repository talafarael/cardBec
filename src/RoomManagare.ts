import { cardData } from "./card.data";
import { IRoom } from "./Room";
import { v4 as uuidv4 } from "uuid";
export class RoomManager {
  private rooms: { [key: string]: IRoom } = {};

  createRoom(): IRoom {
    const roomId = uuidv4();
    const room: IRoom = {
      players: [],
      roomId,
      isGameActive: false,
      card: cardData,
    };
    this.rooms[roomId] = room;
    return room;
  }

  getRoom(roomId: string): IRoom | null {
    return this.rooms[roomId] || null;
  }

  addRoom(room: IRoom) {
    this.rooms[room.roomId] = room;
  }

  getAllRooms() {
    return this.rooms;
  }
}
