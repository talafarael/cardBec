import { ICard, ICardInGame } from "../../Room";

export interface ICheckRankOnTable {
  CheckRankOnTable(table: ICardInGame[], card: ICard): boolean;
}
export class CheckRankOnTable implements ICheckRankOnTable {
  CheckRankOnTable(table: ICardInGame[], card: ICard) {
    let stateFindRank = false;
    table.map((elem) => {
      if (elem.attack.rank == card.rank || elem.deffit?.rank == card.rank) {
        stateFindRank = true;
      }
    });
    return stateFindRank;
  }
}
