"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_data_1 = require("../../card.data");
const NotifyUser_1 = __importDefault(require("./NotifyUser"));
afterEach(() => {
    jest.clearAllMocks();
});
const mockWebSocket = {
    send: jest.fn(),
};
const user1 = {
    session: "1234",
    hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
    id: 1,
    allowsWriteToPm: true,
    username: "tst",
    firstName: "Test",
};
const user2 = {
    session: "1234",
    hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
    id: 2,
    allowsWriteToPm: true,
    username: "tst",
    firstName: "Test",
};
const players = [
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
const testRoom = {
    players: players,
    isGameActive: false,
    roomId: "1",
    card: card_data_1.cardData,
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
const userPublishWithOutYou = [
    {
        id: 1,
        cardCount: 0,
        firstName: "Test",
        startGame: false,
    },
];
const res = {
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
        const mockUserPublisher = {
            mapPlayersToPublish: jest.fn().mockReturnValue(userPublish),
        };
        const mockResponseFactory = {
            templateMessage: jest.fn().mockReturnValue(res),
        };
        const mockMessageRecipientFilter = {
            filterMessageToUsersExcept: jest
                .fn()
                .mockReturnValue(userPublishWithOutYou),
        };
        const mockSendMessage = {
            JoinMessage: jest.fn().mockReturnValue(() => {
                return;
            }),
        };
        const notifyUser = new NotifyUser_1.default(mockResponseFactory, mockUserPublisher, mockMessageRecipientFilter, mockSendMessage);
        notifyUser.sendNotification(testRoom, "join");
        expect(mockUserPublisher.mapPlayersToPublish).toHaveBeenCalledWith(testRoom.players);
        expect(mockMessageRecipientFilter.filterMessageToUsersExcept).toHaveBeenCalledWith(userPublish, 1);
        expect(mockResponseFactory.templateMessage).toHaveBeenCalledWith(expect.any(String), "join", userPublishWithOutYou, testRoom.roomId, players[1], null, [], [], false, 0);
        expect(mockSendMessage.JoinMessage).toHaveBeenCalledWith(res, mockWebSocket);
    });
});
