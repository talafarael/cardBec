"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageRecipientFilter_1 = __importDefault(require("./MessageRecipientFilter"));
const testUsersPublish = [
    {
        id: 1,
        cardCount: 0,
        firstName: "Test",
        startGame: false,
        state: "",
        passState: false,
    },
    {
        id: 2,
        cardCount: 0,
        firstName: "Test",
        startGame: false,
        state: "",
        passState: false,
    },
];
const resultUsersPublish = [
    {
        id: 1,
        cardCount: 0,
        firstName: "Test",
        startGame: false,
        state: "",
        passState: false,
    },
];
describe("filterMessageToUsersExcept", () => {
    it("user with id  2 shoulb be remove with arr", () => {
        const messageRecipientFilter = new MessageRecipientFilter_1.default();
        expect(messageRecipientFilter.filterMessageToUsersExcept(testUsersPublish, 2)).toEqual(resultUsersPublish);
    });
});
