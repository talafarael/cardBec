import { IPlayers } from "src/Type";
interface IUserPass {
    UserPassTrue(user: IPlayers): IPlayers;
    UpdateAllUserPass(users: IPlayers[]): IPlayers[];
}
export default IUserPass;
