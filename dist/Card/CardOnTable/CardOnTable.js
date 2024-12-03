"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardOnTable {
    PutCardAttack(card, cardsOnTable) {
        cardsOnTable.push({
            attack: card,
            deffit: null,
        });
        return cardsOnTable;
    }
    PutCardDeff(card, cardsOnTable, index) {
        cardsOnTable[index].deffit = card;
        return cardsOnTable;
    }
    removeCard(CardOnTable, pass) {
        CardOnTable.forEach((elem) => {
            pass.push(elem);
        });
        CardOnTable = [];
        return { cardOnTable: CardOnTable, pass };
    }
    pickUpAllCard(cardOnTable, card) {
        cardOnTable.forEach((elem) => {
            card.push(elem.attack);
            if (!elem.deffit)
                return;
            card.push(elem.deffit);
        });
        cardOnTable = [];
        return { cardOnTable, card };
    }
}
exports.default = CardOnTable;
