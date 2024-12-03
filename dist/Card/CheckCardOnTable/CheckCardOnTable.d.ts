import { ICardInGame } from "src/Type";
import ICheckCardOnTable from "./ICheckCardOnTable";
declare class CheckCardOnTable implements ICheckCardOnTable {
    checkIfCardIsZero(cardTable: ICardInGame[]): boolean;
    checkIfCardMaxMinForAdd(cardTable: ICardInGame[]): boolean;
    cehckDefCardOntTable(cardTable: ICardInGame[]): boolean;
}
export default CheckCardOnTable;
