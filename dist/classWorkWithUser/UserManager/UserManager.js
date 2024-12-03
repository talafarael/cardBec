"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserManager {
    transformUserForRoom(userData, session) {
        const user = {
            session: session,
            hash: userData.hash,
            id: userData.user.id,
            allowsWriteToPm: userData.user.allowsWriteToPm,
            username: userData.user.username,
            firstName: userData.user.firstName,
        };
        return user;
    }
    transformedPlayerPublisher(user) {
        const player = {
            id: user.user.id,
            cardCount: user.card.length,
            firstName: user.user.firstName,
            startGame: user.startGameState,
            state: user.state,
            passState: user.passState,
        };
        return player;
    }
    transformedPlayer(user, ws) {
        const player = {
            state: "",
            startGameState: false,
            user: user,
            card: [],
            ws: ws,
            passState: false,
        };
        return player;
    }
}
exports.default = UserManager;
