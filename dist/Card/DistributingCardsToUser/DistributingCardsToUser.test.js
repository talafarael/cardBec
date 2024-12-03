"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DistributingCardsToUser_1 = __importDefault(require("./DistributingCardsToUser"));
const user = {
    session: "1234",
    hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
    id: 1,
    allowsWriteToPm: true,
    username: "tst",
    firstName: "Test",
};
const cards = [
    { rank: "6", suit: "hearts" },
    { rank: "7", suit: "hearts" },
    { rank: "8", suit: "hearts" },
];
describe("DistributingCardsToUser", () => {
    it("must fill user card", () => {
        const player = {
            user: user,
            card: [],
            ws: {},
            state: "",
            startGameState: true,
            passState: false,
        };
        const distributingCardsToUser = new DistributingCardsToUser_1.default();
        distributingCardsToUser.distributeCards(cards, player);
        expect(cards).toEqual([]);
        expect(player.card).toEqual([
            { rank: "8", suit: "hearts" },
            { rank: "7", suit: "hearts" },
            { rank: "6", suit: "hearts" },
        ]);
    });
});
