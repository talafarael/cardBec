import { ICardOnTable } from "../../Card/CardOnTable/CardOnTable";
import { ICheckCardInUser } from "../../Card/CheckCardInUser/CheckCardInUser";
import { IComparisonCard } from "../../Card/ComparisonCard/ComparisonCard";
import { INotifyUser } from "../../classMessage/NotifyUser/NotifyUser";
import { IUserCardRemove } from "../../classWorkWithUser/UserCardRemove/UserCardRemove";
import { IUserChakeState } from "../../classWorkWithUser/UserChakeState/UserChakeState";
import { IUserFindRoom } from "../../classWorkWithUser/UserFindRoom/UserFindRoom";
import { IUserTg } from "../../classWorkWithUser/UserManager/UserManager";
import { IUserParser } from "../../classWorkWithUser/UserParser/UserParser";
import { IUserPass } from "../../classWorkWithUser/UserPass/UserPass";
import { ICard, IData, IRoom, IRooms } from "../../Room";
import { ICheckStateRoom } from "../../Room/CheckStateRoom/CheckStateRoom";

export interface IDefData extends IData {
  attacCard: ICard;
}
export interface IUserDeffitActionConfig {
  rooms: IRooms;
  userParser: IUserParser;
  userFindRoom: IUserFindRoom;
  notifyUser: INotifyUser;
  checkStateRoom: ICheckStateRoom;
  userChakeState: IUserChakeState;
  checkCardInUser: ICheckCardInUser;
  cardOnTable: ICardOnTable;
  userCardRemove: IUserCardRemove;
  comparisonCard: IComparisonCard;
  userPass: IUserPass;
}

export class UserDeffitAction {
  readonly #rooms;
  readonly #userParser;
  readonly #userFindRoom;
  readonly #notifyUser;
  readonly #userChakeState;
  readonly #checkState: ICheckStateRoom;
  readonly #checkCardInUser: ICheckCardInUser;
  readonly #cardOnTable: ICardOnTable;
  readonly #userCardRemove: IUserCardRemove;
  readonly #comparisonCard: IComparisonCard;
  readonly #userPass: IUserPass;
  constructor(config: IUserDeffitActionConfig) {
    this.#rooms = config.rooms;
    this.#userParser = config.userParser;
    this.#userFindRoom = config.userFindRoom;
    this.#notifyUser = config.notifyUser;
    this.#checkState = config.checkStateRoom;
    this.#userChakeState = config.userChakeState;
    this.#checkCardInUser = config.checkCardInUser;
    this.#cardOnTable = config.cardOnTable;
    this.#userCardRemove = config.userCardRemove;
    this.#comparisonCard = config.comparisonCard;
    this.#userPass = config.userPass;
  }
  UserDeffitAction(data: IDefData) {
    if (!data.roomId || !data.card) {
      return;
    }
    let Room = this.#rooms.getRoom(data.roomId) as IRoom;
    const parserUser: IUserTg = this.#userParser.userParser(data.userData);
    const indexUser = this.#userFindRoom.findPlayerIndexInRoom(
      Room,
      parserUser.user.id
    );
    //state room in game
    console.log(1);
    if (!this.#checkState.checkStateGame(Room)) {
      return;
    }
    if (indexUser === -1) {
      return;
    }

    const user = Room.players[indexUser];
    if (!this.#userChakeState.ChakeStateDefending(user)) {
      return;
    }
    const indexCard = this.#checkCardInUser.CheckCardInUser(user, data.card);
    if (indexCard == -1) {
      return;
    }
    const indexTable = this.#checkCardInUser.CheckCardInAtackTable(
      Room.cardsOnTable,
      data.attacCard
    );
    console.log(2);
    if (indexTable == -1) {
      return;
    }
    console.log(4);
    if (
      !this.#comparisonCard.ComparisonCard(
        data.card,
        data.attacCard,
        Room.trump as ICard
      )
    ) {
      return;
    }
    console.log(3);
    Room.cardsOnTable = this.#cardOnTable.PutCardDeff(
      data.card,
      Room.cardsOnTable,
      indexTable
    );
    Room.players[indexUser].card = this.#userCardRemove.CardRemove(
      user.card,
      indexCard
    );
    Room.players = this.#userPass.UpdateAllUserPass(Room.players);
    this.#rooms.saveRoom(data.roomId, Room);
    console.log(5);
    this.#notifyUser.sendNotification(Room, "def");
  }
}
