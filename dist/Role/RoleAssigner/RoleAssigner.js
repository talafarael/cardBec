"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RoleAssigner_instances, _RoleAssigner_nextAssignIndex, _RoleAssigner_getRandomPlayerIndexForFirstMove, _RoleAssigner_findUserWithDef, _RoleAssigner_roleDistributor, _RoleAssigner_assignAttacker, _RoleAssigner_assignDefender;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAssigner = void 0;
class RoleAssigner {
    constructor() {
        _RoleAssigner_instances.add(this);
    }
    startAssignRole(room) {
        const index = __classPrivateFieldGet(this, _RoleAssigner_instances, "m", _RoleAssigner_getRandomPlayerIndexForFirstMove).call(this, room);
        const { atack, def } = __classPrivateFieldGet(this, _RoleAssigner_instances, "m", _RoleAssigner_roleDistributor).call(this, room.players.length, index);
        __classPrivateFieldGet(this, _RoleAssigner_instances, "m", _RoleAssigner_assignAttacker).call(this, room, atack);
        __classPrivateFieldGet(this, _RoleAssigner_instances, "m", _RoleAssigner_assignDefender).call(this, room, def);
    }
    nextAssignRole(room) {
        const indexPreviuosAttack = __classPrivateFieldGet(this, _RoleAssigner_instances, "m", _RoleAssigner_findUserWithDef).call(this, room);
        const index = __classPrivateFieldGet(this, _RoleAssigner_instances, "m", _RoleAssigner_nextAssignIndex).call(this, room.players.length, indexPreviuosAttack);
        const { atack, def } = __classPrivateFieldGet(this, _RoleAssigner_instances, "m", _RoleAssigner_roleDistributor).call(this, room.players.length, index);
        __classPrivateFieldGet(this, _RoleAssigner_instances, "m", _RoleAssigner_assignAttacker).call(this, room, atack);
        __classPrivateFieldGet(this, _RoleAssigner_instances, "m", _RoleAssigner_assignDefender).call(this, room, def);
        console.log(room.players[0]);
    }
}
exports.RoleAssigner = RoleAssigner;
_RoleAssigner_instances = new WeakSet(), _RoleAssigner_nextAssignIndex = function _RoleAssigner_nextAssignIndex(lengthUser, index) {
    if (lengthUser - 1 == index) {
        return 0;
    }
    if (index == 0) {
        return lengthUser - 1;
    }
    return index + 1;
}, _RoleAssigner_getRandomPlayerIndexForFirstMove = function _RoleAssigner_getRandomPlayerIndexForFirstMove(room) {
    return Math.floor(Math.random() * room.players.length);
}, _RoleAssigner_findUserWithDef = function _RoleAssigner_findUserWithDef(room) {
    return room.players.findIndex((elem) => elem.state == "defending");
}, _RoleAssigner_roleDistributor = function _RoleAssigner_roleDistributor(lengthUser, index) {
    let indexRole = {
        atack: index - 1,
        def: index,
    };
    if (lengthUser - 1 == index) {
        indexRole.atack = 0;
    }
    if (index == 0) {
        indexRole.atack = lengthUser - 1;
    }
    return indexRole;
}, _RoleAssigner_assignAttacker = function _RoleAssigner_assignAttacker(room, atack) {
    room.players[atack].state = "attacking";
}, _RoleAssigner_assignDefender = function _RoleAssigner_assignDefender(room, def) {
    room.players[def].state = "defending";
};
