import { ICard, ICardInGame, IPlayers } from "../../Room";
import IPlayerPublisher from "../IPlayerPublisher/IPlayerPublisher";

export interface ITemplateMessage {
  session: string;
  action: string;
  players: IPlayerPublisher[];
  roomId: string;
  user: IPlayers;
  trump: ICard | null;
  pass: ICardInGame[];
  cardsOnTable: ICardInGame[];
  passState: boolean;
  cardsOnTableCount: number;
}
