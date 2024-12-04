"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserReadinessCheck_1 = __importDefault(require("./UserReadinessCheck"));
const user = {
    session: "1234",
    hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
    id: 1,
    allowsWriteToPm: true,
    username: "tst",
    firstName: "Test",
};
describe("UserReadinessCheck", () => {
    it("must return true", () => {
        const players = [
            {
                user: user,
                card: [],
                ws: {},
                state: "",
                startGameState: true,
                passState: false,
            },
            {
                user: user,
                card: [],
                ws: {},
                state: "",
                startGameState: true,
                passState: false,
            },
        ];
        const userReadinessCheck = new UserReadinessCheck_1.default();
        expect(userReadinessCheck.UserReadinessCheck(players)).toBe(true);
    });
    it("must return false", () => {
        const players = [
            {
                user: user,
                card: [],
                ws: {},
                state: "",
                startGameState: true,
                passState: false,
            },
            {
                user: user,
                card: [],
                ws: {},
                state: "",
                startGameState: false,
                passState: false,
            },
        ];
        const userReadinessCheck = new UserReadinessCheck_1.default();
        expect(userReadinessCheck.UserReadinessCheck(players)).toBe(false);
    });
});
