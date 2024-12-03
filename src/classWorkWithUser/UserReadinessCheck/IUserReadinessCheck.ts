import { IPlayers } from "src/Type";

interface IUserReadinessCheck {
  UserReadinessCheck(users: IPlayers[]): boolean;
}
export default IUserReadinessCheck;
