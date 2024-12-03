"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SendMessage {
    JoinMessage(message, ws) {
        ws.send(JSON.stringify(message));
    }
}
exports.default = SendMessage;
