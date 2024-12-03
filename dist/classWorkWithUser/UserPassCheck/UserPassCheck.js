"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassCheck = void 0;
class UserPassCheck {
    UserPassCheck(users) {
        let statePass = true;
        users.forEach((elem) => {
            if (!elem.passState) {
                statePass = false;
            }
        });
        return statePass;
    }
}
exports.UserPassCheck = UserPassCheck;
exports.default = UserPassCheck;
