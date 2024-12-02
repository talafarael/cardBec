import { ICheckCardOnTable } from "../../Card/CheckCardOnTable/CheckCardOnTable";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserFindRoom } from "../../classWorkWithUser/UserFindRoom/UserFindRoom";
import { IUserTg } from "../../classWorkWithUser/UserManager/UserManager";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserPass } from "../../classWorkWithUser/UserPass/UserPass";
import { IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";

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
