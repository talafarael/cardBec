"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckCardOnTable {
    checkIfCardIsZero(cardTable) {
        if (cardTable.length == 0) {
            return true;
        }
        return false;
    }
    checkIfCardMaxMinForAdd(cardTable) {
        if (cardTable.length > 6 || cardTable.length < 1) {
            return false;
        }
        return true;
    }
    cehckDefCardOntTable(cardTable) {
        let state = true;
        cardTable.forEach((elem) => {
            if (!elem.deffit) {
                state = false;
            }
        });
        return state;
    }
}
exports.default = CheckCardOnTable;
