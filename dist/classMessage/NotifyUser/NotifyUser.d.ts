import { IMessageRecipientFilter, IUserPublisher } from "src/classWorkWithUser";
import IResponseFactory from "../ResponseFactory/IResponseFactory";
import ISendMessage from "../SendMessage/ISendMessage";
import INotifyUser from "./INotifyUser";
import { IRoom } from "src/Type";
declare class NotifyUser implements INotifyUser {
    #private;
    constructor(ResponseFactory: IResponseFactory, UserPublisher: IUserPublisher, MessageRecipientFilter: IMessageRecipientFilter, SendMessage: ISendMessage);
    sendNotification(room: IRoom, action: string): void;
}
export default NotifyUser;
