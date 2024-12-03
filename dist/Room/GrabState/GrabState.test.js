"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GrabState_1 = __importDefault(require("./GrabState"));
describe("checkGrabState", () => {
    it("should return false", () => {
        const grabState = new GrabState_1.default();
        const roomGrabFalse = {
            GrabState: false,
        };
        expect(grabState.checkGrabState(roomGrabFalse)).toBe(false);
    });
});
describe("cheng to true", () => {
    it("should return true", () => {
        const roomGrabFalse = {
            GrabState: false,
        };
        const roomGrabTrue = {
            GrabState: true,
        };
        const grabState = new GrabState_1.default();
        expect(grabState.changeGrabStateTrue(roomGrabFalse)).toEqual(roomGrabTrue);
    });
});
describe("cheng to false", () => {
    it("should return false", () => {
        const roomGrabFalse = {
            GrabState: false,
        };
        const roomGrabTrue = {
            GrabState: true,
        };
        const grabState = new GrabState_1.default();
        expect(grabState.changeGrabStateFalse(roomGrabTrue)).toEqual(roomGrabFalse);
    });
});
