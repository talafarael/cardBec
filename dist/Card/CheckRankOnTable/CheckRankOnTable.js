"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckRankOnTable {
    CheckRankOnTable(table, card) {
        let stateFindRank = false;
        table.forEach((elem) => {
            var _a;
            if (elem.attack.rank == card.rank || ((_a = elem.deffit) === null || _a === void 0 ? void 0 : _a.rank) == card.rank) {
                stateFindRank = true;
            }
        });
        return stateFindRank;
    }
}
exports.default = CheckRankOnTable;
