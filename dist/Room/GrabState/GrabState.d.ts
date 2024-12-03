import { IRoom } from "src/Type";
import IGrabState from "./IGrabState";
declare class GrabState implements IGrabState {
    checkGrabState(room: IRoom): boolean;
    changeGrabStateFalse(room: IRoom): IRoom;
    changeGrabStateTrue(room: IRoom): IRoom;
}
export default GrabState;
