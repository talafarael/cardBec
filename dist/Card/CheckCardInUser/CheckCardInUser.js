"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckCardInUser {
    CheckCardInUser(user, card) {
        const index = user.card.findIndex((elem) => elem.rank === card.rank && elem.suit === card.suit);
        return index;
    }
    CheckCardInAtackTable(cardsOnTable, card) {
        const index = cardsOnTable.findIndex((elem) => elem.attack.rank === card.rank && elem.attack.suit === card.suit);
        return index;
    }
}
exports.default = CheckCardInUser;
