"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserChangeStartGame_1 = require("./UserChangeStartGame");
const user = {
    session: "1234",
    hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
    id: 1,
    allowsWriteToPm: true,
    username: "tst",
    firstName: "Test",
};
const player = [
    {
        user: user,
        card: [],
        ws: {},
        state: "",
        startGameState: false,
        passState: false,
    },
    {
        user: user,
        card: [],
        ws: {},
        state: "",
        startGameState: false,
        passState: false,
    },
];
const resultPlayer = [
    {
        user: user,
        card: [],
        ws: {},
        state: "",
        startGameState: true,
        passState: false,
    },
    {
        user: user,
        card: [],
        ws: {},
        state: "",
        startGameState: false,
        passState: false,
    },
];
describe("changeState", () => {
    it("Must return true in placeHolder user 1", () => {
        const userChangeStartGame = new UserChangeStartGame_1.UserChangeStartGame();
        expect(userChangeStartGame.changeState(player, 0)).toEqual(resultPlayer);
    });
});
