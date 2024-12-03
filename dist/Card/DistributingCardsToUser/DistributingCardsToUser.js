"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DistributingCardsToUser {
    distributeCards(card, player) {
        while (player.card.length < 6 && card.length > 0) {
            player.card.push(card[card.length - 1]);
            card.pop();
        }
    }
}
exports.default = DistributingCardsToUser;
