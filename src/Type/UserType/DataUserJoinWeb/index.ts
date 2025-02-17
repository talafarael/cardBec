import { ICard, IUserTg } from "src/Type"
interface IDataUserJoinWeb {
  roomId: string | undefined;
  userData: IUserTg;
  action: string;
  card: ICard | null;
}
export default IDataUserJoinWeb;
