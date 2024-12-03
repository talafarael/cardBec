"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserReadinessCheck {
    UserReadinessCheck(users) {
        let stateGame = true;
        users.forEach((elem) => {
            if (!elem.startGameState) {
                stateGame = false;
            }
        });
        return stateGame;
    }
}
exports.default = UserReadinessCheck;
