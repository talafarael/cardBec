"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageRecipientFilter {
    filterMessageToUsersExcept(userPublish, id) {
        const filterUserPublish = userPublish.filter((elem) => elem.id != id);
        return filterUserPublish;
    }
}
exports.default = MessageRecipientFilter;
