import { IPlayers } from "src/Type";
import IUserReadinessCheck from "./IUserReadinessCheck";
declare class UserReadinessCheck implements IUserReadinessCheck {
    UserReadinessCheck(users: IPlayers[]): boolean;
}
export default UserReadinessCheck;
