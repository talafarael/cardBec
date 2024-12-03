"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckRankOnTable_1 = __importDefault(require("./CheckRankOnTable"));
const table = [
    {
        attack: { rank: "6", suit: "hearts", level: 6 },
        deffit: { rank: "6", suit: "diamonds", level: 6 },
    },
    {
        attack: { rank: "7", suit: "hearts", level: 6 },
        deffit: { rank: "K", suit: "diamonds", level: 6 },
    },
];
describe("findPlayerIndexInRoom", () => {
    it("to be true", () => {
        const card = { rank: "K", suit: "diamonds", level: 6 };
        const checkRankOnTable = new CheckRankOnTable_1.default();
        expect(checkRankOnTable.CheckRankOnTable(table, card)).toBe(true);
    });
    it("to be false", () => {
        const card = { rank: "Q", suit: "diamonds", level: 6 };
        const checkRankOnTable = new CheckRankOnTable_1.default();
        expect(checkRankOnTable.CheckRankOnTable(table, card)).toBe(false);
    });
});
