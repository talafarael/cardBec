import { ICardOnTable } from "../../Card/CardOnTable/CardOnTable";
import { ICheckCardInUser } from "../../Card/CheckCardInUser/CheckCardInUser";
import { ICheckCardOnTable } from "../../Card/CheckCardOnTable/CheckCardOnTable";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserCardRemove } from "../../classWorkWithUser/UserCardRemove/UserCardRemove";
import { IUserChakeState } from "../../classWorkWithUser/UserChakeState/UserChakeState";
import { IUserChangeStartGame } from "../../classWorkWithUser/UserChangeStartGame/UserChangeStartGame";
import { IUserFindRoom } from "../../classWorkWithUser/UserFindRoom/UserFindRoom";
import { IUserTg } from "../../classWorkWithUser/UserManager/UserManager";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserPass } from "../../classWorkWithUser/UserPass/UserPass";
import { IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";

export class UserPassAction {
  #rooms;
  #userParser;
  #userFindRoom;
  #userChangeStartGame;
  #notifyUser;
  #userChakeState;
  #checkState: ICheckStateRoom;
  #checkCardOnTable: ICheckCardOnTable;
  #checkCardInUser: ICheckCardInUser;
  #cardOnTable: ICardOnTable;
  #userCardRemove: IUserCardRemove;
  #userPass: IUserPass;
  constructor(
    rooms: IRooms,
    UserParser: IUserParser,
    UserFindRoom: IUserFindRoom,
    UserChangeStartGame: IUserChangeStartGame,
    NotifyUser: INotifyUser,
    CheckStateRoom: ICheckStateRoom,
    UserChakeState: IUserChakeState,
    CheckCardInUser: ICheckCardInUser,
    CheckCardOnTable: ICheckCardOnTable,
    CardOnTable: ICardOnTable,
    UserCardRemove: IUserCardRemove,
    UserPass: IUserPass
    // ManagareRoom: IManagerRoom,
  ) {
    this.#rooms = rooms;
    this.#userParser = UserParser;
    this.#userFindRoom = UserFindRoom;
    this.#userChangeStartGame = UserChangeStartGame;
    this.#notifyUser = NotifyUser;
    this.#checkState = CheckStateRoom;
    this.#userChakeState = UserChakeState;
    this.#checkCardInUser = CheckCardInUser;
    this.#checkCardOnTable = CheckCardOnTable;
    this.#cardOnTable = CardOnTable;
    this.#userCardRemove = UserCardRemove;
    this.#userPass = UserPass;
    // this.#managerRoom = ManagareRoom;
  }

  UserPassAttacAction(data: IData) {
    console.log(5);
    if (!data.roomId) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser = this.#userParser.userParser(data.userData) as IUserTg;
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
    if(!this.#checkCardOnTable.cehckDefCardOntTable(Room.cardsOnTable)){
      return
    }
    //user check
    const user = Room.players[indexUser];
    Room.players[indexUser] = this.#userPass.UserPassTrue(user);
    this.#rooms.saveRoom(data.roomId, Room);
    console.log("pass");
    this.#notifyUser.sendNotification(Room, "pass");
  }
}
