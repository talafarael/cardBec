import { IRoom } from "src/Type";
interface IGrabState {
    checkGrabState(room: IRoom): boolean;
    changeGrabStateFalse(room: IRoom): IRoom;
    changeGrabStateTrue(room: IRoom): IRoom;
}
export default IGrabState;
