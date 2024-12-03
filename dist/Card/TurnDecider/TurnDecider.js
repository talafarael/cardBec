"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnDecider = void 0;
class TurnDecider {
    determineFirstPlayer(players) {
        const firstPlayerIndex = Math.floor(Math.random() * players.length);
        // players[firstPlayerIndex].state = true;
        return players;
    }
}
exports.TurnDecider = TurnDecider;
