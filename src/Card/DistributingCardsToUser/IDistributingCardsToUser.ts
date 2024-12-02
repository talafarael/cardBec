import { ICard, IPlayers } from "../../Room";

interface IDistributingCardsToUser {
  distributeCards(card: ICard[], player: IPlayers): void;
}
export default IDistributingCardsToUser;
