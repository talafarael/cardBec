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
var _UserAttackAction_rooms, _UserAttackAction_userParser, _UserAttackAction_userFindRoom, _UserAttackAction_notifyUser, _UserAttackAction_userChakeState, _UserAttackAction_checkState, _UserAttackAction_checkCardOnTable, _UserAttackAction_checkCardInUser, _UserAttackAction_cardOnTable, _UserAttackAction_userCardRemove, _UserAttackAction_userPass;
Object.defineProperty(exports, "__esModule", { value: true });
class UserAttackAction {
    constructor(config) {
        _UserAttackAction_rooms.set(this, void 0);
        _UserAttackAction_userParser.set(this, void 0);
        _UserAttackAction_userFindRoom.set(this, void 0);
        _UserAttackAction_notifyUser.set(this, void 0);
        _UserAttackAction_userChakeState.set(this, void 0);
        _UserAttackAction_checkState.set(this, void 0);
        _UserAttackAction_checkCardOnTable.set(this, void 0);
        _UserAttackAction_checkCardInUser.set(this, void 0);
        _UserAttackAction_cardOnTable.set(this, void 0);
        _UserAttackAction_userCardRemove.set(this, void 0);
        _UserAttackAction_userPass.set(this, void 0);
        __classPrivateFieldSet(this, _UserAttackAction_rooms, config.rooms, "f");
        __classPrivateFieldSet(this, _UserAttackAction_userParser, config.userParser, "f");
        __classPrivateFieldSet(this, _UserAttackAction_userFindRoom, config.userFindRoom, "f");
        __classPrivateFieldSet(this, _UserAttackAction_notifyUser, config.notifyUser, "f");
        __classPrivateFieldSet(this, _UserAttackAction_checkState, config.checkStateRoom, "f");
        __classPrivateFieldSet(this, _UserAttackAction_userChakeState, config.userChakeState, "f");
        __classPrivateFieldSet(this, _UserAttackAction_checkCardInUser, config.checkCardInUser, "f");
        __classPrivateFieldSet(this, _UserAttackAction_checkCardOnTable, config.checkCardOnTable, "f");
        __classPrivateFieldSet(this, _UserAttackAction_cardOnTable, config.cardOnTable, "f");
        __classPrivateFieldSet(this, _UserAttackAction_userCardRemove, config.userCardRemove, "f");
        __classPrivateFieldSet(this, _UserAttackAction_userPass, config.userPass, "f");
    }
    UserAttack(data) {
        if (!data.roomId || !data.card) {
            return;
        }
        console.log(data.roomId);
        let Room = __classPrivateFieldGet(this, _UserAttackAction_rooms, "f").getRoom(data.roomId);
        if (!Room) {
            console.log("aa");
            return;
        }
        const parserUser = __classPrivateFieldGet(this, _UserAttackAction_userParser, "f").userParser(data.userData);
        const indexUser = __classPrivateFieldGet(this, _UserAttackAction_userFindRoom, "f").findPlayerIndexInRoom(Room, parserUser.user.id);
        if (!__classPrivateFieldGet(this, _UserAttackAction_checkState, "f").checkStateGame(Room)) {
            return;
        }
        if (indexUser === -1) {
            return;
        }
        const user = Room.players[indexUser];
        if (!__classPrivateFieldGet(this, _UserAttackAction_userChakeState, "f").ChakeStateAttack(user)) {
            return;
        }
        const indexCard = __classPrivateFieldGet(this, _UserAttackAction_checkCardInUser, "f").CheckCardInUser(user, data.card);
        if (indexCard == -1) {
            return;
        }
        if (!__classPrivateFieldGet(this, _UserAttackAction_checkCardOnTable, "f").checkIfCardIsZero(Room.cardsOnTable)) {
            return;
        }
        Room.cardsOnTable = __classPrivateFieldGet(this, _UserAttackAction_cardOnTable, "f").PutCardAttack(data.card, Room.cardsOnTable);
        Room.players[indexUser].card = __classPrivateFieldGet(this, _UserAttackAction_userCardRemove, "f").CardRemove(user.card, indexCard);
        Room.players = __classPrivateFieldGet(this, _UserAttackAction_userPass, "f").UpdateAllUserPass(Room.players);
        __classPrivateFieldGet(this, _UserAttackAction_rooms, "f").saveRoom(data.roomId, Room);
        console.log(5);
        __classPrivateFieldGet(this, _UserAttackAction_notifyUser, "f").sendNotification(Room, "attack");
    }
}
_UserAttackAction_rooms = new WeakMap(), _UserAttackAction_userParser = new WeakMap(), _UserAttackAction_userFindRoom = new WeakMap(), _UserAttackAction_notifyUser = new WeakMap(), _UserAttackAction_userChakeState = new WeakMap(), _UserAttackAction_checkState = new WeakMap(), _UserAttackAction_checkCardOnTable = new WeakMap(), _UserAttackAction_checkCardInUser = new WeakMap(), _UserAttackAction_cardOnTable = new WeakMap(), _UserAttackAction_userCardRemove = new WeakMap(), _UserAttackAction_userPass = new WeakMap();
exports.default = UserAttackAction;
