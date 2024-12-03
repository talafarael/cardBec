import { IRoom } from "src/Type";

export interface IRoomStater {
  roomStart(room: IRoom): void;
}
class RoomStater implements IRoomStater {
  roomStart(room: IRoom) {
    room.isGameActive = true;
  }
}
export default RoomStater;
