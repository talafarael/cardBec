import { IRoom } from "src/Type";
export interface IRoomStater {
    roomStart(room: IRoom): void;
}
declare class RoomStater implements IRoomStater {
    roomStart(room: IRoom): void;
}
export default RoomStater;
