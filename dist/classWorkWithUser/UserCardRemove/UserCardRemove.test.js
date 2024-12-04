"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserCardRemove_1 = __importDefault(require("./UserCardRemove"));
describe("UserCardRemove ", () => {
    it("must remove", () => {
        const userCardRemove = new UserCardRemove_1.default();
        const cards = {
            rank: "2",
            suit: "Ace of Spades",
        };
        const card = [
            { rank: "1", suit: "Ace of Spades" },
            cards,
        ];
        const cardResult = [cards];
        expect(userCardRemove.CardRemove(card, 0)).toEqual(cardResult);
    });
});
