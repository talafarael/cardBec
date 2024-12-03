"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ComparisonCard {
    ComparisonCard(cardDif, cardAttack, trump) {
        if (cardDif.suit != cardAttack.suit && cardDif.suit != trump.suit) {
            return false;
        }
        if (cardDif.suit == cardAttack.suit && cardDif.level > cardAttack.level) {
            return true;
        }
        if (cardDif.suit == trump.suit && cardAttack.suit != trump.suit) {
            return true;
        }
        return false;
    }
}
exports.default = ComparisonCard;
