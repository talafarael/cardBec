import { ICard, IRoom } from "src/Type";
import ISimpleCardDealer from "./ISimpleCardDealer";
import IDistributingCardsToUser from "../DistributingCardsToUser/IDistributingCardsToUser";

class SimpleCardDealer implements ISimpleCardDealer {
  readonly #distributingCardsToUser: IDistributingCardsToUser;
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
export default SimpleCardDealer;
