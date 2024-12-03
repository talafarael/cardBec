import { IPlayers } from "src/Type";
interface IUserChangeStartGame {
    changeState(player: IPlayers[], indexUser: number): IPlayers[];
}
export default IUserChangeStartGame;
