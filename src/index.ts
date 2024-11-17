import WebSocket, { Server /* etc */ } from "ws";

import { v4 as uuidv4 } from "uuid";
import { parseInitData } from "@telegram-apps/sdk-react";
import { hash } from "crypto";
import { cardData } from "./card.data";
import { error } from "console";
import { RoomJoin } from "./RoomJoin";
import { Rooms } from "./Room";
import { ManagerRoom } from "./ManagerRoom";
const wss = new WebSocket.Server({ port: 8080 });
const messageError = (message: string) => {
  return { status: "error", message: message };
};
export interface ICard {
  rank: string;
  suit: string;
}
interface IPlayers {
  user: IUSer;
  card: any[];
  ws: WebSocket;
  state: boolean;
  startGameState: boolean;
}
interface IRoom {
  players: IPlayers[];
  isGameActive: boolean;
  roomId: string;
  card: ICard[];
}
interface IUSer {
  session: string;
  hash: string;
  allowsWriteToPm: boolean | null | undefined;
  firstName: string | null;
  id: number;
  username: string | null | undefined;
}
// const rooms: { [key: string]: IRoom | {} } = {};
let rooms = new Rooms();
wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    const data = JSON.parse(message);
    switch (data.action) {
      case "join": {
        const managerRoom = new ManagerRoom();
        const room = new RoomJoin(rooms, ws, managerRoom);

        room.joinRoom(data);
        // rooms = room.rooms;
        console.log(rooms);
        break;
      }
      case "start": {
        // const parserUser = parseInitData(data.userData);
        // if (!parserUser.user) {
        //   break;
        // }
        // const Room = rooms[data.roomId] as IRoom;
        // if (!Room) {
        //   ws.send("error");
        //   break;
        // }
        // if (Room.players.length == 0) {
        //   break;
        // }
        // const user = parserUser.user;
        // const playerIndex = Room.players.findIndex(
        //   (elem: IPlayers) => elem.user.id == user.id
        // );
        // if (playerIndex == -1) {
        //   ws.send(JSON.stringify(messageError("user is not find")));
        //   break;
        // }
        // (rooms[data.roomId] as IRoom).players[playerIndex].startGameState = !(
        //   rooms[data.roomId] as IRoom
        // ).players[playerIndex].startGameState;
        // let state = true;
        // for (let i = 0; i < (rooms[data.roomId] as IRoom).players.length; i++) {
        //   if (!(rooms[data.roomId] as IRoom).players[i].startGameState) {
        //     state = false;
        //   }
        // }
        // if (state) break;
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
