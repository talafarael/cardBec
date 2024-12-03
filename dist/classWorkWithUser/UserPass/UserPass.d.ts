import { IPlayers } from "src/Type";
import IUserPass from "./IUserPass";
declare class UserPass implements IUserPass {
    #private;
    UserPassTrue(user: IPlayers): IPlayers;
    UpdateAllUserPass(users: IPlayers[]): IPlayers[];
}
export default UserPass;
