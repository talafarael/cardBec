import { WebSocket } from "ws";
import { IPlayers, IUser } from "../../Room";
import { UserChangeStartGame } from "./UserChangeStartGame";
const user: IUser = {
  session: "1234",
  hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
  id: 1,
  allowsWriteToPm: true,
  username: "tst",
  firstName: "Test",
};

const player: IPlayers[] = [
  {
    user: user,
    card: [],
    ws: {} as WebSocket,
    state: "",
    startGameState: false,
    passState:false,
  },
  {
    user: user,
    card: [],
    ws: {} as WebSocket,
    state: "",
    startGameState: false,
    passState:false,
  },
];
const resultPlayer: IPlayers[] = [
  {
    user: user,
    card: [],
    ws: {} as WebSocket,
    state: "",
    startGameState: true,
    passState: false,
  },
  {
    user: user,
    card: [],
    ws: {} as WebSocket,
    state: "",
    startGameState: false,
    passState: false,
  },
];
describe("changeState", () => {
  it("Must return true in placeHolder user 1", () => {
    const userChangeStartGame = new UserChangeStartGame();
    expect(userChangeStartGame.changeState(player, 0)).toEqual(resultPlayer);
  });
});
