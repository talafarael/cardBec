import { IRoom } from "src/Type";

interface IUserFindRoom {
  findPlayerIndexInRoom(Room: IRoom, id: number): number;
}
export default IUserFindRoom;
