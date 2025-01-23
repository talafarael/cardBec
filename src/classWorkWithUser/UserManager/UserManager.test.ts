import { WebSocket } from "ws";
import { IPlayerPublisher, IPlayers, IUser, IUserTg } from "src/Type";
import UserManager from "./UserManager";

const user: IUser = {
  session: "1234",
  hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
  id: 1,
  allowsWriteToPm: true,
  username: "tst",
  firstName: "Test",
  photoUrl: "test",
};
const mockWebSocket = {
  send: jest.fn(),
} as unknown as jest.Mocked<WebSocket>;
describe("transformUserForRoom", () => {
  it("should be transform to IUser", () => {
    const parserUser: IUserTg = {
      hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
      user: {
        firstName: "Test",
        id: 1,
        allowsWriteToPm: true,
        username: "tst",
        photoUrl: "test",
      },
    };
    const session = "1234";
    const userManager = new UserManager();

    expect(userManager.transformUserForRoom(parserUser, session)).toEqual(user);
  });
});

describe("transformedPlayerPublisher", () => {
  it("should be transform to IPlayer(PublicUser)", () => {
    const player: IPlayers = {
      user: user,
      card: [],
      ws: {} as WebSocket,
      state: "",
      startGameState: false,
      passState: false,
    };

    const palyerPublisher: IPlayerPublisher = {
      id: 1,
      cardCount: 0,
      firstName: "Test",
      startGame: false,
      state: "",
      passState: false,
      photoUrl: "test",
    };
    const userManager = new UserManager();
    expect(userManager.transformedPlayerPublisher(player)).toEqual(
      palyerPublisher,
    );
  });

  it("transformedPlayer", () => {
    const userManager = new UserManager();
    const resultPlayerTransform: IPlayers = {
      state: "",
      startGameState: false,
      user: user,
      card: [],
      ws: mockWebSocket,
      passState: false,
    };
    expect(userManager.transformedPlayer(user, mockWebSocket)).toEqual(
      resultPlayerTransform,
    );
  });
});
