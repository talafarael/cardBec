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
var _UserPassAction_rooms, _UserPassAction_userParser, _UserPassAction_userFindRoom, _UserPassAction_notifyUser, _UserPassAction_checkState, _UserPassAction_checkCardOnTable, _UserPassAction_userPass;
Object.defineProperty(exports, "__esModule", { value: true });
class UserPassAction {
    constructor(rooms, UserParser, UserFindRoom, NotifyUser, CheckStateRoom, CheckCardOnTable, UserPass) {
        _UserPassAction_rooms.set(this, void 0);
        _UserPassAction_userParser.set(this, void 0);
        _UserPassAction_userFindRoom.set(this, void 0);
        _UserPassAction_notifyUser.set(this, void 0);
        _UserPassAction_checkState.set(this, void 0);
        _UserPassAction_checkCardOnTable.set(this, void 0);
        _UserPassAction_userPass.set(this, void 0);
        __classPrivateFieldSet(this, _UserPassAction_rooms, rooms, "f");
        __classPrivateFieldSet(this, _UserPassAction_userParser, UserParser, "f");
        __classPrivateFieldSet(this, _UserPassAction_userFindRoom, UserFindRoom, "f");
        __classPrivateFieldSet(this, _UserPassAction_notifyUser, NotifyUser, "f");
        __classPrivateFieldSet(this, _UserPassAction_checkState, CheckStateRoom, "f");
        __classPrivateFieldSet(this, _UserPassAction_checkCardOnTable, CheckCardOnTable, "f");
        __classPrivateFieldSet(this, _UserPassAction_userPass, UserPass, "f");
    }
    UserPassAttacAction(data) {
        console.log(5);
        if (!data.roomId) {
            return;
        }
        let Room = __classPrivateFieldGet(this, _UserPassAction_rooms, "f").getRoom(data.roomId);
        const parserUser = __classPrivateFieldGet(this, _UserPassAction_userParser, "f").userParser(data.userData);
        const indexUser = __classPrivateFieldGet(this, _UserPassAction_userFindRoom, "f").findPlayerIndexInRoom(Room, parserUser.user.id);
        console.log(2);
        if (!__classPrivateFieldGet(this, _UserPassAction_checkState, "f").checkStateGame(Room)) {
            return;
        }
        console.log(1);
        if (__classPrivateFieldGet(this, _UserPassAction_checkCardOnTable, "f").checkIfCardIsZero(Room.cardsOnTable)) {
            return;
        }
        if (!__classPrivateFieldGet(this, _UserPassAction_checkCardOnTable, "f").checkIfCardMaxMinForAdd(Room.cardsOnTable)) {
            return;
        }
        if (indexUser === -1) {
            return;
        }
        if (!__classPrivateFieldGet(this, _UserPassAction_checkCardOnTable, "f").cehckDefCardOntTable(Room.cardsOnTable)) {
            return;
        }
        //user check
        const user = Room.players[indexUser];
        Room.players[indexUser] = __classPrivateFieldGet(this, _UserPassAction_userPass, "f").UserPassTrue(user);
        __classPrivateFieldGet(this, _UserPassAction_rooms, "f").saveRoom(data.roomId, Room);
        console.log("pass");
        __classPrivateFieldGet(this, _UserPassAction_notifyUser, "f").sendNotification(Room, "pass");
    }
}
_UserPassAction_rooms = new WeakMap(), _UserPassAction_userParser = new WeakMap(), _UserPassAction_userFindRoom = new WeakMap(), _UserPassAction_notifyUser = new WeakMap(), _UserPassAction_checkState = new WeakMap(), _UserPassAction_checkCardOnTable = new WeakMap(), _UserPassAction_userPass = new WeakMap();
exports.default = UserPassAction;
