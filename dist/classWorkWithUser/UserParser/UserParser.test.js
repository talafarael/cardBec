"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserParser_1 = require("./UserParser");
const sdk_react_1 = require("@telegram-apps/sdk-react");
jest.mock("@telegram-apps/sdk-react", () => ({
    parseInitData: jest.fn(),
}));
beforeEach(() => {
    jest.clearAllMocks();
});
const parserUser = {
    hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
    user: {
        firstName: "Test",
        id: 1,
        allowsWriteToPm: true,
        lastName: "Testenko",
        username: "tst",
    },
};
const hashUser = "AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A1%2C%22first_name%22%3A%22Test%22%2C%22last_name%22%3A%22Testenko%22%2C%22username%22%3A%22tst%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D&auth_date=1662771648&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2";
describe("UserParser", () => {
    it("should correctly parse valid user data", () => {
        sdk_react_1.parseInitData.mockReturnValue(parserUser);
        const userParser = new UserParser_1.UserParser();
        const res = userParser.userParser(hashUser);
        expect(res).toEqual(parserUser);
        expect(sdk_react_1.parseInitData).toHaveBeenCalledTimes(1);
        expect(sdk_react_1.parseInitData).toHaveBeenCalledWith(hashUser);
    });
    it("should throw an error for invalid user data", () => {
        sdk_react_1.parseInitData.mockReturnValue({});
        const userParser = new UserParser_1.UserParser();
        expect(() => userParser.userParser(hashUser)).toThrow("Invalid user data");
        expect(sdk_react_1.parseInitData).toHaveBeenCalledTimes(1);
    });
});
