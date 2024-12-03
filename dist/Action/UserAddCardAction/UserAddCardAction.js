"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UserAddCardAction_rooms, _UserAddCardAction_userParser, _UserAddCardAction_userFindRoom, _UserAddCardAction_notifyUser, _UserAddCardAction_userChakeState, _UserAddCardAction_checkState, _UserAddCardAction_checkCardOnTable, _UserAddCardAction_checkCardInUser, _UserAddCardAction_cardOnTable, _UserAddCardAction_userCardRemove, _UserAddCardAction_checkRankOnTable, _UserAddCardAction_userPass;
Object.defineProperty(exports, "__esModule", { value: true });
class UserAddCardAction {
    constructor(config) {
        _UserAddCardAction_rooms.set(this, void 0);
        _UserAddCardAction_userParser.set(this, void 0);
        _UserAddCardAction_userFindRoom.set(this, void 0);
        _UserAddCardAction_notifyUser.set(this, void 0);
        _UserAddCardAction_userChakeState.set(this, void 0);
        _UserAddCardAction_checkState.set(this, void 0);
        _UserAddCardAction_checkCardOnTable.set(this, void 0);
        _UserAddCardAction_checkCardInUser.set(this, void 0);
        _UserAddCardAction_cardOnTable.set(this, void 0);
        _UserAddCardAction_userCardRemove.set(this, void 0);
        _UserAddCardAction_checkRankOnTable.set(this, void 0);
        _UserAddCardAction_userPass.set(this, void 0);
        __classPrivateFieldSet(this, _UserAddCardAction_rooms, config.rooms, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_userParser, config.userParser, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_userFindRoom, config.userFindRoom, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_notifyUser, config.notifyUser, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_checkState, config.checkStateRoom, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_userChakeState, config.userChakeState, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_checkCardInUser, config.checkCardInUser, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_checkCardOnTable, config.checkCardOnTable, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_cardOnTable, config.cardOnTable, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_userCardRemove, config.userCardRemove, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_checkRankOnTable, config.checkRankOnTable, "f");
        __classPrivateFieldSet(this, _UserAddCardAction_userPass, config.userPass, "f");
    }
    UserAddCardAction(data) {
        if (!data.roomId || !data.card) {
            return;
        }
        let Room = __classPrivateFieldGet(this, _UserAddCardAction_rooms, "f").getRoom(data.roomId);
        const parserUser = __classPrivateFieldGet(this, _UserAddCardAction_userParser, "f").userParser(data.userData);
        const indexUser = __classPrivateFieldGet(this, _UserAddCardAction_userFindRoom, "f").findPlayerIndexInRoom(Room, parserUser.user.id);
        //state room in game
        console.log(1);
        if (!__classPrivateFieldGet(this, _UserAddCardAction_checkState, "f").checkStateGame(Room)) {
            return;
        }
        if (indexUser === -1) {
            return;
        }
        const user = Room.players[indexUser];
        if (__classPrivateFieldGet(this, _UserAddCardAction_userChakeState, "f").ChakeStateDefending(user)) {
            return;
        }
        const indexCard = __classPrivateFieldGet(this, _UserAddCardAction_checkCardInUser, "f").CheckCardInUser(user, data.card);
        if (indexCard == -1) {
            return;
        }
        if (!__classPrivateFieldGet(this, _UserAddCardAction_checkRankOnTable, "f").CheckRankOnTable(Room.cardsOnTable, data.card)) {
            return;
        }
        if (!__classPrivateFieldGet(this, _UserAddCardAction_checkCardOnTable, "f").checkIfCardMaxMinForAdd(Room.cardsOnTable)) {
            return;
        }
        Room.cardsOnTable = __classPrivateFieldGet(this, _UserAddCardAction_cardOnTable, "f").PutCardAttack(data.card, Room.cardsOnTable);
        Room.players[indexUser].card = __classPrivateFieldGet(this, _UserAddCardAction_userCardRemove, "f").CardRemove(user.card, indexCard);
        Room.players = __classPrivateFieldGet(this, _UserAddCardAction_userPass, "f").UpdateAllUserPass(Room.players);
        __classPrivateFieldGet(this, _UserAddCardAction_rooms, "f").saveRoom(data.roomId, Room);
        __classPrivateFieldGet(this, _UserAddCardAction_notifyUser, "f").sendNotification(Room, "attack");
    }
}
_UserAddCardAction_rooms = new WeakMap(), _UserAddCardAction_userParser = new WeakMap(), _UserAddCardAction_userFindRoom = new WeakMap(), _UserAddCardAction_notifyUser = new WeakMap(), _UserAddCardAction_userChakeState = new WeakMap(), _UserAddCardAction_checkState = new WeakMap(), _UserAddCardAction_checkCardOnTable = new WeakMap(), _UserAddCardAction_checkCardInUser = new WeakMap(), _UserAddCardAction_cardOnTable = new WeakMap(), _UserAddCardAction_userCardRemove = new WeakMap(), _UserAddCardAction_checkRankOnTable = new WeakMap(), _UserAddCardAction_userPass = new WeakMap();
exports.default = UserAddCardAction;
