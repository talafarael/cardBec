"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserCardRemove {
    CardRemove(card, index) {
        card.splice(index, 1);
        return card;
    }
}
exports.default = UserCardRemove;
