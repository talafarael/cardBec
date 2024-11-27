import { IRoom } from "../../Room";

export interface IRoomStater {
  roomStart(room: IRoom): void;
}
export class RoomStater implements IRoomStater {
  roomStart(room: IRoom) {
    room.isGameActive = true;
  }
}
