import { IPlayers } from "src/Type";
import IUserChangeStartGame from "./IUserChangeStartGame";

class UserChangeStartGame implements IUserChangeStartGame {
  changeState(player: IPlayers[], indexUser: number) {
    player[indexUser].startGameState = !player[indexUser].startGameState;
    return player;
  }
}
export default UserChangeStartGame;
