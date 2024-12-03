import { IUser, ICard } from "src/Type";
import { WebSocket } from "ws";
interface IPlayers {
    user: IUser;
    card: ICard[];
    ws: WebSocket;
    state: string;
    startGameState: boolean;
    passState: boolean;
}
export default IPlayers;
