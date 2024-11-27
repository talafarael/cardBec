import { IPlayerPublisher } from "../classMessage/ResponseFactory";
import { ICard, IPlayers } from "../Room";

export interface IResponseMessage {
  session: string;
  action: string;
  players: IPlayerPublisher[];
  roomId: string;
  you: IPlayers;
  cardsOnTable: ICard[][];
  trump: ICard | null;
  pass: ICard[];
  passState: boolean;
}
