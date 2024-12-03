import { ICard } from "src/Type";
interface IComparisonCard {
    ComparisonCard(cardDif: ICard, cardAttack: ICard, trump: ICard): boolean;
}
export default IComparisonCard;
