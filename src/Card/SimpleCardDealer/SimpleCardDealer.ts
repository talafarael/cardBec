
import { ICard, IRoom } from "../../Room";
import { IDistributingCardsToUser } from "../DistributingCardsToUser/DistributingCardsToUser";

export interface ISimpleCardDealer {
  startGame(room: IRoom): void;
  setTrumps(card: ICard[]):ICard;
}
export class SimpleCardDealer {
  #distributingCardsToUser: IDistributingCardsToUser;
  constructor(DistributingCardsToUser: IDistributingCardsToUser) {
    this.#distributingCardsToUser = DistributingCardsToUser;
  }
  startGame(room: IRoom) {
    room.players.forEach((elem) => {
      this.#distributingCardsToUser.distributeCards(room.card, elem);
    });
  }
  setTrumps(card: ICard[]) {
    return card[0];
  }
}
