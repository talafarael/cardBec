import { IRoom } from "src/Type";

interface IRoleAssigner {
  startAssignRole(room: IRoom): void;
  nextAssignRole(room: IRoom): void;
  SkiAssignRole(room: IRoom): IRoom;
}

export default IRoleAssigner;
