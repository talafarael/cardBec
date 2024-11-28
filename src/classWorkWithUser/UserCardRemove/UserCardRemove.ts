import { ICard } from "../../Room";

export interface IUserCardRemove {
  CardRemove(card: ICard[], index: number): ICard[];
}
export class UserCardRemove {
  CardRemove(card: ICard[], index: number) {
    card.splice(index, 1);
    return card;
  }
}
