"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckCardOnTable_1 = __importDefault(require("./CheckCardOnTable"));
describe("zero", () => {
    it("should be return ture (0 card)", () => {
        const checkCardOnTable = new CheckCardOnTable_1.default();
        const cardsOnTable = [];
        expect(checkCardOnTable.checkIfCardIsZero(cardsOnTable)).toBe(true);
    });
    it("should be return false (1 card)", () => {
        const checkCardOnTable = new CheckCardOnTable_1.default();
        const cards = {
            rank: "1",
            suit: "Ace of Spades",
        };
        const cardsOnTable = [cards];
        expect(checkCardOnTable.checkIfCardIsZero(cardsOnTable)).toBe(false);
    });
});
describe("CheckCardOnTable", () => {
    it("should be return ture (1 card)", () => {
        const checkCardOnTable = new CheckCardOnTable_1.default();
        const cards = {
            rank: "1",
            suit: "Ace of Spades",
        };
        const cardsOnTable = [cards];
        expect(checkCardOnTable.checkIfCardMaxMinForAdd(cardsOnTable)).toBe(true);
    });
    it("should be return ture (6 card)", () => {
        const checkCardOnTable = new CheckCardOnTable_1.default();
        const cards = {
            rank: "1",
            suit: "Ace of Spades",
        };
        const cardsOnTable = [
            cards,
            cards,
            cards,
            cards,
            cards,
            cards,
        ];
        expect(checkCardOnTable.checkIfCardMaxMinForAdd(cardsOnTable)).toBe(true);
    });
    it("should be return false (7 card)", () => {
        const checkCardOnTable = new CheckCardOnTable_1.default();
        const cards = {
            rank: "1",
            suit: "Ace of Spades",
        };
        const cardsOnTable = [
            cards,
            cards,
            cards,
            cards,
            cards,
            cards,
            cards,
        ];
        expect(checkCardOnTable.checkIfCardMaxMinForAdd(cardsOnTable)).toBe(false);
    });
    it("should be return false (0 card)", () => {
        const checkCardOnTable = new CheckCardOnTable_1.default();
        const cardsOnTable = [];
        expect(checkCardOnTable.checkIfCardMaxMinForAdd(cardsOnTable)).toBe(false);
    });
});
describe("checkDefCartonTable", () => {
    it("should retun true", () => {
        const checkCardOnTable = new CheckCardOnTable_1.default();
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
        expect(checkCardOnTable.cehckDefCardOntTable(cardsOnTable)).toBe(true);
    });
    it("should retun false", () => {
        const checkCardOnTable = new CheckCardOnTable_1.default();
        const cards = {
            rank: "1",
            suit: "Ace of Spades",
        };
        const cardsOnTable = [
            {
                attack: cards,
            },
        ];
        expect(checkCardOnTable.cehckDefCardOntTable(cardsOnTable)).toBe(false);
    });
});
