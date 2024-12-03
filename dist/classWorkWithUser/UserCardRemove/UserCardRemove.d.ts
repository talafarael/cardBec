import { ICard } from "src/Type";
import IUserCardRemove from "./IUserCardRemove";
declare class UserCardRemove implements IUserCardRemove {
    CardRemove(card: ICard[], index: number): ICard[];
}
export default UserCardRemove;
