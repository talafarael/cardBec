import { ICard, IPlayers, IUser } from "../Room";
import { IResponseMessage } from "../type/messageSend";

export interface IResponseFactory {
  templateMessage(
    session: string,
    action: string,
    players: IPlayerPublisher[],
    roomId: string,
    user: IPlayers,
    trump: ICard | null,
    pass: ICard[]
  ): IResponseMessage;
}
export class ResponseFactory implements IResponseFactory {
  templateMessage(
    session: string,
    action: string,
    players: IPlayerPublisher[],
    roomId: string,
    user: IPlayers,
    trump: ICard | null,
    pass: ICard[]
  ) {
    const res = {
      session: session,
      action: action,
      players: players,
      roomId: roomId,
      you: user,
      trump: trump,
      pass: pass,
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

export interface IPlayerPublisher {
  id: number;
  cardCount: number;
  firstName: string | null;
  startGame: boolean;
  state: string;
  
}
