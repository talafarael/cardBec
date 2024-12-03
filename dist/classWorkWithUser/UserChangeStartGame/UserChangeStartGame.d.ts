import { IPlayers } from "src/Type";
import IUserChangeStartGame from "./IUserChangeStartGame";
declare class UserChangeStartGame implements IUserChangeStartGame {
    changeState(player: IPlayers[], indexUser: number): IPlayers[];
}
export default UserChangeStartGame;
