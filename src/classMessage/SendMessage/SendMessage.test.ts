import { WebSocket } from "ws"
import { IUser } from "../../Room";
import { IResponseMessage } from "../../type/messageSend";
import { SendMessagea } from "./SendMessage";

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
    const message: IResponseMessage = {
      session: "",
      action: "",
      players: [],
      roomId: "",
      you: user,
    };
    const sendMessage = new SendMessagea(mockWebSocket);
    sendMessage.JoinMessage(message);
    expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify(message));
    expect(mockWebSocket.send).toHaveBeenCalledTimes(1);
  });
});
