import { ICard, ICardInGame, IPlayers } from "src/Type";
import ICheckCardInUser from "./IChekCardInUser";

class CheckCardInUser implements ICheckCardInUser {
  CheckCardInUser(user: IPlayers, card: ICard) {
    const index = user.card.findIndex(
      (elem) => elem.rank === card.rank && elem.suit === card.suit
    );
    return index;
  }
  FindCardInAtackTable(cardsOnTable: ICardInGame[], card: ICard) {
    const index = cardsOnTable.findIndex(
      (elem) => elem.attack.rank === card.rank && elem.attack.suit === card.suit
    );
    return index;
  }
  IsDefenseCardEmpty(cardOntable: ICardInGame) {
    if (cardOntable.deffit) {
      return false;
    }
    return true;
  }
}
export default CheckCardInUser;
