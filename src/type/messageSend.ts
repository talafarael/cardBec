import { IPlayerPublisher } from "../classMessage/ResponseFactory";
import { IPlayers } from "../Room";

export interface IResponseMessage {
  session: string;
  action: string;
  players: IPlayerPublisher[];
  roomId: string;
  you: IPlayers;
}
