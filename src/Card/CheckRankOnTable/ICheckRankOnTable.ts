import { ICard, ICardInGame } from "../../Room";

interface ICheckRankOnTable {
  CheckRankOnTable(table: ICardInGame[], card: ICard): boolean;
}
export default ICheckRankOnTable;
