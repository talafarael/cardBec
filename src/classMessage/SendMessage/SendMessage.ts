import { WebSocket } from "ws";
import { IResponseMessage } from "../../type/messageSend";

export interface ISendMessage {
  JoinMessage(message: IResponseMessage): void;
}
export class SendMessagea implements ISendMessage {
  #ws;
  constructor(ws: WebSocket) {
    this.#ws = ws;
  }

  JoinMessage(message: IResponseMessage) {
    this.#ws.send(JSON.stringify(message));
  }
}
