import { ICard, ICardInGame } from "src/Type";
import { IResponseRemveCard } from "./CardOnTable";
interface ICardOnTable {
    PutCardAttack(card: ICard, cardsOnTable: ICardInGame[]): ICardInGame[];
    PutCardDeff(card: ICard, cardsOnTable: ICardInGame[], index: number): ICardInGame[];
    removeCard(CardOnTable: ICardInGame[], pass: ICardInGame[]): IResponseRemveCard;
    pickUpAllCard(cardOnTable: ICardInGame[], card: ICard[]): IResponseRemveCard;
}
export default ICardOnTable;
