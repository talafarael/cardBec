
import { ICard, ICardInGame, IPlayers } from "../Room";
import { IPlayerPublisher } from "../Type";


import IResponseMessage from "../Type/IResponseMessage/IResponseMessage";


export interface IResponseFactory {
  templateMessage(data: ITemplateMessage): IResponseMessage;
}
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
export class ResponseFactory implements IResponseFactory {
  templateMessage(data: ITemplateMessage) {
    const res: IResponseMessage = {
      session: data.session,
      action: data.action,
      players: data.players,
      roomId: data.roomId,
      you: data.user,
      trump: data.trump,
      pass: data.pass,
      cardsOnTable: data.cardsOnTable,
      passState: data.passState,
      cardsOnTableCount: data.cardsOnTableCount,
    };
    return res;
  }

  //   ResponseJoin(
  //     session: string,
  //     players: IPublishUser[],
  //     roomId: string,
  //     user: IUser,
  //     id: number
  //   ) {
  //     players.filter((elem) => elem.id != id);
  //   }
}
