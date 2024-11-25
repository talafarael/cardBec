import { WebSocket } from "ws";
import { IResponseMessage } from "../../type/messageSend";

export interface ISendMessage {
  JoinMessage(message: IResponseMessage, ws: WebSocket): void;
}
export class SendMessage implements ISendMessage {
  JoinMessage(message: IResponseMessage, ws: WebSocket) {
    ws.send(JSON.stringify(message));
  }
}
