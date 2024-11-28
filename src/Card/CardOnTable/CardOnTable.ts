import { ICard, ICardInGame, IRoom } from "../../Room";

export interface ICardOnTable {
  PutCardAttack(card: ICard, cardsOnTable: ICardInGame[]): ICardInGame[];
}
export class CardOnTable implements ICardOnTable {
  PutCardAttack(card: ICard, cardsOnTable: ICardInGame[]) {
    cardsOnTable.push({
      attack: card,
      deffit: null,
    });

    return cardsOnTable;
  }
  PutCEardDeff() {}
}
