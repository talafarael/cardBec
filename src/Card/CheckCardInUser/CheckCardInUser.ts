import { ICard, IPlayers } from "../../Room";

export interface ICheckCardInUser {
  CheckCardInUser(user: IPlayers, card: ICard): number;
}
export class CheckCardInUser implements ICheckCardInUser {
  CheckCardInUser(user: IPlayers, card: ICard) {
    const index = user.card.findIndex(
      (elem) => elem.rank === card.rank && elem.suit === card.suit
    );
    return index;
  }
}
