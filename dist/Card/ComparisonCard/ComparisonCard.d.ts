import { ICard } from "src/Type";
import IComparisonCard from "./IComparisonCard";
declare class ComparisonCard implements IComparisonCard {
    ComparisonCard(cardDif: ICard, cardAttack: ICard, trump: ICard): boolean;
}
export default ComparisonCard;
