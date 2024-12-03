import { IPlayerPublisher, IPlayers } from "src/Type";
interface IUserPublisher {
    mapPlayersToPublish(users: IPlayers[]): IPlayerPublisher[];
}
export default IUserPublisher;
