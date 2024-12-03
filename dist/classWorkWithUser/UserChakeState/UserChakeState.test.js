"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserChakeState_1 = __importDefault(require("./UserChakeState"));
describe("UserChakeState attack", () => {
    it("should be retrun true", () => {
        const userChakeState = new UserChakeState_1.default();
        const user = {
            state: "attacking",
        };
        expect(userChakeState.ChakeStateAttack(user)).toBe(true);
    });
    it("should be retrun false", () => {
        const userChakeState = new UserChakeState_1.default();
        const user = {
            state: "defending",
        };
        expect(userChakeState.ChakeStateAttack(user)).toBe(false);
    });
});
describe("UserChakeState def", () => {
    it("should be retrun true", () => {
        const userChakeState = new UserChakeState_1.default();
        const user = {
            state: "defending",
        };
        expect(userChakeState.ChakeStateDefending(user)).toBe(true);
    });
    it("should be retrun false", () => {
        const userChakeState = new UserChakeState_1.default();
        const user = {
            state: "attacking",
        };
        expect(userChakeState.ChakeStateDefending(user)).toBe(false);
    });
});
