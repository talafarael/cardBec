import { cardData } from "./card.data";
import { IRoom } from "./Type";
export interface IManagerRoom {
  createRoom(owner: string,id:string): IRoom;
}
export class ManagerRoom implements IManagerRoom {
  createRoom(owner: string, id: string) {
    const Room: IRoom = {
      players: [],
      roomId: id,
      isGameActive: false,
      card: cardData,
      owner: owner,
      trump: null,
      pass: [],
      cardsOnTable: [],
      GrabState: false,
    };
    return Room;
  }
}
