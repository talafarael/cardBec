import { IRoom } from "../../Room";

export interface IGrabState {
  checkGrabState(room: IRoom): boolean;
  changeGrabStateFalse(room: IRoom): IRoom;
  changeGrabStateTrue(room: IRoom): IRoom;
}

export class GrabState implements IGrabState {
  checkGrabState(room: IRoom) {
    return room.GrabState;
  }
  changeGrabStateFalse(room: IRoom) {
    room.GrabState = false;
    return room;
  }
  changeGrabStateTrue(room: IRoom) {
    room.GrabState = true;
    return room;
  }
}
