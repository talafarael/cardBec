"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GrabState {
    checkGrabState(room) {
        return room.GrabState;
    }
    changeGrabStateFalse(room) {
        room.GrabState = false;
        return room;
    }
    changeGrabStateTrue(room) {
        room.GrabState = true;
        return room;
    }
}
exports.default = GrabState;
