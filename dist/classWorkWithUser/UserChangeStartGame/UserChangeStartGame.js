"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserChangeStartGame {
    changeState(player, indexUser) {
        player[indexUser].startGameState = !player[indexUser].startGameState;
        return player;
    }
}
exports.default = UserChangeStartGame;
