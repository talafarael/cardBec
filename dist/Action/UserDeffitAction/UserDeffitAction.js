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
var _UserDeffitAction_rooms, _UserDeffitAction_userParser, _UserDeffitAction_userFindRoom, _UserDeffitAction_notifyUser, _UserDeffitAction_userChakeState, _UserDeffitAction_checkState, _UserDeffitAction_checkCardInUser, _UserDeffitAction_cardOnTable, _UserDeffitAction_userCardRemove, _UserDeffitAction_comparisonCard, _UserDeffitAction_userPass;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeffitAction = void 0;
class UserDeffitAction {
    constructor(config) {
        _UserDeffitAction_rooms.set(this, void 0);
        _UserDeffitAction_userParser.set(this, void 0);
        _UserDeffitAction_userFindRoom.set(this, void 0);
        _UserDeffitAction_notifyUser.set(this, void 0);
        _UserDeffitAction_userChakeState.set(this, void 0);
        _UserDeffitAction_checkState.set(this, void 0);
        _UserDeffitAction_checkCardInUser.set(this, void 0);
        _UserDeffitAction_cardOnTable.set(this, void 0);
        _UserDeffitAction_userCardRemove.set(this, void 0);
        _UserDeffitAction_comparisonCard.set(this, void 0);
        _UserDeffitAction_userPass.set(this, void 0);
        __classPrivateFieldSet(this, _UserDeffitAction_rooms, config.rooms, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_userParser, config.userParser, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_userFindRoom, config.userFindRoom, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_notifyUser, config.notifyUser, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_checkState, config.checkStateRoom, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_userChakeState, config.userChakeState, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_checkCardInUser, config.checkCardInUser, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_cardOnTable, config.cardOnTable, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_userCardRemove, config.userCardRemove, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_comparisonCard, config.comparisonCard, "f");
        __classPrivateFieldSet(this, _UserDeffitAction_userPass, config.userPass, "f");
    }
    UserDeffitAction(data) {
        if (!data.roomId || !data.card) {
            return;
        }
        let Room = __classPrivateFieldGet(this, _UserDeffitAction_rooms, "f").getRoom(data.roomId);
        const parserUser = __classPrivateFieldGet(this, _UserDeffitAction_userParser, "f").userParser(data.userData);
        const indexUser = __classPrivateFieldGet(this, _UserDeffitAction_userFindRoom, "f").findPlayerIndexInRoom(Room, parserUser.user.id);
        //state room in game
        console.log(1);
        if (!__classPrivateFieldGet(this, _UserDeffitAction_checkState, "f").checkStateGame(Room)) {
            return;
        }
        if (indexUser === -1) {
            return;
        }
        const user = Room.players[indexUser];
        if (!__classPrivateFieldGet(this, _UserDeffitAction_userChakeState, "f").ChakeStateDefending(user)) {
            return;
        }
        const indexCard = __classPrivateFieldGet(this, _UserDeffitAction_checkCardInUser, "f").CheckCardInUser(user, data.card);
        if (indexCard == -1) {
            return;
        }
        const indexTable = __classPrivateFieldGet(this, _UserDeffitAction_checkCardInUser, "f").CheckCardInAtackTable(Room.cardsOnTable, data.attacCard);
        console.log(2);
        if (indexTable == -1) {
            return;
        }
        console.log(4);
        if (!__classPrivateFieldGet(this, _UserDeffitAction_comparisonCard, "f").ComparisonCard(data.card, data.attacCard, Room.trump)) {
            return;
        }
        console.log(3);
        Room.cardsOnTable = __classPrivateFieldGet(this, _UserDeffitAction_cardOnTable, "f").PutCardDeff(data.card, Room.cardsOnTable, indexTable);
        Room.players[indexUser].card = __classPrivateFieldGet(this, _UserDeffitAction_userCardRemove, "f").CardRemove(user.card, indexCard);
        Room.players = __classPrivateFieldGet(this, _UserDeffitAction_userPass, "f").UpdateAllUserPass(Room.players);
        __classPrivateFieldGet(this, _UserDeffitAction_rooms, "f").saveRoom(data.roomId, Room);
        console.log(5);
        __classPrivateFieldGet(this, _UserDeffitAction_notifyUser, "f").sendNotification(Room, "def");
    }
}
exports.UserDeffitAction = UserDeffitAction;
_UserDeffitAction_rooms = new WeakMap(), _UserDeffitAction_userParser = new WeakMap(), _UserDeffitAction_userFindRoom = new WeakMap(), _UserDeffitAction_notifyUser = new WeakMap(), _UserDeffitAction_userChakeState = new WeakMap(), _UserDeffitAction_checkState = new WeakMap(), _UserDeffitAction_checkCardInUser = new WeakMap(), _UserDeffitAction_cardOnTable = new WeakMap(), _UserDeffitAction_userCardRemove = new WeakMap(), _UserDeffitAction_comparisonCard = new WeakMap(), _UserDeffitAction_userPass = new WeakMap();
