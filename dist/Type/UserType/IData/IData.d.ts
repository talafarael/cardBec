import { ICard } from "src/Type";
interface IData {
    roomId: string | undefined;
    userData: string;
    action: string;
    card: ICard | null;
}
export default IData;
