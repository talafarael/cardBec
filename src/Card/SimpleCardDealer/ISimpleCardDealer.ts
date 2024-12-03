import { ICard, IRoom } from "src/Type";

interface ISimpleCardDealer {
  startGame(room: IRoom): void;
  setTrumps(card: ICard[]): ICard;
}
export default ISimpleCardDealer;
