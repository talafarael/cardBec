import { IPlayerPublisher } from "src/Type";
import IMessageRecipientFilter from "./IMessageRecipientFilter";

class MessageRecipientFilter implements IMessageRecipientFilter {
  filterMessageToUsersExcept(userPublish: IPlayerPublisher[], id: number) {
    const filterUserPublish = userPublish.filter((elem) => elem.id != id);
    return filterUserPublish;
  }
}
export default MessageRecipientFilter;
