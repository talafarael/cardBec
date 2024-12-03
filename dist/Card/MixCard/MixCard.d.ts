import { ICard } from "src/Type";
import IMixCard from "./IMixCard";
declare class MixCard implements IMixCard {
    Mix(cards: ICard[]): ICard[];
}
export default MixCard;
