import { IPlayers } from "../../Room";

interface IUserChakeState {
  ChakeStateAttack(user: IPlayers): boolean;
  ChakeStateDefending(user: IPlayers): boolean;
}
export default IUserChakeState;
