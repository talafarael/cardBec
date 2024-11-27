import { WebSocket, WebSocketServer } from "ws";
import { IPlayers, IUser } from "../../Room";
import { IUserTg, UserManager } from "./UserManager";
import { IPlayerPublisher } from "../../classMessage/ResponseFactory";

const user: IUser = {
  session: "1234",
  hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
  id: 1,
  allowsWriteToPm: true,
  username: "tst",
  firstName: "Test",
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
      },
    };
    const session = "1234";
    const userManager = new UserManager();

    expect(userManager.transformUserForRoom(parserUser, session)).toEqual(user);
  });
});

describe("transformedPlayerPublisher", () => {
  it("should be transform to IPlayer(PublicUser)", () => {
    const wss = new WebSocket.Server({ port: 8080 });
    wss.on("connection", (ws: WebSocket) => {
      try {
        const player: IPlayers = {
          user: user,
          card: [],
          ws: ws,
          state: "",
          startGameState: false,
        };

        const palyerPublisher: IPlayerPublisher = {
          id: 1,
          cardCount: 0,
          firstName: "Test",
          startGame: false,
          state: "",
        };
        const userManager = new UserManager();
        expect(userManager.transformedPlayerPublisher(player)).toEqual(
          palyerPublisher
        );
        ws.on("close", () => {
          console.log("Client disconnected");
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  it("transformedPlayer", () => {
    const userManager = new UserManager();
    const resultPlayerTransform: IPlayers = {
      state: "",
      startGameState: false,
      user: user= ,l
      card: [],
      ws: mockWebSocket,
    };
    expect(userManager.transformedPlayer(user, mockWebSocket)).toEqual(
      resultPlayerTransform
    );
  });
});
