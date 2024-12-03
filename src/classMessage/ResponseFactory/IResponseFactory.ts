import IResponseMessage from "../../Type/MessageType/IResponseMessage/IResponseMessage";
import { ITemplateMessage } from "../../Type/MessageType/ITemplateMessage/ITemplateMessage";

interface IResponseFactory {
  templateMessage(data: ITemplateMessage): IResponseMessage;
}
export default IResponseFactory;
