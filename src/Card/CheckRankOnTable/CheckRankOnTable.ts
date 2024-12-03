import { ICard, ICardInGame } from "src/Type";
import ICheckRankOnTable from "./ICheckRankOnTable";

class CheckRankOnTable implements ICheckRankOnTable {
  CheckRankOnTable(table: ICardInGame[], card: ICard) {
    let stateFindRank = false;
    table.forEach((elem) => {
      if (elem.attack.rank == card.rank || elem.deffit?.rank == card.rank) {
        stateFindRank = true;
      }
    });
    return stateFindRank;
  }
}
export default CheckRankOnTable;
