import { ICardInGame } from "../../Room";

export interface ICheckCardOnTable {
  checkIfCardIsZero(cardTable: ICardInGame[]): boolean;
}
export class CheckCardOnTable {
  checkIfCardIsZero(cardTable: ICardInGame[]) {
    if (cardTable.length == 0) {
      return true;
    }
    return false;
  }
  checkIfCardIsSix() {}
}
