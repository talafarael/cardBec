import { IRoom } from "./Type";
export interface IManagerRoom {
    createRoom(owner: string): IRoom;
}
export declare class ManagerRoom implements IManagerRoom {
    createRoom(owner: string): IRoom;
}
