import { ITemplateMessage } from "src/Type";
import IResponseMessage from "../../Type/MessageType/IResponseMessage/IResponseMessage";

interface IResponseFactory {
  templateMessage(data: ITemplateMessage): IResponseMessage;
}
export default IResponseFactory;
