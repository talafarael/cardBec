import { WebSocket } from "ws";
import { IPlayers, IUser } from "../../Room";
import { IResponseMessage } from "../../Type/messageSend";
import SendMessage from "./SendMessage";
describe("JoinMessage", () => {
  it("should send a properly formatted message via WebSocket", () => {
    const mockWebSocket = {
      send: jest.fn(),
    } as unknown as jest.Mocked<WebSocket>;
    const user: IUser = {
      session: "1234",
      hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
      id: 1,
      allowsWriteToPm: true,
      username: "tst",
      firstName: "Test",
    };
    const player: IPlayers = {
      user: user,
      card: [],
      ws: {} as WebSocket,
      state: "",
      startGameState: false,
      passState: false,
    };
    const message: IResponseMessage = {
      session: "",
      action: "",
      players: [],
      roomId: "",
      you: player,
      cardsOnTable: [],
      trump: null,
      pass: [],
      passState: false,
      cardsOnTableCount: 0,
    };
    const sendMessage = new SendMessage();
    sendMessage.JoinMessage(message, mockWebSocket);
    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(message));
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1);
  });
});
