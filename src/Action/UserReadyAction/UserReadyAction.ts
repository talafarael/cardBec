import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserChangeStartGame } from "../../classWorkWithUser/UserChangeStartGame/UserChangeStartGame";
import { IUserFindRoom } from "../../classWorkWithUser/UserFindRoom/UserFindRoom";
import { IUserTg } from "../../classWorkWithUser/UserManager/UserManager";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";

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
