"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComparisonCard_1 = __importDefault(require("./ComparisonCard"));
describe("ComparsionCard", () => {
    it("should be retrun true", () => {
        const comparisonCard = new ComparisonCard_1.default();
        const cardAttack = { rank: "J", suit: "spades", level: 11 };
        const cardDiff = { rank: "10", suit: "spades", level: 12 };
        const trump = { rank: "9", suit: "spades", level: 9 };
        expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(true);
    });
    it("should be retrun true", () => {
        const comparisonCard = new ComparisonCard_1.default();
        const cardAttack = { rank: "J", suit: "hearth", level: 11 };
        const cardDiff = { rank: "10", suit: "spades", level: 10 };
        const trump = { rank: "9", suit: "spades", level: 9 };
        expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(true);
    });
    it("should be retrun true", () => {
        const comparisonCard = new ComparisonCard_1.default();
        const cardAttack = { rank: "J", suit: "diamonds", level: 11 };
        const cardDiff = { rank: "10", suit: "spades", level: 10 };
        const trump = { rank: "9", suit: "spades", level: 9 };
        expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(true);
    });
    it("should be retrun false", () => {
        const comparisonCard = new ComparisonCard_1.default();
        const cardAttack = { rank: "8", suit: "spades", level: 11 };
        const cardDiff = { rank: "10", suit: "diamonds", level: 10 };
        const trump = { rank: "9", suit: "spades", level: 9 };
        expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(false);
    });
    it("should be retrun false", () => {
        const comparisonCard = new ComparisonCard_1.default();
        const cardAttack = { rank: "J", suit: "spades", level: 11 };
        const cardDiff = { rank: "10", suit: "spades", level: 10 };
        const trump = { rank: "9", suit: "spades", level: 9 };
        expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(false);
    });
});
