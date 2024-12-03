import { INotifyUser } from "src/classMessage";
import { IUserChangeStartGame, IUserFindRoom } from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { IRooms } from "src/Room";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/CheckStateRoom";
import { IData, IRoom, IUserTg } from "src/Type";

class UserReadyAction {
  readonly #rooms;

  readonly #userParser;
  readonly #userFindRoom;
  readonly #userChangeStartGame;
  readonly #notifyUser;
  readonly #checkStateRoom: ICheckStateRoom;
  constructor(
    rooms: IRooms,
    UserParser: IUserParser,
    UserFindRoom: IUserFindRoom,
    UserChangeStartGame: IUserChangeStartGame,
    NotifyUser: INotifyUser,
    CheckStateRoom: ICheckStateRoom
  ) {
    this.#rooms = rooms;
    this.#userParser = UserParser;
    this.#userFindRoom = UserFindRoom;
    this.#userChangeStartGame = UserChangeStartGame;
    this.#notifyUser = NotifyUser;
    this.#checkStateRoom = CheckStateRoom;
    // this.#managerRoom = ManagareRoom;
  }
  UserReady(data: IData) {
    if (!data.roomId) {
      return;
    }

    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser: IUserTg = this.#userParser.userParser(data.userData);
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    if (this.#checkStateRoom.checkStateGame(Room)) {
      return;
    }
    if (indexUser === -1) {
      return;
    }
    const playerResult = this.#userChangeStartGame.changeState(
      Room.players,
      indexUser
    );
    Room.players = playerResult;
    this.#rooms.saveRoom(data.roomId, Room);
    this.#notifyUser.sendNotification(Room, "UserReady");
  }
}
export default UserReadyAction;
