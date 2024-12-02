import { ICard } from "../../Room";

 interface IMixCard {
  Mix(cards: ICard[]): ICard[];
}
export default IMixCard;