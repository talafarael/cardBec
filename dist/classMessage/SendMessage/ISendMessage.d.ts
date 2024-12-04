import { IResponseMessage } from "src/Type";
import { WebSocket } from "ws";
interface ISendMessage {
    JoinMessage(message: IResponseMessage, ws: WebSocket): void;
}
export default ISendMessage;
