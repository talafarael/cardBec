import { IRoom } from "src/Type";
import { ICheckStateRoom } from "./ICheckStateRoom";
declare class CheckStateRoom implements ICheckStateRoom {
    checkStateGame(room: IRoom): boolean;
    checkUserCount(room: IRoom): boolean;
}
export default CheckStateRoom;
