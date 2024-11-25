import { IPlayerPublisher } from "../classMessage/ResponseFactory";
import { IUser } from "../Room";

export interface IResponseMessage {
  session: string;
  action: string;
  players: IPlayerPublisher[];
  roomId: string;
  you: IUser;
}
