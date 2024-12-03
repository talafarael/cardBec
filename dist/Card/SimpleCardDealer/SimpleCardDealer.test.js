"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleCardDealer_1 = __importDefault(require("./SimpleCardDealer"));
const testRoom = {
    players: [
        {
            user: {
                session: "session1",
                hash: "hash1",
                allowsWriteToPm: true,
                firstName: "Alice",
                id: 1,
                username: "alice123",
            },
            card: [],
            ws: {},
            state: "",
            startGameState: false,
        },
        {
            user: {
                session: "session1",
                hash: "hash",
                allowsWriteToPm: false,
                firstName: "Bob",
                id: 2,
                username: "bob456",
            },
            card: [],
            ws: {},
            state: "",
            startGameState: true,
        },
    ],
    isGameActive: true,
    roomId: "room123",
    card: [
        { rank: "10", suit: "Hearts" },
        { rank: "9", suit: "Spades" },
        { rank: "8", suit: "Diamonds" },
        { rank: "7", suit: "Clubs" },
        { rank: "Queen", suit: "Diamonds" },
        { rank: "Jack", suit: "Clubs" },
        { rank: "King", suit: "Hearts" },
        { rank: "Ace", suit: "Spades" },
        { rank: "10", suit: "Clubs" },
        { rank: "9", suit: "Diamonds" },
        { rank: "8", suit: "Hearts" },
        { rank: "7", suit: "Spades" },
    ],
    owner: "session1",
    trump: null,
    pass: [],
    cardsOnTable: [],
};
describe("SimpleCardDealer", () => {
    it("must change room", () => {
        const mockDistributingCardsToUser = {
            distributeCards: jest.fn(),
        };
        const simpleCardDealer = new SimpleCardDealer_1.default(mockDistributingCardsToUser);
        simpleCardDealer.startGame(testRoom);
        expect(mockDistributingCardsToUser.distributeCards).toHaveBeenCalledTimes(testRoom.players.length);
        testRoom.players.forEach((player) => {
            expect(mockDistributingCardsToUser.distributeCards).toHaveBeenCalledWith(testRoom.card, player);
        });
    });
    it("must be first elem in array", () => {
        const mockDistributingCardsToUser = {
            distributeCards: jest.fn(),
        };
        const simpleCardDealer = new SimpleCardDealer_1.default(mockDistributingCardsToUser);
        const card = [
            { rank: "10", suit: "Hearts" },
            { rank: "9", suit: "Spades" },
        ];
        expect(simpleCardDealer.setTrumps(card)).toEqual({
            rank: "10",
            suit: "Hearts",
        });
    });
});
