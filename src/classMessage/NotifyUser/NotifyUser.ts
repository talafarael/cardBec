import { IMessageRecipientFilter } from "../../classWorkWithUser/MessageRecipientFilter/MessageRecipientFilter";
import { IUserPublisher } from "../../classWorkWithUser/UserPublisher/UserPublisher";
import { IRoom } from "../../Room";
import { IResponseFactory } from "../ResponseFactory";
import ISendMessage from "../SendMessage/ISendMessage";

import INotifyUser from "./INotifyUser";

class NotifyUser implements INotifyUser {
  readonly #responseFactory: IResponseFactory;
  readonly #userPablisher: IUserPublisher;
  readonly #messageRecipientFilter: IMessageRecipientFilter;
  readonly #sendMessage: ISendMessage;
  constructor(
    ResponseFactory: IResponseFactory,
    UserPublisher: IUserPublisher,
    MessageRecipientFilter: IMessageRecipientFilter,
    SendMessage: ISendMessage
  ) {
    this.#responseFactory = ResponseFactory;
    this.#userPablisher = UserPublisher;
    this.#messageRecipientFilter = MessageRecipientFilter;
    this.#sendMessage = SendMessage;
  }
  sendNotification(room: IRoom, action: string) {
    const publishAllPlayerInRoom = this.#userPablisher.mapPlayersToPublish(
      room.players
    );
    room.players.forEach((elem) => {
      const sendPublishUserData =
        this.#messageRecipientFilter.filterMessageToUsersExcept(
          publishAllPlayerInRoom,
          elem.user.id
        );
      const responseUser = this.#responseFactory.templateMessage({
        session: elem.user.session,
        action: action,
        players: sendPublishUserData,
        roomId: room.roomId,
        user: elem,
        trump: room.trump,
        pass: room.pass,
        cardsOnTable: room.cardsOnTable,
        passState: elem.passState,
        cardsOnTableCount: room.cardsOnTable.length,
      });
      this.#sendMessage.JoinMessage(responseUser, elem.ws);
    });
  }
}
export default NotifyUser;
