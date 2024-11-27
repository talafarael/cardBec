import { WebSocket } from "ws";
import { IPlayers, IUser } from "../../Room";
import { UserReadinessCheck } from "./UserReadinessCheck";
const user: IUser = {
  session: "1234",
  hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
  id: 1,
  allowsWriteToPm: true,
  username: "tst",
  firstName: "Test",
};
describe("UserReadinessCheck", () => {
  it("must return true", () => {
    const players: IPlayers[] = [
      {
        user: user,
        card: [],
        ws: {} as WebSocket,
        state: "",
        startGameState: true,
      },
      {
        user: user,
        card: [],
        ws: {} as WebSocket,
        state: "",
        startGameState: true,
      },
    ];
    const userReadinessCheck = new UserReadinessCheck();
    expect(userReadinessCheck.UserReadinessCheck(players)).toBe(true);
  });
  it("must return false", () => {
    const players: IPlayers[] = [
      {
        user: user,
        card: [],
        ws: {} as WebSocket,
        state: "",
        startGameState: true,
      },
      {
        user: user,
        card: [],
        ws: {} as WebSocket,
        state: "",
        startGameState: false,
      },
    ];
    const userReadinessCheck = new UserReadinessCheck();
    expect(userReadinessCheck.UserReadinessCheck(players)).toBe(false);
  });
});
