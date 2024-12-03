import { IPlayers } from "src/Type";

interface IUserChakeState {
  ChakeStateAttack(user: IPlayers): boolean;
  ChakeStateDefending(user: IPlayers): boolean;
}
export default IUserChakeState;
