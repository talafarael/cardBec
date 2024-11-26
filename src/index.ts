import WebSocket, { Server /* etc */ } from "ws";

import { v4 as uuidv4 } from "uuid";
import { parseInitData } from "@telegram-apps/sdk-react";
import { hash } from "crypto";
import { cardData } from "./card.data";
import { error } from "console";
import { RoomJoin } from "./Action/RoomJoin";
import { Rooms } from "./Room";
import { ManagerRoom } from "./ManagerRoom";
import { UserManager } from "./classWorkWithUser/UserManager/UserManager";
import { UserFindRoom } from "./classWorkWithUser/UserFindRoom/UserFindRoom";
import { UserParser } from "./classWorkWithUser/UserParser/UserParser";
import { NotifyUser } from "./classMessage/NotifyUser/NotifyUser";
import { ResponseFactory } from "./classMessage/ResponseFactory";
import { UserPublisher } from "./classWorkWithUser/UserPublisher/UserPublisher";
import { MessageRecipientFilter } from "./classWorkWithUser/MessageRecipientFilter/MessageRecipientFilter";
import { SendMessage } from "./classMessage/SendMessage/SendMessage";
import { UserReadyAction } from "./Action/UserReadyAction/UserReadyAction";
import { UserChangeStartGame } from "./classWorkWithUser/UserChangeStartGame/UserChangeStartGame";
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
        const userManager = new UserManager();
        const UserFindIndexInRoom = new UserFindRoom();
        const userParser = new UserParser();
        const responseFactory = new ResponseFactory();

        const userPublisher = new UserPublisher(userManager);
        const messageRecipientFilter = new MessageRecipientFilter();
        const sendMessage = new SendMessage();
        const notifyUser = new NotifyUser(
          responseFactory,
          userPublisher,
          messageRecipientFilter,
          sendMessage
        );
        const room = new RoomJoin(
          rooms,
          ws,
          managerRoom,
          userManager,
          UserFindIndexInRoom,
          userParser,
          notifyUser
        );

        room.joinRoom(data);
        // rooms = room.rooms;
        console.log(rooms);
        break;
      }
      case "start": {
        const managerRoom = new ManagerRoom();
        const userManager = new UserManager();
        const UserFindIndexInRoom = new UserFindRoom();
        const userParser = new UserParser();
        const responseFactory = new ResponseFactory();
        const userChangeStartGame = new UserChangeStartGame();
        const userPublisher = new UserPublisher(userManager);
        const messageRecipientFilter = new MessageRecipientFilter();
        const sendMessage = new SendMessage();
        const notifyUser = new NotifyUser(
          responseFactory,
          userPublisher,
          messageRecipientFilter,
          sendMessage
        );
        const userReadyAction = new UserReadyAction(
          rooms,
          userParser,
          UserFindIndexInRoom,
          userChangeStartGame,
          notifyUser
        );
        userReadyAction.UserReady(data);
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
