import { IRoom } from "src/Type";

export interface IUserFindRoom {
  findPlayerIndexInRoom(Room: IRoom, id: number): number;
}
