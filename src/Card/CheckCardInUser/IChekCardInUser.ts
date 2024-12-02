import { ICard, ICardInGame, IPlayers } from "../../Room";

interface ICheckCardInUser {
  CheckCardInUser(user: IPlayers, card: ICard): number;
  CheckCardInAtackTable(cardsOnTable: ICardInGame[], card: ICard): number;
}
export default ICheckCardInUser;
