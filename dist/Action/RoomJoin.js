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
var _RoomJoin_rooms, _RoomJoin_ws, _RoomJoin_notifyUser, _RoomJoin_managerRoom, _RoomJoin_userManager, _RoomJoin_userFindIndexInRoom, _RoomJoin_userParser, _RoomJoin_checkState;
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RoomJoin {
    constructor(config) {
        _RoomJoin_rooms.set(this, void 0);
        _RoomJoin_ws.set(this, void 0);
        _RoomJoin_notifyUser.set(this, void 0);
        _RoomJoin_managerRoom.set(this, void 0);
        _RoomJoin_userManager.set(this, void 0);
        _RoomJoin_userFindIndexInRoom.set(this, void 0);
        _RoomJoin_userParser.set(this, void 0);
        _RoomJoin_checkState.set(this, void 0);
        __classPrivateFieldSet(this, _RoomJoin_rooms, config.rooms, "f");
        __classPrivateFieldSet(this, _RoomJoin_ws, config.ws, "f");
        __classPrivateFieldSet(this, _RoomJoin_managerRoom, config.managerRoom, "f");
        __classPrivateFieldSet(this, _RoomJoin_userManager, config.userManager, "f");
        __classPrivateFieldSet(this, _RoomJoin_userFindIndexInRoom, config.userFindIndexInRoom, "f");
        __classPrivateFieldSet(this, _RoomJoin_userParser, config.userParser, "f");
        __classPrivateFieldSet(this, _RoomJoin_notifyUser, config.notifyUser, "f");
        __classPrivateFieldSet(this, _RoomJoin_checkState, config.checkStateRoom, "f");
    }
    joinRoom(data) {
        if (!data.roomId) {
            const session = (0, uuid_1.v4)();
            const parserUser = __classPrivateFieldGet(this, _RoomJoin_userParser, "f").userParser(data.userData);
            const Room = __classPrivateFieldGet(this, _RoomJoin_managerRoom, "f").createRoom(parserUser.user.id.toString());
            const user = __classPrivateFieldGet(this, _RoomJoin_userManager, "f").transformUserForRoom(parserUser, session);
            Room.players.push(__classPrivateFieldGet(this, _RoomJoin_userManager, "f").transformedPlayer(user, __classPrivateFieldGet(this, _RoomJoin_ws, "f")));
            __classPrivateFieldGet(this, _RoomJoin_rooms, "f").saveRoom(Room.roomId, Room);
            __classPrivateFieldGet(this, _RoomJoin_notifyUser, "f").sendNotification(Room, "join");
            return;
        }
        let Room = __classPrivateFieldGet(this, _RoomJoin_rooms, "f").getRoom(data.roomId);
        if (!Room) {
            __classPrivateFieldGet(this, _RoomJoin_ws, "f").send(JSON.stringify(this.sendError("room is not dei")));
            return;
        }
        if (Room.players.length == 0) {
            return;
        }
        const parserUser = __classPrivateFieldGet(this, _RoomJoin_userParser, "f").userParser(data.userData);
        const playerIndex = __classPrivateFieldGet(this, _RoomJoin_userFindIndexInRoom, "f").findPlayerIndexInRoom(Room, parserUser.user.id);
        if (__classPrivateFieldGet(this, _RoomJoin_checkState, "f").checkStateGame(Room) && playerIndex == -1) {
            return;
        }
        const session = (0, uuid_1.v4)();
        if (playerIndex != -1) {
            Room.players[playerIndex].ws = __classPrivateFieldGet(this, _RoomJoin_ws, "f");
            __classPrivateFieldGet(this, _RoomJoin_rooms, "f").saveRoom(data.roomId, Room);
        }
        else {
            const user = __classPrivateFieldGet(this, _RoomJoin_userManager, "f").transformUserForRoom(parserUser, session);
            // (this.rooms.rooms[data.roomId] as IRoom).players[playerIndex].ws = this.ws;
            Room.players.push(__classPrivateFieldGet(this, _RoomJoin_userManager, "f").transformedPlayer(user, __classPrivateFieldGet(this, _RoomJoin_ws, "f")));
        }
        __classPrivateFieldGet(this, _RoomJoin_rooms, "f").saveRoom(data.roomId, Room);
        __classPrivateFieldGet(this, _RoomJoin_notifyUser, "f").sendNotification(Room, "join");
    }
    sendError(message) {
        __classPrivateFieldGet(this, _RoomJoin_ws, "f").send(JSON.stringify({ status: "error", message }));
    }
}
_RoomJoin_rooms = new WeakMap(), _RoomJoin_ws = new WeakMap(), _RoomJoin_notifyUser = new WeakMap(), _RoomJoin_managerRoom = new WeakMap(), _RoomJoin_userManager = new WeakMap(), _RoomJoin_userFindIndexInRoom = new WeakMap(), _RoomJoin_userParser = new WeakMap(), _RoomJoin_checkState = new WeakMap();
exports.default = RoomJoin;
