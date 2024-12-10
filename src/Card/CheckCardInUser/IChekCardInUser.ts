import { ICard, ICardInGame, IPlayers } from "src/Type";

interface ICheckCardInUser {
  CheckCardInUser(user: IPlayers, card: ICard): number;
  FindCardInAtackTable(cardsOnTable: ICardInGame[], card: ICard): number;
  IsDefenseCardEmpty(cardOntable: ICardInGame): boolean;
}
export default ICheckCardInUser;
