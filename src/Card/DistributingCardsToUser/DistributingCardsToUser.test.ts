import { WebSocket } from "ws";

import { DistributingCardsToUser } from "./DistributingCardsToUser";
import { ICard, IPlayers, IUser } from "../../Room";
const user: IUser = {
  session: "1234",
  hash: "c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
  id: 1,
  allowsWriteToPm: true,
  username: "tst",
  firstName: "Test",
};
const cards: ICard[] = [
  { rank: "6", suit: "hearts" },
  { rank: "7", suit: "hearts" },
  { rank: "8", suit: "hearts" },
] as unknown as ICard[];
describe("DistributingCardsToUser", () => {
  it("must fill user card", () => {
    const player: IPlayers = {
      user: user,
      card: [],
      ws: {} as WebSocket,
      state: "",
      startGameState: true,
      passState: false,
    };
    const distributingCardsToUser = new DistributingCardsToUser();
    distributingCardsToUser.distributeCards(cards, player);

    expect(cards).toEqual([]);
    expect(player.card).toEqual([
      { rank: "8", suit: "hearts" },
      { rank: "7", suit: "hearts" },
      { rank: "6", suit: "hearts" },
    ] as unknown as ICard[]);
  });
});
