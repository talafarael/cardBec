"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SendMessage_1 = __importDefault(require("./SendMessage"));
describe("JoinMessage", () => {
    it("should send a properly formatted message via WebSocket", () => {
        const mockWebSocket = {
            send: jest.fn(),
        };
        const user = {
            session: "1234",
            hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
            id: 1,
            allowsWriteToPm: true,
            username: "tst",
            firstName: "Test",
        };
        const player = {
            user: user,
            card: [],
            ws: {},
            state: "",
            startGameState: false,
            passState: false,
        };
        const message = {
            session: "",
            action: "",
            players: [],
            roomId: "",
            you: player,
            cardsOnTable: [],
            trump: null,
            pass: [],
            passState: false,
            cardsOnTableCount: 0,
        };
        const sendMessage = new SendMessage_1.default();
        sendMessage.JoinMessage(message, mockWebSocket);
        expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(message));
        expect(mockWebSocket.send).toHaveBeenCalledTimes(1);
    });
});
