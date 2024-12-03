import { IResponseMessage, ITemplateMessage } from "src/Type";
import IResponseFactory from "./IResponseFactory";
declare class ResponseFactory implements IResponseFactory {
    templateMessage(data: ITemplateMessage): IResponseMessage;
}
export default ResponseFactory;
