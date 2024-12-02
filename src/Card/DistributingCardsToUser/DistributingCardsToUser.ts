
import { ICard, IPlayers } from "../../Room";





 class DistributingCardsToUser {
   distributeCards(card: ICard[], player: IPlayers) {
    while (player.card.length < 6 && card.length > 0) {
      player.card.push(card[card.length - 1]);
      card.pop();
    }
  }
}
export  default DistributingCardsToUser