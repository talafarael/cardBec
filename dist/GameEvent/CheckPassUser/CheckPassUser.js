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
var _CheckPassUser_rooms, _CheckPassUser_userParser, _CheckPassUser_userFindRoom, _CheckPassUser_notifyUser, _CheckPassUser_checkStateRoom, _CheckPassUser_cardOnTable, _CheckPassUser_simpleCardDealer, _CheckPassUser_userPassCheck, _CheckPassUser_roleAssigner, _CheckPassUser_userPass;
Object.defineProperty(exports, "__esModule", { value: true });
class CheckPassUser {
    constructor(config) {
        _CheckPassUser_rooms.set(this, void 0);
        _CheckPassUser_userParser.set(this, void 0);
        _CheckPassUser_userFindRoom.set(this, void 0);
        _CheckPassUser_notifyUser.set(this, void 0);
        _CheckPassUser_checkStateRoom.set(this, void 0);
        _CheckPassUser_cardOnTable.set(this, void 0);
        _CheckPassUser_simpleCardDealer.set(this, void 0);
        _CheckPassUser_userPassCheck.set(this, void 0);
        _CheckPassUser_roleAssigner.set(this, void 0);
        _CheckPassUser_userPass.set(this, void 0);
        __classPrivateFieldSet(this, _CheckPassUser_rooms, config.rooms, "f");
        __classPrivateFieldSet(this, _CheckPassUser_userParser, config.userParser, "f");
        __classPrivateFieldSet(this, _CheckPassUser_userFindRoom, config.userFindRoom, "f");
        __classPrivateFieldSet(this, _CheckPassUser_notifyUser, config.notifyUser, "f");
        __classPrivateFieldSet(this, _CheckPassUser_checkStateRoom, config.checkStateRoom, "f");
        __classPrivateFieldSet(this, _CheckPassUser_cardOnTable, config.cardOnTable, "f");
        __classPrivateFieldSet(this, _CheckPassUser_userPassCheck, config.userPassCheck, "f");
        __classPrivateFieldSet(this, _CheckPassUser_simpleCardDealer, config.simpleCardDealer, "f");
        __classPrivateFieldSet(this, _CheckPassUser_roleAssigner, config.roleAssigner, "f");
        __classPrivateFieldSet(this, _CheckPassUser_userPass, config.userPass, "f");
    }
    CheckPassUser(data) {
        if (!data.roomId) {
            return;
        }
        let Room = __classPrivateFieldGet(this, _CheckPassUser_rooms, "f").getRoom(data.roomId);
        const parserUser = __classPrivateFieldGet(this, _CheckPassUser_userParser, "f").userParser(data.userData);
        const indexUser = __classPrivateFieldGet(this, _CheckPassUser_userFindRoom, "f").findPlayerIndexInRoom(Room, parserUser.user.id);
        if (!__classPrivateFieldGet(this, _CheckPassUser_checkStateRoom, "f").checkStateGame(Room)) {
            return;
        }
        if (indexUser === -1) {
            return;
        }
        if (!__classPrivateFieldGet(this, _CheckPassUser_userPassCheck, "f").UserPassCheck(Room.players)) {
            return;
        }
        __classPrivateFieldGet(this, _CheckPassUser_simpleCardDealer, "f").startGame(Room);
        __classPrivateFieldGet(this, _CheckPassUser_roleAssigner, "f").nextAssignRole(Room);
        Room.players = __classPrivateFieldGet(this, _CheckPassUser_userPass, "f").UpdateAllUserPass(Room.players);
        const { cardOnTable, pass } = __classPrivateFieldGet(this, _CheckPassUser_cardOnTable, "f").removeCard(Room.cardsOnTable, Room.pass);
        Room.cardsOnTable = cardOnTable;
        Room.pass = pass;
        __classPrivateFieldGet(this, _CheckPassUser_rooms, "f").saveRoom(data.roomId, Room);
        __classPrivateFieldGet(this, _CheckPassUser_notifyUser, "f").sendNotification(Room, "pass");
    }
}
_CheckPassUser_rooms = new WeakMap(), _CheckPassUser_userParser = new WeakMap(), _CheckPassUser_userFindRoom = new WeakMap(), _CheckPassUser_notifyUser = new WeakMap(), _CheckPassUser_checkStateRoom = new WeakMap(), _CheckPassUser_cardOnTable = new WeakMap(), _CheckPassUser_simpleCardDealer = new WeakMap(), _CheckPassUser_userPassCheck = new WeakMap(), _CheckPassUser_roleAssigner = new WeakMap(), _CheckPassUser_userPass = new WeakMap();
exports.default = CheckPassUser;
