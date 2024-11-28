import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserChangeStartGame } from "../../classWorkWithUser/UserChangeStartGame/UserChangeStartGame";
import { IUserFindRoom } from "../../classWorkWithUser/UserFindRoom/UserFindRoom";
import {
  IUserManager,
  IUserTg,
} from "../../classWorkWithUser/UserManager/UserManager";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserReadinessCheck } from "../../classWorkWithUser/UserReadinessCheck/UserReadinessCheck";
import { IManagerRoom } from "../../ManagerRoom";
import { IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";

export class UserReadyAction {
  #rooms;

  #userParser;
  #userFindRoom;
  #userChangeStartGame;
  #notifyUser;
  #checkState: ICheckStateRoom;
  //   #managerRoom;
  constructor(
    rooms: IRooms,
    UserParser: IUserParser,
    UserFindRoom: IUserFindRoom,
    UserChangeStartGame: IUserChangeStartGame,
    NotifyUser: INotifyUser,
    CheckStateRoom: ICheckStateRoom
    // ManagareRoom: IManagerRoom,
  ) {
    this.#rooms = rooms;
    this.#userParser = UserParser;
    this.#userFindRoom = UserFindRoom;
    this.#userChangeStartGame = UserChangeStartGame;
    this.#notifyUser = NotifyUser;
    this.#checkState = CheckStateRoom;
    // this.#managerRoom = ManagareRoom;
  }
  UserReady(data: IData) {
    if (!data.roomId) {
      return;
    }

    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser = this.#userParser.userParser(data.userData) as IUserTg;
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    if (this.#checkState.checkStateGame(Room)) {
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
