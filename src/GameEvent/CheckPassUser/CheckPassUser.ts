import { ICardOnTable } from "../../Card/CardOnTable/CardOnTable";
import { ICheckCardInUser } from "../../Card/CheckCardInUser/CheckCardInUser";
import { ICheckCardOnTable } from "../../Card/CheckCardOnTable/CheckCardOnTable";
import {
  ISimpleCardDealer,
  SimpleCardDealer,
} from "../../Card/SimpleCardDealer/SimpleCardDealer";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserCardRemove } from "../../classWorkWithUser/UserCardRemove/UserCardRemove";
import { IUserChakeState } from "../../classWorkWithUser/UserChakeState/UserChakeState";
import { IUserChangeStartGame } from "../../classWorkWithUser/UserChangeStartGame/UserChangeStartGame";
import { IUserFindRoom } from "../../classWorkWithUser/UserFindRoom/UserFindRoom";
import { IUserTg } from "../../classWorkWithUser/UserManager/UserManager";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserPass } from "../../classWorkWithUser/UserPass/UserPass";
import { IUserPassCheck } from "../../classWorkWithUser/UserPassCheck/UserPassCheck";
import { IRoleAssigner } from "../../Role/RoleAssigner/RoleAssigner";
import { ICard, ICardInGame, IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";

export class CheckPassUser {
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
  #simpleCardDealer: ISimpleCardDealer;
  #userPassCheck: IUserPassCheck;
  #roleAssigner: IRoleAssigner;
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
    UserPassCheck: IUserPassCheck,
    SimpleCardDealer: ISimpleCardDealer,
    // ManagareRoom: IManagerRoom,
    RoleAssigner: IRoleAssigner,
    UserPass: IUserPass
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
    this.#userPassCheck = UserPassCheck;
    this.#simpleCardDealer = SimpleCardDealer;
    this.#roleAssigner = RoleAssigner;
    this.#userPass = UserPass;
    // this.#managerRoom = ManagareRoom;
  }
  CheckPassUser(data: IData) {
    if (!data.roomId) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser = this.#userParser.userParser(data.userData) as IUserTg;
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );

    if (!this.#checkState.checkStateGame(Room)) {
      return;
    }
    
      if (indexUser === -1) {
        return;
      }

    if (!this.#userPassCheck.UserPassCheck(Room.players)) {
      return;
    }
    
    this.#simpleCardDealer.startGame(Room);
    this.#roleAssigner.nextAssignRole(Room);
    
    Room.players = this.#userPass.UpdateAllUserPass(Room.players);
    const { cardOnTable, pass } = this.#cardOnTable.removeCard(
      Room.cardsOnTable,
      Room.pass
    ) as {
      cardOnTable: ICardInGame[];
      pass: ICardInGame[];
    };
    Room.cardsOnTable = cardOnTable;
    Room.pass = pass;
    this.#rooms.saveRoom(data.roomId, Room);
    this.#notifyUser.sendNotification(Room, "pass");
  }
}
