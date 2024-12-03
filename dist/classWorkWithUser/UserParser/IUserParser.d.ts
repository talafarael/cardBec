import { IUserTg } from "src/Type";
interface IUserParser {
    userParser(user: string): IUserTg;
}
export default IUserParser;
