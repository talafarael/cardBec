import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import { parseInitData } from "@telegram-apps/sdk-react";
import { hash } from "crypto";
const wss = new WebSocket.Server({ port: 8080 });
interface IRoom {
  players: { user: IUSer; card: any[]; ws: WebSocket }[];
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

          Room.players[0].ws.send(JSON.stringify(res));
          break;
        }

        // const Room = rooms[data.roomId];
        // if (!Room) {
        //   ws.send("error");
        //   break;
        // }
        // if (!Room.players) {
        //   break;
        // }
        // Room.players[0].ws.send("you user");
        break;
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
