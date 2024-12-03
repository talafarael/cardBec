import { ICard } from "src/Type";
interface IUserCardRemove {
    CardRemove(card: ICard[], index: number): ICard[];
}
export default IUserCardRemove;
