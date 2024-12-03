"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckStateRoom_1 = __importDefault(require("./CheckStateRoom"));
describe("CheckStateGame", () => {
    it("should be retrun true", () => {
        const checkStateRoom = new CheckStateRoom_1.default();
        const room = {
            isGameActive: true,
        };
        expect(checkStateRoom.checkStateGame(room)).toBe(true);
    });
    it("should be retrun false", () => {
        const checkStateRoom = new CheckStateRoom_1.default();
        const room = {
            isGameActive: false,
        };
        expect(checkStateRoom.checkStateGame(room)).toBe(false);
    });
});
describe("CheckStateGame", () => {
    it("should be retrun true because user more than 1", () => {
        const checkStateRoom = new CheckStateRoom_1.default();
        const player = {};
        const room = {
            isGameActive: true,
            players: [player, player],
        };
        expect(checkStateRoom.checkUserCount(room)).toBe(true);
    });
});
describe("CheckStateGame", () => {
    it("should be retrun false because user 1 ", () => {
        const checkStateRoom = new CheckStateRoom_1.default();
        const player = {};
        const room = {
            isGameActive: true,
            players: [player],
        };
        expect(checkStateRoom.checkUserCount(room)).toBe(false);
    });
});
