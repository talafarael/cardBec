import { WebSocket } from "ws";
import { IRoom } from "../../Room";
import { UserFindRoom } from "./UserFindRoom";

const testRoom = {
  players: [
    {
      user: {
        session: "session1",
        hash: "hash1",
        allowsWriteToPm: true,
        firstName: "Alice",
        id: 1,
        username: "alice123",
      },
      card: [
        { rank: "Ace", suit: "Hearts" },
        { rank: "King", suit: "Spades" },
      ],
      ws: {} as WebSocket,
      state: true,
      startGameState: false,
    },
    {
      user: {
        session: "session2",
        hash: "hash2",
        allowsWriteToPm: false,
        firstName: "Bob",
        id: 2,
        username: "bob456",
      },
      card: [
        { rank: "Queen", suit: "Diamonds" },
        { rank: "Jack", suit: "Clubs" },
      ],
      ws: {} as WebSocket,
      state: false,
      startGameState: true,
    },
  ],
  isGameActive: true,
  roomId: "room123",
  card: [
    { rank: "10", suit: "Hearts" },
    { rank: "9", suit: "Spades" },
    { rank: "8", suit: "Diamonds" },
    { rank: "7", suit: "Clubs" },
  ],
  owner: "session1",
};

describe("findPlayerIndexInRoom", () => {
  it("I should get index player", () => {
    const userFindIndexInRoom = new UserFindRoom();

    expect(userFindIndexInRoom.findPlayerIndexInRoom(testRoom, 1)).toEqual(0);
  });
  it("I should get index -1 index (player is not in the room", () => {
    const userFindIndexInRoom = new UserFindRoom();

    expect(userFindIndexInRoom.findPlayerIndexInRoom(testRoom, 3)).toEqual(-1);
  });
});
