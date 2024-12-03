import { ICard, ICardInGame, IPlayers } from "src/Type";
import ICheckCardInUser from "./IChekCardInUser";
declare class CheckCardInUser implements ICheckCardInUser {
    CheckCardInUser(user: IPlayers, card: ICard): number;
    CheckCardInAtackTable(cardsOnTable: ICardInGame[], card: ICard): number;
}
export default CheckCardInUser;
