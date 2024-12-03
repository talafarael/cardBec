import { IRoom } from "src/Type";
import IUserFindRoom from "./IUserFindRoom";
declare class UserFindRoom implements IUserFindRoom {
    findPlayerIndexInRoom(Room: IRoom, id: number): number;
}
export default UserFindRoom;
