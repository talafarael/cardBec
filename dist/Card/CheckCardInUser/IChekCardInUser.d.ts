import { ICard, ICardInGame, IPlayers } from "src/Type";
interface ICheckCardInUser {
    CheckCardInUser(user: IPlayers, card: ICard): number;
    CheckCardInAtackTable(cardsOnTable: ICardInGame[], card: ICard): number;
}
export default ICheckCardInUser;
