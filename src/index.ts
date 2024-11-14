import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import { parseInitData } from "@telegram-apps/sdk-react";
import { hash } from "crypto";
const wss = new WebSocket.Server({ port: 8080 });
interface IPlayers {
  user: IUSer;
  card: any[];
  ws: WebSocket;
}
interface IRoom {
  players: IPlayers[];
  isGameActive: boolean;
  roomId: string;
}
interface IUSer {
  session: string;
  hash: string;
  allowsWriteToPm: boolean | null | undefined;
  firstName: string | null;
  id: number;
  username: string | null | undefined;
}
const rooms: { [key: string]: IRoom | {} } = {};
wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    const data = JSON.parse(message);
    switch (data.action) {
      case "join":
        //check user to room
        if (!data.roomId) {
          const RoomId = uuidv4();
          const session = uuidv4();
          const parserUser = parseInitData(data.userData);
          if (!parserUser.user) {
            break;
          }
          console.log(data);
          const user: IUSer = {
            session: session,
            hash: parserUser.hash,
            id: parserUser.user.id,
            allowsWriteToPm: parserUser.user.allowsWriteToPm,
            username: parserUser.user.username,
            firstName: parserUser.user.firstName,
          };

          const Room: IRoom = {
            players: [],
            roomId: RoomId,
            isGameActive: false,
          };
          Room.players.push({
            user: user,
            card: [],
            ws: ws,
          });
          rooms[RoomId] = Room;
          const res = {
            session: session,
            action: "join",
            Room: Room,
            roomId: RoomId,
          };

          ws.send(JSON.stringify(res));
          break;
        }

        const Room = rooms[data.roomId] as IRoom;
        if (!Room) {
          ws.send("error");
          break;
        }
        if (Room.players.length == 0) {
          break;
        }
        const parserUser = parseInitData(data.userData);
        if (!parserUser.user) {
          break;
        }
        const user = parserUser.user;
        const playerIndex = Room.players.findIndex(
          (elem: IPlayers) => elem.user.id == user.id
        );
        (rooms[data.roomId] as IRoom).players[playerIndex].ws = ws;
        (rooms[data.roomId] as IRoom).players[playerIndex].ws = ws;
        const session = uuidv4();
        const res = {
          session: session,
          action: "join",
          Room: Room,
          roomId: data.roomId,
        };
        ws.send(JSON.stringify(res));
        break;
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
