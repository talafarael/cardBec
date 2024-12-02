import { ICardInGame } from "../../Room";

interface ICheckCardOnTable {
  checkIfCardIsZero(cardTable: ICardInGame[]): boolean;
  checkIfCardMaxMinForAdd(cardTable: ICardInGame[]): boolean;
  cehckDefCardOntTable(cardTable: ICardInGame[]): boolean;
}
export default ICheckCardOnTable;
