import { IPlayers, IRoom } from "../../Room";
import { CheckStateRoom } from "./CheckStateRoom";

describe("CheckStateGame", () => {
  it("should be retrun true", () => {
    const checkStateRoom = new CheckStateRoom();
    const room: IRoom = {
      isGameActive: true,
    } as unknown as IRoom;
    expect(checkStateRoom.checkStateGame(room)).toBe(true);
  });

  it("should be retrun false", () => {
    const checkStateRoom = new CheckStateRoom();
    const room: IRoom = {
      isGameActive: false,
    } as unknown as IRoom;
    expect(checkStateRoom.checkStateGame(room)).toBe(false);
  });
});

describe("CheckStateGame", () => {
  it("should be retrun true because user more than 1", () => {
    const checkStateRoom = new CheckStateRoom();
    const player: IPlayers = {} as unknown as IPlayers;

    const room: IRoom = {
      isGameActive: true,
      players: [player, player],
    } as unknown as IRoom;
    expect(checkStateRoom.checkUserCount(room)).toBe(true);
  });
});

describe("CheckStateGame", () => {
  it("should be retrun false because user 1 ", () => {
    const checkStateRoom = new CheckStateRoom();
    const player: IPlayers = {} as unknown as IPlayers;

    const room: IRoom = {
      isGameActive: true,
      players: [ player],
    } as unknown as IRoom;
    expect(checkStateRoom.checkUserCount(room)).toBe(false);
  });
});