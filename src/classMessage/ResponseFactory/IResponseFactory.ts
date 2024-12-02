import IResponseMessage from "../../Type/IResponseMessage/IResponseMessage";
import { ITemplateMessage } from "../../Type/ITemplateMessage/ITemplateMessage";

interface IResponseFactory {
  templateMessage(data: ITemplateMessage): IResponseMessage;
}
export default IResponseFactory;
