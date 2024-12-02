import { ICard } from "../../Room";

interface IComparisonCard {
  ComparisonCard(cardDif: ICard, cardAttack: ICard, trump: ICard): boolean;
}
export default IComparisonCard;
