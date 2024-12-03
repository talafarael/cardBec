import IPlayerPublisher from "../../Type/UserType/IPlayerPublisher/IPlayerPublisher";

interface IMessageRecipientFilter {
  filterMessageToUsersExcept(
    userPublish: IPlayerPublisher[],
    id: number
  ): IPlayerPublisher[];
}
export default IMessageRecipientFilter;
