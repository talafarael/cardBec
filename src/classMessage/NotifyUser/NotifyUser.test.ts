import { WebSocket } from "ws";
import { cardData } from "../../card.data";
import { IUserPublisher } from "../../classWorkWithUser/UserPublisher/UserPublisher";
import { IPlayers, IRoom, IUser } from "../../Room";
import { IPlayerPublisher, IResponseFactory } from "../ResponseFactory/ResponseFactory";
import { IMessageRecipientFilter } from "../../classWorkWithUser/MessageRecipientFilter/MessageRecipientFilter";
import { IResponseMessage } from "../../Type/messageSend";
import NotifyUser from "./NotifyUser";
import { ISendMessage } from "../index";

afterEach(() => {
  jest.clearAllMocks();
});
const mockWebSocket = {
  send: jest.fn(),
} as unknown as jest.Mocked<WebSocket>;
const user1: IUser = {
  session: "1234",
  hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
  id: 1,
  allowsWriteToPm: true,
  username: "tst",
  firstName: "Test",
};
const user2: IUser = {
  session: "1234",
  hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
  id: 2,
  allowsWriteToPm: true,
  username: "tst",
  firstName: "Test",
};
const players: IPlayers[] = [
  {
    user: user1,
    card: [],
    ws: mockWebSocket,
    state: "",
    startGameState: false,
    passState: false,
  },
  {
    user: user2,
    card: [],
    ws: mockWebSocket,
    state: "",
    startGameState: false,
    passState: false,
  },
];

const testRoom: IRoom = {
  players: players,
  isGameActive: false,
  roomId: "1",
  card: cardData,
  owner: "1",
  trump: null,
  pass: [],
  cardsOnTable: [],
  GrabState: false,
};

const userPublish = [
  {
    id: 1,
    cardCount: 0,
    firstName: "Test",
    startGame: false,
  },
  {
    id: 2,
    cardCount: 0,
    firstName: "Test",
    startGame: false,
  },
];
const userPublishWithOutYou: IPlayerPublisher[] = [
  {
    id: 1,
    cardCount: 0,
    firstName: "Test",
    startGame: false,
  },
] as unknown as IPlayerPublisher[];
const res: IResponseMessage = {
  session: "1234",
  action: "join",
  players: userPublishWithOutYou,
  roomId: "1",
  you: players[1],
  trump: null,
  pass: [],

  cardsOnTable: [],
  passState: false,
  cardsOnTableCount: 0,
};
describe("NotifyUserJoined", () => {
  it("class must be called", () => {
    const mockUserPublisher: IUserPublisher = {
      mapPlayersToPublish: jest.fn().mockReturnValue(userPublish),
    };

    const mockResponseFactory: IResponseFactory = {
      templateMessage: jest.fn().mockReturnValue(res),
    };

    const mockMessageRecipientFilter: IMessageRecipientFilter = {
      filterMessageToUsersExcept: jest
        .fn()
        .mockReturnValue(userPublishWithOutYou),
    };

    const mockSendMessage: ISendMessage = {
      JoinMessage: jest.fn().mockReturnValue(() => {
        return;
      }),
    };
    const notifyUser = new NotifyUser(
      mockResponseFactory,
      mockUserPublisher,
      mockMessageRecipientFilter,
      mockSendMessage
    );

    notifyUser.sendNotification(testRoom, "join");

    expect(mockUserPublisher.mapPlayersToPublish).toHaveBeenCalledWith(
      testRoom.players
    );
    expect(
      mockMessageRecipientFilter.filterMessageToUsersExcept
    ).toHaveBeenCalledWith(userPublish, 1);
    expect(mockResponseFactory.templateMessage).toHaveBeenCalledWith(
      expect.any(String),
      "join",
      userPublishWithOutYou,
      testRoom.roomId,
      players[1],
      null,
      [],
      [],
      false,
      0
    );
    expect(mockSendMessage.JoinMessage).toHaveBeenCalledWith(
      res,
      mockWebSocket
    );
  });
});
