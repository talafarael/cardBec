import { ICard, ICardInGame, IPlayers } from "../../Room";

export interface ICheckCardInUser {
  CheckCardInUser(user: IPlayers, card: ICard): number;
  CheckCardInAtackTable(cardsOnTable: ICardInGame[], card: ICard): number;
}
export class CheckCardInUser implements ICheckCardInUser {
  CheckCardInUser(user: IPlayers, card: ICard) {
    const index = user.card.findIndex(
      (elem) => elem.rank === card.rank && elem.suit === card.suit
    );
    return index;
  }
  CheckCardInAtackTable(cardsOnTable: ICardInGame[], card: ICard) {
    const index = cardsOnTable.findIndex(
      (elem) => elem.attack.rank === card.rank && elem.attack.suit === card.suit
    );
    return index;
  }
}
