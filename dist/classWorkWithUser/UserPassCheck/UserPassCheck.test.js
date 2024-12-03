"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserPassCheck_1 = require("./UserPassCheck");
describe("UserPassCheck", () => {
    it("should be retrun true ", () => {
        const user = {
            passState: true,
        };
        const users = [user, user];
        const userPassCheck = new UserPassCheck_1.UserPassCheck();
        expect(userPassCheck.UserPassCheck(users)).toBe(true);
    });
    it("should be retrun false ", () => {
        const user = {
            passState: true,
        };
        const user2 = {
            passState: false,
        };
        const users = [user, user2];
        const userPassCheck = new UserPassCheck_1.UserPassCheck();
        expect(userPassCheck.UserPassCheck(users)).toBe(false);
    });
});
