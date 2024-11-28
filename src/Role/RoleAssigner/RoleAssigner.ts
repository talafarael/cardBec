import { IPlayers, IRoom } from "../../Room";

export interface IRoleAssigner {
  startAssignRole(room: IRoom): void;
}
export class RoleAssigner implements IRoleAssigner {
  startAssignRole(room: IRoom) {
    const index = this.#getRandomPlayerIndexForFirstMove(room);
    const { atack, def } = this.#roleDistributor(room.players.length, index);
    this.#assignAttacker(room, atack);
    this.#assignDefender(room, def);
  }
  #getRandomPlayerIndexForFirstMove(room: IRoom): number {
    return Math.floor(Math.random() * room.players.length );
  }

  #roleDistributor(lengthUser: number, index: number) {
    let indexRole = {
      atack: index - 1,
      def: index,
    };
    if (lengthUser - 1 == index) {
      indexRole.atack = 0;
    }
    if (index == 0) {
      indexRole.atack = lengthUser - 1;
    }
    
    return indexRole;


  }
  #assignAttacker(room: IRoom, atack: number) {
    room.players[atack].state = "attacking";
  }
  #assignDefender(room: IRoom, def: number) {
    room.players[def].state = "defending";
  }
}
