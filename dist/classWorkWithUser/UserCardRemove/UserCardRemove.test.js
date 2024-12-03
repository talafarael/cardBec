"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserCardRemove_1 = require("./UserCardRemove");
describe("UserCardRemove ", () => {
    it("must remove", () => {
        const userCardRemove = new UserCardRemove_1.UserCardRemove();
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
