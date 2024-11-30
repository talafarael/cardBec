import { ICard, ICardInGame, IRoom } from "../../Room";

export interface ICardOnTable {
  PutCardAttack(card: ICard, cardsOnTable: ICardInGame[]): ICardInGame[];
  PutCardDeff(
    card: ICard,
    cardsOnTable: ICardInGame[],
    index: number
  ): ICardInGame[];
  removeCard(
    CardOnTable: ICardInGame[],
    pass: ICardInGame[]
  ): IResponseRemveCard;
}
export class CardOnTable implements ICardOnTable {
  PutCardAttack(card: ICard, cardsOnTable: ICardInGame[]) {
    cardsOnTable.push({
      attack: card,
      deffit: null,
    });

    return cardsOnTable;
  }
  PutCardDeff(card: ICard, cardsOnTable: ICardInGame[], index: number) {
    cardsOnTable[index].deffit = card;
    return cardsOnTable;
  }
  removeCard(CardOnTable: ICardInGame[], pass: ICardInGame[]) {
    CardOnTable.map((elem) => {
      pass.push(elem);
    });
    CardOnTable = [];
    return { CardOnTable, pass };
  }
}
interface IResponseRemveCard {
  CardOnTable: ICardInGame[];
  pass: ICardInGame[];
}
