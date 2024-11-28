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
import { IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";

export class UserAttackAction {
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
    UserCardRemove: IUserCardRemove
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
    // this.#managerRoom = ManagareRoom;
  }
  UserAttack(data: IData) {
    

    if (!data.roomId || !data.card) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser = this.#userParser.userParser(data.userData) as IUserTg;
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    console.log(1)
    if (!this.#checkState.checkStateGame(Room)) {
      return;
    }
    if (indexUser === -1) {
      return;
    }
    console.log(2)
    const user = Room.players[indexUser];
    if (!this.#userChakeState.ChakeStateAttack(user)) {
      return;
    }
    console.log(3)
    const indexCard = this.#checkCardInUser.CheckCardInUser(user, data.card);
    if (indexCard == -1) {
      return;
    }
    if (!this.#checkCardOnTable.checkIfCardIsZero(Room.cardsOnTable)) {
      return;
    }
    console.log(4)
    Room.cardsOnTable = this.#cardOnTable.PutCardAttack(
      data.card,
      Room.cardsOnTable
    );
    Room.players[indexUser].card = this.#userCardRemove.CardRemove(
      user.card,
      indexCard
    );
    this.#rooms.saveRoom(data.roomId, Room);
    console.log(5)
    this.#notifyUser.sendNotification(Room, "attack");
  }
}
