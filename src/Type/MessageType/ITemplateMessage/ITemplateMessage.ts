import { IPlayerPublisher, IPlayers, ICard, ICardInGame } from "src/Type/";

interface ITemplateMessage {
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
export default ITemplateMessage;
