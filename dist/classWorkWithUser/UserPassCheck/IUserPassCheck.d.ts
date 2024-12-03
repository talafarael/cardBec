import { IPlayers } from "src/Type";
interface IUserPassCheck {
    UserPassCheck(users: IPlayers[]): boolean;
}
export default IUserPassCheck;
