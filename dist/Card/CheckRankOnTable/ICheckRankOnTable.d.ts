import { ICard, ICardInGame } from "src/Type";
interface ICheckRankOnTable {
    CheckRankOnTable(table: ICardInGame[], card: ICard): boolean;
}
export default ICheckRankOnTable;
