"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_react_1 = require("@telegram-apps/sdk-react");
class UserParser {
    userParser(user) {
        const userData = (0, sdk_react_1.parseInitData)(user);
        if (!userData.user) {
            throw new Error("Invalid user data");
        }
        return userData;
    }
}
exports.default = UserParser;
