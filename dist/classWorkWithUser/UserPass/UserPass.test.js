"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserPass_1 = require("./UserPass");
describe("UserPass", () => {
    it("should be retrun true with user", () => {
        const user = {
            passState: false,
        };
        const userPass = new UserPass_1.UserPass();
        const res = userPass.UserPassTrue(user);
        expect(res.passState).toBe(true);
    });
});
describe("UpdateAllUserPass", () => {
    it("should be retrun true with user", () => {
        const user = {
            passState: true,
        };
        const users = [user, user];
        const userPass = new UserPass_1.UserPass();
        const res = userPass.UpdateAllUserPass(users);
        expect(res[0].passState).toBe(false);
        expect(res[1].passState).toBe(false);
    });
});
