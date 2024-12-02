import IPlayerPublisher from "../../Type/IPlayerPublisher/IPlayerPublisher";

export interface IMessageRecipientFilter {
  filterMessageToUsersExcept(
    userPublish: IPlayerPublisher[],
    id: number
  ): IPlayerPublisher[];
}
