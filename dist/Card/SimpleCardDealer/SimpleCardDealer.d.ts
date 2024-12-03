import { ICard, IRoom } from "src/Type";
import ISimpleCardDealer from "./ISimpleCardDealer";
import IDistributingCardsToUser from "../DistributingCardsToUser/IDistributingCardsToUser";
declare class SimpleCardDealer implements ISimpleCardDealer {
    #private;
    constructor(DistributingCardsToUser: IDistributingCardsToUser);
    startGame(room: IRoom): void;
    setTrumps(card: ICard[]): ICard;
}
export default SimpleCardDealer;
