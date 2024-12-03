import { ICard } from "src/Type";

 interface IMixCard {
  Mix(cards: ICard[]): ICard[];
}
export default IMixCard;