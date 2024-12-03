import { ICard, IPlayers } from "src/Type";

interface IDistributingCardsToUser {
  distributeCards(card: ICard[], player: IPlayers): void;
}
export default IDistributingCardsToUser;
