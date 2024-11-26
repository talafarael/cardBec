import { WebSocket } from "ws";
import { IPlayers, IUser } from "../../Room";
import { IUserManager } from "../UserManager/UserManager";
import { UserPublisher } from "./UserPublisher";
import { IPlayerPublisher } from "../../classMessage/ResponseFactory";

const user: IUser = {
  session: "1234",
  hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
  id: 1,
  allowsWriteToPm: true,
  username: "tst",
  firstName: "Test",
};

const userPublish = {
  id: 1,
  cardCount: 0,
  firstName: "Test",
  startGame: false,
};

describe("mapPlayersToPublish", () => {
  it("", () => {
    const mockUserManager = {
      transformedPlayerPublisher: jest.fn().mockReturnValue(userPublish),
    } as unknown as IUserManager;
    const players: IPlayers[] = [
      {
        user: user,
        card: [],
        ws: {} as WebSocket,
        state: false,
        startGameState: false,
      },
    ];

    const userPublisher = new UserPublisher(mockUserManager);

    expect(userPublisher.mapPlayersToPublish(players)).toEqual([userPublish]);
  });
});
