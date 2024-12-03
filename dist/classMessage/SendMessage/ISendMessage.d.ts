import { WebSocket } from "ws";
import { IResponseMessage } from "../../Type";
interface ISendMessage {
    JoinMessage(message: IResponseMessage, ws: WebSocket): void;
}
export default ISendMessage;
