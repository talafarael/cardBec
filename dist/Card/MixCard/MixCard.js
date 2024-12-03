"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MixCard {
    Mix(cards) {
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[randomIndex]] = [
                shuffled[randomIndex],
                shuffled[i],
            ];
        }
        return shuffled;
    }
}
exports.default = MixCard;
