import { IPlayerPublisher } from "../../classMessage/ResponseFactory";

export interface IMessageRecipientFilter {
  filterMessageToUsersExcept(
    userPublish: IPlayerPublisher[],
    id: number
  ): IPlayerPublisher[];
}
export class MessageRecipientFilter implements IMessageRecipientFilter {
  filterMessageToUsersExcept(userPublish: IPlayerPublisher[], id: number) {
    const filterUserPublish = userPublish.filter((elem) => elem.id != id);
    return filterUserPublish;
  }
}
