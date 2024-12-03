import { IUserTg } from "src/Type";
import IUserParser from "./IUserParser";
declare class UserParser implements IUserParser {
    userParser(user: string): IUserTg;
}
export default UserParser;
