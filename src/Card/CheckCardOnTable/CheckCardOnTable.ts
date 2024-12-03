import { ICardInGame } from "src/Type";
import ICheckCardOnTable from "./ICheckCardOnTable";

class CheckCardOnTable implements ICheckCardOnTable {
  checkIfCardIsZero(cardTable: ICardInGame[]) {
    if (cardTable.length == 0) {
      return true;
    }
    return false;
  }
  checkIfCardMaxMinForAdd(cardTable: ICardInGame[]) {
    if (cardTable.length > 6 || cardTable.length < 1) {
      return false;
    }
    return true;
  }
  cehckDefCardOntTable(cardTable: ICardInGame[]) {
    let state = true;
    cardTable.forEach((elem) => {
      if (!elem.deffit) {
        state = false;
      }
    });
    return state;
  }
}
export default CheckCardOnTable;
