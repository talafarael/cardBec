import { ICard } from "../../Room";
import IMixCard from "./IMixCard";

class MixCard implements IMixCard {
  Mix(cards: ICard[]) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }
    return shuffled;
  }
}
export default MixCard;
