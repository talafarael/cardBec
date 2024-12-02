import { ICard, IRoom } from "../../Room";

 interface ISimpleCardDealer {
  startGame(room: IRoom): void;
  setTrumps(card: ICard[]): ICard;
}
export default ISimpleCardDealer