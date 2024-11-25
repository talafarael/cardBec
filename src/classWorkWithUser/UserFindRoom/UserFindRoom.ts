import { IPlayers, IRoom, IUser } from "../../Room";

export interface IUserFindRoom {
  findPlayerIndexInRoom(Room: IRoom, id: number): number;
}

export class UserFindRoom implements IUserFindRoom {
  findPlayerIndexInRoom(Room: IRoom, id: number) {
    
    const playerIndex = Room.players.findIndex(
      (elem: IPlayers) => elem.user.id == id
    );

    return playerIndex;
  }
}
