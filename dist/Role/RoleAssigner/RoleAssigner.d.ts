import { IRoom } from "src/Type";
export interface IRoleAssigner {
    startAssignRole(room: IRoom): void;
    nextAssignRole(room: IRoom): void;
}
export declare class RoleAssigner implements IRoleAssigner {
    #private;
    startAssignRole(room: IRoom): void;
    nextAssignRole(room: IRoom): void;
}
