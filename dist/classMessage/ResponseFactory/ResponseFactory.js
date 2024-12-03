"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseFactory {
    templateMessage(data) {
        const res = {
            session: data.session,
            action: data.action,
            players: data.players,
            roomId: data.roomId,
            you: data.user,
            trump: data.trump,
            pass: data.pass,
            cardsOnTable: data.cardsOnTable,
            passState: data.passState,
            cardsOnTableCount: data.cardsOnTableCount,
        };
        return res;
    }
}
exports.default = ResponseFactory;
