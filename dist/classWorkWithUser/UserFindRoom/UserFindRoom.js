"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserFindRoom {
    findPlayerIndexInRoom(Room, id) {
        const playerIndex = Room.players.findIndex((elem) => elem.user.id == id);
        return playerIndex;
    }
}
exports.default = UserFindRoom;
