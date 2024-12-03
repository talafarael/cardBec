"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserManager_1 = __importDefault(require("./UserManager"));
const user = {
    session: "1234",
    hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
    id: 1,
    allowsWriteToPm: true,
    username: "tst",
    firstName: "Test",
};
const mockWebSocket = {
    send: jest.fn(),
};
describe("transformUserForRoom", () => {
    it("should be transform to IUser", () => {
        const parserUser = {
            hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
            user: {
                firstName: "Test",
                id: 1,
                allowsWriteToPm: true,
                username: "tst",
            },
        };
        const session = "1234";
        const userManager = new UserManager_1.default();
        expect(userManager.transformUserForRoom(parserUser, session)).toEqual(user);
    });
});
describe("transformedPlayerPublisher", () => {
    it("should be transform to IPlayer(PublicUser)", () => {
        const player = {
            user: user,
            card: [],
            ws: {},
            state: "",
            startGameState: false,
            passState: false,
        };
        const palyerPublisher = {
            id: 1,
            cardCount: 0,
            firstName: "Test",
            startGame: false,
            state: "",
            passState: false,
        };
        const userManager = new UserManager_1.default();
        expect(userManager.transformedPlayerPublisher(player)).toEqual(palyerPublisher);
    });
    it("transformedPlayer", () => {
        const userManager = new UserManager_1.default();
        const resultPlayerTransform = {
            state: "",
            startGameState: false,
            user: user,
            card: [],
            ws: mockWebSocket,
            passState: false,
        };
        expect(userManager.transformedPlayer(user, mockWebSocket)).toEqual(resultPlayerTransform);
    });
});
