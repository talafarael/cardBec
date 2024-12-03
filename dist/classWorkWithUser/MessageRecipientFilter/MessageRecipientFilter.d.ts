import { IPlayerPublisher } from "src/Type";
import IMessageRecipientFilter from "./IMessageRecipientFilter";
declare class MessageRecipientFilter implements IMessageRecipientFilter {
    filterMessageToUsersExcept(userPublish: IPlayerPublisher[], id: number): IPlayerPublisher[];
}
export default MessageRecipientFilter;
