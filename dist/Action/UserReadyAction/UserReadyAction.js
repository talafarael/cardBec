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
var _UserReadyAction_rooms, _UserReadyAction_userParser, _UserReadyAction_userFindRoom, _UserReadyAction_userChangeStartGame, _UserReadyAction_notifyUser, _UserReadyAction_checkStateRoom;
Object.defineProperty(exports, "__esModule", { value: true });
class UserReadyAction {
    constructor(rooms, UserParser, UserFindRoom, UserChangeStartGame, NotifyUser, CheckStateRoom) {
        _UserReadyAction_rooms.set(this, void 0);
        _UserReadyAction_userParser.set(this, void 0);
        _UserReadyAction_userFindRoom.set(this, void 0);
        _UserReadyAction_userChangeStartGame.set(this, void 0);
        _UserReadyAction_notifyUser.set(this, void 0);
        _UserReadyAction_checkStateRoom.set(this, void 0);
        __classPrivateFieldSet(this, _UserReadyAction_rooms, rooms, "f");
        __classPrivateFieldSet(this, _UserReadyAction_userParser, UserParser, "f");
        __classPrivateFieldSet(this, _UserReadyAction_userFindRoom, UserFindRoom, "f");
        __classPrivateFieldSet(this, _UserReadyAction_userChangeStartGame, UserChangeStartGame, "f");
        __classPrivateFieldSet(this, _UserReadyAction_notifyUser, NotifyUser, "f");
        __classPrivateFieldSet(this, _UserReadyAction_checkStateRoom, CheckStateRoom, "f");
        // this.#managerRoom = ManagareRoom;
    }
    UserReady(data) {
        if (!data.roomId) {
            return;
        }
        let Room = __classPrivateFieldGet(this, _UserReadyAction_rooms, "f").getRoom(data.roomId);
        const parserUser = __classPrivateFieldGet(this, _UserReadyAction_userParser, "f").userParser(data.userData);
        const indexUser = __classPrivateFieldGet(this, _UserReadyAction_userFindRoom, "f").findPlayerIndexInRoom(Room, parserUser.user.id);
        if (__classPrivateFieldGet(this, _UserReadyAction_checkStateRoom, "f").checkStateGame(Room)) {
            return;
        }
        if (indexUser === -1) {
            return;
        }
        const playerResult = __classPrivateFieldGet(this, _UserReadyAction_userChangeStartGame, "f").changeState(Room.players, indexUser);
        Room.players = playerResult;
        __classPrivateFieldGet(this, _UserReadyAction_rooms, "f").saveRoom(data.roomId, Room);
        __classPrivateFieldGet(this, _UserReadyAction_notifyUser, "f").sendNotification(Room, "UserReady");
    }
}
_UserReadyAction_rooms = new WeakMap(), _UserReadyAction_userParser = new WeakMap(), _UserReadyAction_userFindRoom = new WeakMap(), _UserReadyAction_userChangeStartGame = new WeakMap(), _UserReadyAction_notifyUser = new WeakMap(), _UserReadyAction_checkStateRoom = new WeakMap();
exports.default = UserReadyAction;
