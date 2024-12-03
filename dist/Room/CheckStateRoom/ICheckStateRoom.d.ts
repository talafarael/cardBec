import { IRoom } from "src/Type";
export interface ICheckStateRoom {
    checkStateGame(room: IRoom): boolean;
    checkUserCount(room: IRoom): boolean;
}
