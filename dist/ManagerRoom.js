"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerRoom = void 0;
const card_data_1 = require("./card.data");
const uuid_1 = require("uuid");
class ManagerRoom {
    createRoom(owner) {
        const Room = {
            players: [],
            roomId: (0, uuid_1.v4)(),
            isGameActive: false,
            card: card_data_1.cardData,
            owner: owner,
            trump: null,
            pass: [],
            cardsOnTable: [],
            GrabState: false,
        };
        return Room;
    }
}
exports.ManagerRoom = ManagerRoom;
