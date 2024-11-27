import { IPlayers } from "../../Room";
import { UserChakeState } from "./UserChakeState";

describe("UserChakeState", () => {
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
      state: "defending"
    } as unknown as IPlayers;
    expect(userChakeState.ChakeStateAttack(user)).toBe(false);
  });
});
