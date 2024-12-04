import { WebSocket } from "ws";
import ISendMessage from "./ISendMessage";
import { IResponseMessage } from "src/Type";
declare class SendMessage implements ISendMessage {
    JoinMessage(message: IResponseMessage, ws: WebSocket): void;
}
export default SendMessage;
