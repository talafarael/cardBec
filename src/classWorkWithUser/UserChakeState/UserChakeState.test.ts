import { IPlayers } from "../../Room";
import { UserChakeState } from "./UserChakeState";

describe("UserChakeState attack", () => {
  it("should be retrun true", () => {
    const userChakeState = new UserChakeState();
    const user: IPlayers = {
      state: "attacking",
    } as unknown as IPlayers;
    expect(userChakeState.ChakeStateAttack(user)).toBe(true);
  });

  it("should be retrun false", () => {
    const userChakeState = new UserChakeState();
    const user: IPlayers = {
      state: "defending",
    } as unknown as IPlayers;
    expect(userChakeState.ChakeStateAttack(user)).toBe(false);
  });
});

describe("UserChakeState def", () => {
  it("should be retrun true", () => {
    const userChakeState = new UserChakeState();
    const user: IPlayers = {
      state: "defending",
    } as unknown as IPlayers;
    expect(userChakeState.ChakeStateDefending(user)).toBe(true);
  });

  it("should be retrun false", () => {
    const userChakeState = new UserChakeState();
    const user: IPlayers = {
      state: "attacking",
    } as unknown as IPlayers;
    expect(userChakeState.ChakeStateDefending(user)).toBe(false);
  });
});
