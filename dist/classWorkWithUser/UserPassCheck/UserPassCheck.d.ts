import { IPlayers } from "src/Type";
import IUserPassCheck from "./IUserPassCheck";
export declare class UserPassCheck implements IUserPassCheck {
    UserPassCheck(users: IPlayers[]): boolean;
}
export default UserPassCheck;
