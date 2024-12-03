import { ICard } from "src/Type";
import IUserCardRemove from "./IUserCardRemove";

class UserCardRemove implements IUserCardRemove {
  CardRemove(card: ICard[], index: number) {
    card.splice(index, 1);
    return card;
  }
}
export default UserCardRemove;
