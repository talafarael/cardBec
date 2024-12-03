import { IPlayers } from "src/Type";
export interface ITurnDecider {
    determineFirstPlayer(players: IPlayers[]): IPlayers[];
}
export declare class TurnDecider implements ITurnDecider {
    determineFirstPlayer(players: IPlayers[]): IPlayers[];
}
