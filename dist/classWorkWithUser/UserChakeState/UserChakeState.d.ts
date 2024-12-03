import { IPlayers } from "src/Type";
import IUserChakeState from "./IUserChakeState";
declare class UserChakeState implements IUserChakeState {
    ChakeStateAttack(user: IPlayers): boolean;
    ChakeStateDefending(user: IPlayers): boolean;
}
export default UserChakeState;
