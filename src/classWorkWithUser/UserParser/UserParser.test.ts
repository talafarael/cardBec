import UserParser from "./UserParser";
import { parseInitData } from "@telegram-apps/sdk-react";

// Mock the `parseInitData` function
jest.mock("@telegram-apps/sdk-react", () => ({
  parseInitData: jest.fn(),
}));

describe("UserParser", () => {
  let userParser: UserParser;

  beforeEach(() => {
    userParser = new UserParser();
  });

  it("should return parsed user data when valid user data is provided", () => {
    const mockUser = '{"user": {"id": 1, "name": "John Doe"}}';
    const parsedData = { user: { id: 1, name: "John Doe" } };

    // Mock the parseInitData function
    (parseInitData as jest.Mock).mockReturnValue(parsedData);

    const result = userParser.userParser(mockUser);

    expect(result).toEqual(parsedData);
    expect(parseInitData).toHaveBeenCalledWith(mockUser);
  });

  it("should throw an error when invalid user data is provided", () => {
    const mockInvalidUser = '{"name": "John Doe"}'; // No 'user' property

    (parseInitData as jest.Mock).mockReturnValue({});

    expect(() => userParser.userParser(mockInvalidUser)).toThrow(
      "Invalid user data"
    );
  });
});
