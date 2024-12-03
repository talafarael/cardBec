import { ICard, ICardInGame } from "src/Type";
import ICardOnTable from "./ICardOnTable";


class CardOnTable implements ICardOnTable{
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
    CardOnTable.forEach((elem) => {
      pass.push(elem);
    });
    CardOnTable = [];
    return { cardOnTable: CardOnTable, pass };
  }
  pickUpAllCard(cardOnTable: ICardInGame[], card: ICard[]) {
    cardOnTable.forEach((elem) => {
      card.push(elem.attack);
      if (!elem.deffit) return;
      card.push(elem.deffit);
    });
    cardOnTable = [];
    return { cardOnTable, card };
  }
}
export interface IResponseRemveCard {
  cardOnTable: ICardInGame[];
  [propName: string]: ICardInGame[] | ICard[];
}
export default CardOnTable;
