import { IPlayers } from "src/Type";
import UserPass from "./UserPass";

describe("UserPass", () => {
  it("should be retrun true with user", () => {
    const user: IPlayers = {
      passState: false,
    } as unknown as IPlayers;
    const userPass = new UserPass();
    const res = userPass.UserPassTrue(user);
    expect(res.passState).toBe(true);
  });
});
describe("UpdateAllUserPass", () => {
  it("should be retrun true with user", () => {
    const user: IPlayers = {
      passState: true,
    } as unknown as IPlayers;
    const users = [user, user];
    const userPass = new UserPass();
    const res = userPass.UpdateAllUserPass(users);
    expect(res[0].passState).toBe(false);
    expect(res[1].passState).toBe(false);
  });
});
