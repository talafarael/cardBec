import { cardData } from "./card.data";
import { IRoom } from "./Room";
import { v4 as uuidv4 } from "uuid";
export interface IManagerRoom {
  createRoom(owner: string): IRoom;
}
export class ManagerRoom implements IManagerRoom {
  createRoom(owner: string) {
    const Room: IRoom = {
      players: [],
      roomId: uuidv4(),
      isGameActive: false,
      card: cardData,
      owner: owner,
    };
    return Room;
  }
}
