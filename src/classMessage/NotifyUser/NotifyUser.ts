import { IMessageRecipientFilter } from "../../classWorkWithUser/MessageRecipientFilter/MessageRecipientFilter";
import { IUserManager } from "../../classWorkWithUser/UserManager/UserManager";
import { IUserPublisher } from "../../classWorkWithUser/UserPublisher/UserPublisher";
import { IPlayers, IRoom } from "../../Room";
import { IResponseFactory } from "../ResponseFactory";
import { ISendMessage } from "../SendMessage/SendMessage";

export interface INotifyUser {
  sendNotification(room: IRoom, action: string): void;
}

export class NotifyUser implements INotifyUser {
  #responseFactory: IResponseFactory;
  #userPablisher: IUserPublisher;
  #messageRecipientFilter: IMessageRecipientFilter;
  #sendMessage: ISendMessage;
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
    room.players.map((elem) => {
      const sendPublishUserData =
        this.#messageRecipientFilter.filterMessageToUsersExcept(
          publishAllPlayerInRoom,
          elem.user.id
        );
      const responseUser = this.#responseFactory.templateMessage(
        elem.user.session,
        action,
        sendPublishUserData,
        room.roomId,
        elem,
        room.trump,
        room.pass
      );
      this.#sendMessage.JoinMessage(responseUser, elem.ws);
    });
  }
}
