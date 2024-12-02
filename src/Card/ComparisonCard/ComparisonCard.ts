import { ICard } from "../../Room";
import IComparisonCard from "./IComparisonCard";

class ComparisonCard implements IComparisonCard {
  ComparisonCard(cardDif: ICard, cardAttack: ICard, trump: ICard) {
    if (cardDif.suit != cardAttack.suit && cardDif.suit != trump.suit) {
      return false;
    }
    if (cardDif.suit == cardAttack.suit && cardDif.level > cardAttack.level) {
      return true;
    }
    if (cardDif.suit == trump.suit && cardAttack.suit != trump.suit) {
      return true;
    }
    return false;
  }
}

export default ComparisonCard;
