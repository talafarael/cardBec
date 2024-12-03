"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckCardInUser_1 = __importDefault(require("./CheckCardInUser"));
const cards = [
    { rank: "1", suit: "Ace of Spades" },
    { rank: "2", suit: "King of Hearts" },
    { rank: "3", suit: "Queen of Diamonds" },
    { rank: "4", suit: "Jack of Clubs" },
];
const user = {
    card: cards,
};
describe("CheckCardInUser", () => {
    it("should return 0", () => {
        const checkCardInUser = new CheckCardInUser_1.default();
        expect(checkCardInUser.CheckCardInUser(user, {
            rank: "1",
            suit: "Ace of Spades",
        })).toBe(0);
    });
    it("should return -1", () => {
        const checkCardInUser = new CheckCardInUser_1.default();
        expect(checkCardInUser.CheckCardInUser(user, {
            rank: "9",
            suit: "Ace of Spades",
        })).toBe(-1);
    });
});
