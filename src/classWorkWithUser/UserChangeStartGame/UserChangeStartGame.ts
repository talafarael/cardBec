import { IPlayers } from "../../Room";

export interface IUserChangeStartGame {
  changeState(player: IPlayers[], indexUser: number): IPlayers[];
}

export class UserChangeStartGame implements IUserChangeStartGame {
  changeState(player: IPlayers[], indexUser: number) {
    player[indexUser].startGameState = !player[indexUser].startGameState;
    return player;
  }
}
