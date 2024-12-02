import { WebSocket } from "ws";

import ISendMessage from "./ISendMessage";
import IResponseMessage from "../../Type/IResponseMessage/IResponseMessage";

class SendMessage implements ISendMessage {
  JoinMessage(message: IResponseMessage, ws: WebSocket) {
    ws.send(JSON.stringify(message));
  }
}
export default SendMessage;
