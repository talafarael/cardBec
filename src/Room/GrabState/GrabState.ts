import { IRoom } from "src/Type";
import IGrabState from "./IGrabState";

class GrabState implements IGrabState {
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
export default GrabState;
