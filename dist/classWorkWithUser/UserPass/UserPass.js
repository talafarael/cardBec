"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UserPass_instances, _UserPass_UserPassFalse;
Object.defineProperty(exports, "__esModule", { value: true });
class UserPass {
    constructor() {
        _UserPass_instances.add(this);
    }
    UserPassTrue(user) {
        user.passState = true;
        return user;
    }
    UpdateAllUserPass(users) {
        users.forEach((elem) => {
            __classPrivateFieldGet(this, _UserPass_instances, "m", _UserPass_UserPassFalse).call(this, elem);
        });
        return users;
    }
}
_UserPass_instances = new WeakSet(), _UserPass_UserPassFalse = function _UserPass_UserPassFalse(user) {
    user.passState = false;
};
exports.default = UserPass;
