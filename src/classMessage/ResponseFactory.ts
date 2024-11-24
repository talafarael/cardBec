import { IUser } from "../Room";

export interface IResponseFactory {
  templateMessage(
    session: string,
    action: string,
    players: IPublishUser[],
    roomId: string,
    user: IUser
  ): responseMessage;
}
export class ResponseFactory implements IResponseFactory {
  templateMessage(
    session: string,
    action: string,
    players: IPublishUser[],
    roomId: string,
    user: IUser
  ) {
    const res = {
      session: session,
      action: action,
      players: players,
      roomId: roomId,
      you: user,
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
export interface responseMessage {
  session: string;
  action: string;
  players: IPublishUser[];
  roomId: string;
  you: IUser;
}
export interface IPublishUser {
  cardCount: number;
  firstName: string | null;
  id: number;
}
