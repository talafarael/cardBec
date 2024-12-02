import { ICard } from "../../Room";

interface IUserCardRemove {
  CardRemove(card: ICard[], index: number): ICard[];
}
export default IUserCardRemove;
