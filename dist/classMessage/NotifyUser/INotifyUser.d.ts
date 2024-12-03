import { IRoom } from "src/Type";
interface INotifyUser {
    sendNotification(room: IRoom, action: string): void;
}
export default INotifyUser;
