"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserChakeState {
    ChakeStateAttack(user) {
        if (user.state == "attacking") {
            return true;
        }
        return false;
    }
    ChakeStateDefending(user) {
        if (user.state == "defending") {
            return true;
        }
        return false;
    }
}
exports.default = UserChakeState;
