"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckStateRoom {
    checkStateGame(room) {
        if (room.isGameActive) {
            return true;
        }
        return false;
    }
    checkUserCount(room) {
        if (room.players.length < 2) {
            return false;
        }
        return true;
    }
}
exports.default = CheckStateRoom;
