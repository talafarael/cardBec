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
var _UserPublisher_userManager;
Object.defineProperty(exports, "__esModule", { value: true });
class UserPublisher {
    constructor(userManager) {
        _UserPublisher_userManager.set(this, void 0);
        __classPrivateFieldSet(this, _UserPublisher_userManager, userManager, "f");
    }
    mapPlayersToPublish(users) {
        const userPublish = [];
        users.forEach((elem) => {
            userPublish.push(__classPrivateFieldGet(this, _UserPublisher_userManager, "f").transformedPlayerPublisher(elem));
        });
        return userPublish;
    }
}
_UserPublisher_userManager = new WeakMap();
exports.default = UserPublisher;
