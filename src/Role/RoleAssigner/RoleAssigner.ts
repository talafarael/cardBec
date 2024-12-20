import { IRoom } from "src/Type";
import IRoleAssigner from "./IRoleAssigner";

//need return void its bad

export class RoleAssigner implements IRoleAssigner {
  startAssignRole(room: IRoom) {
    const index = this.#getRandomPlayerIndexForFirstMove(room);
    const { atack, def } = this.#roleDistributor(room.players.length, index);
    this.#assignAttacker(room, atack);
    this.#assignDefender(room, def);
  }
  SkiAssignRole(room: IRoom) {
    const indexPreviuosAttack = this.#findUserWithDef(room);
    const index = this.#skipUser(room, indexPreviuosAttack);
    const { atack, def } = this.#roleDistributor(room.players.length, index);
    this.#assignAttacker(room, atack);
    this.#assignDefender(room, def);
    return room;
  }
  nextAssignRole(room: IRoom) {
    const indexPreviuosAttack = this.#findUserWithDef(room);

    const index = this.#nextAssignIndex(
      room.players.length,
      indexPreviuosAttack
    );
    const { atack, def } = this.#roleDistributor(room.players.length, index);

    this.#assignAttacker(room, atack);
    this.#assignDefender(room, def);
    console.log(room.players[0]);
  }
  #nextAssignIndex(lengthUser: number, index: number) {
    if (lengthUser - 1 == index) {
      return 0;
    }
    if (index == 0) {
      return lengthUser - 1;
    }
    return index + 1;
  }
  #skipUser(room: IRoom, indexPreviuosAttack: number) {
    const indexUserHowSkip = this.#nextAssignIndex(
      room.players.length,
      indexPreviuosAttack
    );
    const index = this.#nextAssignIndex(room.players.length, indexUserHowSkip);
    return index;
  }
  #getRandomPlayerIndexForFirstMove(room: IRoom): number {
    return Math.floor(Math.random() * room.players.length);
  }
  #findUserWithDef(room: IRoom): number {
    return room.players.findIndex((elem) => elem.state == "defending");
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
