import { IPlayers, IRoom } from "src/Type";
import IUserFindRoom from "./IUserFindRoom";

class UserFindRoom implements IUserFindRoom {
  findPlayerIndexInRoom(Room: IRoom, id: number) {
    const playerIndex = Room.players.findIndex(
      (elem: IPlayers) => elem.user.id == id
    );

    return playerIndex;
  }
}
export default UserFindRoom;
