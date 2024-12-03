import IPlayerPublisher from "../../Type/UserType/IPlayerPublisher/IPlayerPublisher";

export interface IMessageRecipientFilter {
  filterMessageToUsersExcept(
    userPublish: IPlayerPublisher[],
    id: number
  ): IPlayerPublisher[];
}
