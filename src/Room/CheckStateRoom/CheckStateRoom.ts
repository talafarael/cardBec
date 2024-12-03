import { IRoom } from "src/Type";
import { ICheckStateRoom } from "./ICheckStateRoom";

class CheckStateRoom implements ICheckStateRoom {
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
export default CheckStateRoom;
