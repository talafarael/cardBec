import ICheckCardOnTable from "src/Card/CheckCardOnTable/ICheckCardOnTable";
import { INotifyUser } from "src/classMessage";
import { IUserFindRoom, IUserPass } from "src/classWorkWithUser";
import IUserParser from "src/classWorkWithUser/UserParser/IUserParser";
import { ICheckStateRoom } from "src/Room/CheckStateRoom/ICheckStateRoom";
import { IRooms } from "src/Room/Room/Room";
import { IData, IRoom, IUserTg } from "src/Type";

class UserPassAction {
  readonly #rooms;
  readonly #userParser;
  readonly #userFindRoom;
  readonly #notifyUser;
  readonly #checkState: ICheckStateRoom;
  readonly #checkCardOnTable: ICheckCardOnTable;

  readonly #userPass: IUserPass;
  constructor(
    rooms: IRooms,
    UserParser: IUserParser,
    UserFindRoom: IUserFindRoom,
    NotifyUser: INotifyUser,

    CheckStateRoom: ICheckStateRoom,

    CheckCardOnTable: ICheckCardOnTable,

    UserPass: IUserPass
  ) {
    this.#rooms = rooms;
    this.#userParser = UserParser;
    this.#userFindRoom = UserFindRoom;
    this.#notifyUser = NotifyUser;
    this.#checkState = CheckStateRoom;

    this.#checkCardOnTable = CheckCardOnTable;

    this.#userPass = UserPass;
  }

  UserPassAttacAction(data: IData) {
    console.log(5);
    if (!data.roomId) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser: IUserTg = this.#userParser.userParser(data.userData);
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    console.log(2);
    if (!this.#checkState.checkStateGame(Room)) {
      return;
    }
    console.log(1);
    if (this.#checkCardOnTable.checkIfCardIsZero(Room.cardsOnTable)) {
      return;
    }
    if (!this.#checkCardOnTable.checkIfCardMaxMinForAdd(Room.cardsOnTable)) {
      return;
    }
    if (indexUser === -1) {
      return;
    }
    if (!this.#checkCardOnTable.cehckDefCardOntTable(Room.cardsOnTable)) {
      return;
    }
    //user check
    const user = Room.players[indexUser];
    Room.players[indexUser] = this.#userPass.UserPassTrue(user);
    this.#rooms.saveRoom(data.roomId, Room);
    console.log("pass");
    this.#notifyUser.sendNotification(Room, "pass");
  }
}
export default UserPassAction;
