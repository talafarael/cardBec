import { ICard, ICardInGame } from "src/Type";
import ICheckRankOnTable from "./ICheckRankOnTable";
declare class CheckRankOnTable implements ICheckRankOnTable {
    CheckRankOnTable(table: ICardInGame[], card: ICard): boolean;
}
export default CheckRankOnTable;
