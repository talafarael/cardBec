"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MixCard_1 = __importDefault(require("./MixCard"));
const cards = [
    { rank: "1", suit: "Ace of Spades" },
    { rank: "2", suit: "King of Hearts" },
    { rank: "3", suit: "Queen of Diamonds" },
    { rank: "4", suit: "Jack of Clubs" },
];
const mixCards = new MixCard_1.default();
describe("MixCards", () => {
    it("should shuffle the cards array", () => {
        const shuffledCards = mixCards.Mix(cards);
        expect(shuffledCards).not.toEqual(cards);
        expect(shuffledCards.length).toBe(cards.length);
        expect(shuffledCards).toEqual(expect.arrayContaining(cards));
    });
});
