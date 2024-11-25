import { IMessageRecipientFilter } from "../../classWorkWithUser/MessageRecipientFilter/MessageRecipientFilter";
import { IUserManager } from "../../classWorkWithUser/UserManager/UserManager";
import { IUserPublisher } from "../../classWorkWithUser/UserPublisher/UserPublisher";
import { IPlayers, IRoom } from "../../Room";
import { IResponseFactory } from "../ResponseFactory";
import { ISendMessage } from "../SendMessage/SendMessage";

export interface INotifyUserJoined {
  sendJoinNotification(room: IRoom): void;
}

export class NotifyUserJoined implements INotifyUserJoined {
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
  sendJoinNotification(room: IRoom) {
    const publishAllPlayerInRoom = this.#userPablisher.mapPlayersToPublish(
      room.players
    );
    room.players.map((elem) => {
      const you = elem.user;
      const sendPublishUserData =
        this.#messageRecipientFilter.filterMessageToUsersExcept(
          publishAllPlayerInRoom,
          you.id
        );
      const responseUser = this.#responseFactory.templateMessage(
        you.session,
        "join",
        sendPublishUserData,
        room.roomId,
        you
      );
      this.#sendMessage.JoinMessage(responseUser, elem.ws);
    })
  }
}
