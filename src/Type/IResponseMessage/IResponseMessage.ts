import { ICard, ICardInGame, IPlayers } from "../../Room";
import IPlayerPublisher from "../IPlayerPublisher/IPlayerPublisher";

 type IResponseMessage ={
  session: string;
  action: string;
  players: IPlayerPublisher[];
  roomId: string;
  you: IPlayers;
  cardsOnTable: ICardInGame[];
  trump: ICard | null;
  pass: ICardInGame[];
  passState: boolean;
  cardsOnTableCount: number;
}

export default IResponseMessage;