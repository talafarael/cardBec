import { IRoom } from "../../Room";

interface INotifyUser {
  sendNotification(room: IRoom, action: string): void;
}
export default INotifyUser;
