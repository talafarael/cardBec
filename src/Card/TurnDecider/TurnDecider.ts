import { IPlayers } from "../../Room";
export interface ITurnDecider {
  determineFirstPlayer(players: IPlayers[]): IPlayers[];
}
export class TurnDecider implements ITurnDecider {
  determineFirstPlayer(players: IPlayers[]) {
    const firstPlayerIndex = Math.floor(Math.random() * players.length);
    // players[firstPlayerIndex].state = true;
    return players;
  }
}
