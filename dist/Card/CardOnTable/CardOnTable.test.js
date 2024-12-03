"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CardOnTable_1 = __importDefault(require("./CardOnTable"));
describe("cardOnTable", () => {
    it("should be put card on table", () => {
        const cardOnTable = new CardOnTable_1.default();
        const cardsOnTable = [];
        const cards = {
            rank: "1",
            suit: "Ace of Spades",
        };
        cardOnTable.PutCardAttack(cards, cardsOnTable);
        expect(cardsOnTable[0].attack).toEqual(cards);
    });
});
describe("remove", () => {
    it("should return empty table and add card to pass ", () => {
        const cardOnTable = new CardOnTable_1.default();
        const cards = {
            rank: "1",
            suit: "Ace of Spades",
        };
        const cardsOnTable = [
            {
                attack: cards,
                deffit: cards,
            },
        ];
        const passCarrd = [];
        const result = {
            cardOnTable: [],
            pass: [
                {
                    attack: cards,
                    deffit: cards,
                },
            ],
        };
        const removeCard = cardOnTable.removeCard(cardsOnTable, passCarrd);
        expect(removeCard).toEqual(result);
    });
});
describe("pickUpAllCard", () => {
    it("should transfer card from table to user", () => {
        const cardOnTable = new CardOnTable_1.default();
        const cards = {
            rank: "1",
            suit: "Ace of Spades",
        };
        const cardsOnTable = [
            {
                attack: cards,
                deffit: cards,
            },
        ];
        const card = [];
        const result = {
            cardOnTable: [],
            card: [cards, cards],
        };
        expect(cardOnTable.pickUpAllCard(cardsOnTable, card)).toEqual(result);
    });
});
