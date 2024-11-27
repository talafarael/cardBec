import { IRoom } from "../../Room";

export interface ICheckStateRoom {
  checkStateGame(room: IRoom): boolean;
  checkUserCount(room: IRoom): boolean;
}
export class CheckStateRoom implements ICheckStateRoom {
  checkStateGame(room: IRoom) {
    if (room.isGameActive) {
      return true;
    }
    return false;
  }
  checkUserCount(room: IRoom) {
    if (room.players.length < 2) {
      return false;
    }
    return true;
  }
}
