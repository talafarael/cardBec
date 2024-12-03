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
var _GrabCardAction_rooms, _GrabCardAction_userParser, _GrabCardAction_userFindRoom, _GrabCardAction_notifyUser, _GrabCardAction_userChakeState, _GrabCardAction_checkCardOnTable, _GrabCardAction_cardOnTable, _GrabCardAction_simpleCardDealer, _GrabCardAction_userPass;
Object.defineProperty(exports, "__esModule", { value: true });
class GrabCardAction {
    constructor(config) {
        _GrabCardAction_rooms.set(this, void 0);
        _GrabCardAction_userParser.set(this, void 0);
        _GrabCardAction_userFindRoom.set(this, void 0);
        _GrabCardAction_notifyUser.set(this, void 0);
        _GrabCardAction_userChakeState.set(this, void 0);
        _GrabCardAction_checkCardOnTable.set(this, void 0);
        _GrabCardAction_cardOnTable.set(this, void 0);
        _GrabCardAction_simpleCardDealer.set(this, void 0);
        _GrabCardAction_userPass.set(this, void 0);
        __classPrivateFieldSet(this, _GrabCardAction_rooms, config.rooms, "f");
        __classPrivateFieldSet(this, _GrabCardAction_userParser, config.userParser, "f");
        __classPrivateFieldSet(this, _GrabCardAction_userFindRoom, config.userFindRoom, "f");
        __classPrivateFieldSet(this, _GrabCardAction_notifyUser, config.notifyUser, "f");
        __classPrivateFieldSet(this, _GrabCardAction_userChakeState, config.userChakeState, "f");
        __classPrivateFieldSet(this, _GrabCardAction_checkCardOnTable, config.checkCardOnTable, "f");
        __classPrivateFieldSet(this, _GrabCardAction_cardOnTable, config.cardOnTable, "f");
        __classPrivateFieldSet(this, _GrabCardAction_simpleCardDealer, config.simpleCardDealer, "f");
        __classPrivateFieldSet(this, _GrabCardAction_userPass, config.userPass, "f");
    }
    grabAll(data) {
        if (!data.roomId) {
            return;
        }
        let Room = __classPrivateFieldGet(this, _GrabCardAction_rooms, "f").getRoom(data.roomId);
        const parserUser = __classPrivateFieldGet(this, _GrabCardAction_userParser, "f").userParser(data.userData);
        const indexUser = __classPrivateFieldGet(this, _GrabCardAction_userFindRoom, "f").findPlayerIndexInRoom(Room, parserUser.user.id);
        console.log(1);
        if (__classPrivateFieldGet(this, _GrabCardAction_checkCardOnTable, "f").checkIfCardIsZero(Room.cardsOnTable)) {
            return;
        }
        const user = Room.players[indexUser];
        if (!__classPrivateFieldGet(this, _GrabCardAction_userChakeState, "f").ChakeStateDefending(user)) {
            return;
        }
        ({ cardOnTable: Room.cardsOnTable, card: user.card } =
            __classPrivateFieldGet(this, _GrabCardAction_cardOnTable, "f").pickUpAllCard(Room.cardsOnTable, user.card));
        __classPrivateFieldGet(this, _GrabCardAction_simpleCardDealer, "f").startGame(Room);
        Room.players = __classPrivateFieldGet(this, _GrabCardAction_userPass, "f").UpdateAllUserPass(Room.players);
        __classPrivateFieldGet(this, _GrabCardAction_rooms, "f").saveRoom(data.roomId, Room);
        __classPrivateFieldGet(this, _GrabCardAction_notifyUser, "f").sendNotification(Room, "grab");
    }
}
_GrabCardAction_rooms = new WeakMap(), _GrabCardAction_userParser = new WeakMap(), _GrabCardAction_userFindRoom = new WeakMap(), _GrabCardAction_notifyUser = new WeakMap(), _GrabCardAction_userChakeState = new WeakMap(), _GrabCardAction_checkCardOnTable = new WeakMap(), _GrabCardAction_cardOnTable = new WeakMap(), _GrabCardAction_simpleCardDealer = new WeakMap(), _GrabCardAction_userPass = new WeakMap();
exports.default = GrabCardAction;
