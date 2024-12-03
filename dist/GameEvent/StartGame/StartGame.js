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
var _StartGame_userReadinessCheck, _StartGame_rooms, _StartGame_notifyUser, _StartGame_roomStater, _StartGame_mixCards, _StartGame_simpleCardDealer, _StartGame_checkState, _StartGame_roleAssigner;
Object.defineProperty(exports, "__esModule", { value: true });
class StartGame {
    constructor(config) {
        _StartGame_userReadinessCheck.set(this, void 0);
        _StartGame_rooms.set(this, void 0);
        _StartGame_notifyUser.set(this, void 0);
        _StartGame_roomStater.set(this, void 0);
        _StartGame_mixCards.set(this, void 0);
        _StartGame_simpleCardDealer.set(this, void 0);
        _StartGame_checkState.set(this, void 0);
        _StartGame_roleAssigner.set(this, void 0);
        __classPrivateFieldSet(this, _StartGame_userReadinessCheck, config.userReadinessCheck, "f");
        __classPrivateFieldSet(this, _StartGame_rooms, config.rooms, "f");
        __classPrivateFieldSet(this, _StartGame_mixCards, config.mixCards, "f");
        __classPrivateFieldSet(this, _StartGame_simpleCardDealer, config.simpleCardDealer, "f");
        __classPrivateFieldSet(this, _StartGame_notifyUser, config.notifyUser, "f");
        __classPrivateFieldSet(this, _StartGame_roomStater, config.roomStater, "f");
        __classPrivateFieldSet(this, _StartGame_checkState, config.checkStateRoom, "f");
        __classPrivateFieldSet(this, _StartGame_roleAssigner, config.roleAssigner, "f");
    }
    StartGame(data) {
        if (!data.roomId) {
            return;
        }
        let Room = __classPrivateFieldGet(this, _StartGame_rooms, "f").getRoom(data.roomId);
        if (!__classPrivateFieldGet(this, _StartGame_checkState, "f").checkUserCount(Room)) {
            return;
        }
        if (__classPrivateFieldGet(this, _StartGame_checkState, "f").checkStateGame(Room)) {
            return;
        }
        if (!__classPrivateFieldGet(this, _StartGame_userReadinessCheck, "f").UserReadinessCheck(Room.players)) {
            return;
        }
        Room.card = __classPrivateFieldGet(this, _StartGame_mixCards, "f").Mix(Room.card);
        Room.trump = __classPrivateFieldGet(this, _StartGame_simpleCardDealer, "f").setTrumps(Room.card);
        __classPrivateFieldGet(this, _StartGame_simpleCardDealer, "f").startGame(Room);
        __classPrivateFieldGet(this, _StartGame_roomStater, "f").roomStart(Room);
        __classPrivateFieldGet(this, _StartGame_roleAssigner, "f").startAssignRole(Room);
        __classPrivateFieldGet(this, _StartGame_notifyUser, "f").sendNotification(Room, "startGame");
        __classPrivateFieldGet(this, _StartGame_rooms, "f").saveRoom(data.roomId, Room);
    }
}
_StartGame_userReadinessCheck = new WeakMap(), _StartGame_rooms = new WeakMap(), _StartGame_notifyUser = new WeakMap(), _StartGame_roomStater = new WeakMap(), _StartGame_mixCards = new WeakMap(), _StartGame_simpleCardDealer = new WeakMap(), _StartGame_checkState = new WeakMap(), _StartGame_roleAssigner = new WeakMap();
exports.default = StartGame;
