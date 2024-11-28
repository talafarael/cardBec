import { IPlayerPublisher } from "../classMessage/ResponseFactory";
import { ICard, ICardInGame, IPlayers } from "../Room";

export interface IResponseMessage {
  session: string;
  action: string;
  players: IPlayerPublisher[];
  roomId: string;
  you: IPlayers;
  cardsOnTable: ICardInGame[];
  trump: ICard | null;
  pass: ICard[];
  passState: boolean;
}
