import { IRoom } from "src/Type";
export interface IRooms {
    saveRoom(roomId: string, room: IRoom): void;
    getRoom(id: string): IRoom | null;
}
declare class Rooms implements IRooms {
    private rooms;
    getRoom(roomId: string): IRoom | null;
    saveRoom(roomId: string, room: IRoom): void;
}
export default Rooms;
