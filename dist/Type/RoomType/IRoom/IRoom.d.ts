import { IPlayers, ICard, ICardInGame } from "src/Type";
interface IRoom {
    players: IPlayers[];
    isGameActive: boolean;
    roomId: string;
    card: ICard[];
    owner: string;
    trump: ICard | null;
    pass: ICardInGame[];
    GrabState: boolean;
    cardsOnTable: ICardInGame[];
}
export default IRoom;
