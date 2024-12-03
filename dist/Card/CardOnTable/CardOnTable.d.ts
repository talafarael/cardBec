import { ICard, ICardInGame } from "src/Type";
import ICardOnTable from "./ICardOnTable";
declare class CardOnTable implements ICardOnTable {
    PutCardAttack(card: ICard, cardsOnTable: ICardInGame[]): ICardInGame[];
    PutCardDeff(card: ICard, cardsOnTable: ICardInGame[], index: number): ICardInGame[];
    removeCard(CardOnTable: ICardInGame[], pass: ICardInGame[]): {
        cardOnTable: ICardInGame[];
        pass: ICardInGame[];
    };
    pickUpAllCard(cardOnTable: ICardInGame[], card: ICard[]): {
        cardOnTable: ICardInGame[];
        card: ICard[];
    };
}
export interface IResponseRemveCard {
    cardOnTable: ICardInGame[];
    [propName: string]: ICardInGame[] | ICard[];
}
export default CardOnTable;
