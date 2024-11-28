import { ICardInGame } from "../../Room";

export interface ICheckCardOnTable {
  checkIfCardIsZero(cardTable: ICardInGame[]): boolean;
  checkIfCardMaxMinForAdd(cardTable: ICardInGame[]): boolean;
}
export class CheckCardOnTable {
  checkIfCardIsZero(cardTable: ICardInGame[]) {
    if (cardTable.length == 0) {
      return true;
    }
    return false;
  }
  checkIfCardMaxMinForAdd(cardTable: ICardInGame[]) {
    if ( cardTable.length >6||cardTable.length < 1 ) {
      return false;
    }
    return true;
  }
}
