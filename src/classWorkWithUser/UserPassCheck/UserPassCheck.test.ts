import { IPlayers } from "../../Room";
import { UserPassCheck } from "./UserPassCheck";

describe("UserPassCheck", () => {
  it("should be retrun true ", () => {
    const user: IPlayers = {
      passState: true,
    } as unknown as IPlayers;
    const users = [user, user];
    const userPassCheck = new UserPassCheck();
    expect(userPassCheck.UserPassCheck(users)).toBe(true);
  });
  it("should be retrun false ", () => {
    const user: IPlayers = {
      passState: true,
    } as unknown as IPlayers;
    const user2: IPlayers = {
      passState: false,
    } as unknown as IPlayers;
    const users = [user, user2];
    const userPassCheck = new UserPassCheck();
    expect(userPassCheck.UserPassCheck(users)).toBe(false);
  });
});
