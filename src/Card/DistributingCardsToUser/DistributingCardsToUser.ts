
import { ICard, IPlayers } from "../../Room";

export interface IDistributingCardsToUser {
  distributeCards(card: ICard[], player: IPlayers): void;
}

export class DistributingCardsToUser {
   distributeCards(card: ICard[], player: IPlayers) {
    while (player.card.length < 6 && card.length > 0) {
      player.card.push(card[card.length - 1]);
      card.pop();
    }
  }
}
