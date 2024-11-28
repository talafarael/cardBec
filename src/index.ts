import WebSocket, { Server /* etc */ } from "ws";

import { v4 as uuidv4 } from "uuid";
import { parseInitData } from "@telegram-apps/sdk-react";
import { hash } from "crypto";
import { cardData } from "./card.data";

import { RoomJoin } from "./Action/RoomJoin";
import { ICard, IData, Rooms } from "./Room";
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
import { UserReadinessCheck } from "./classWorkWithUser/UserReadinessCheck/UserReadinessCheck";
import { MixCards } from "./Card/MixCard/MixCard";
import { SimpleCardDealer } from "./Card/SimpleCardDealer/SimpleCardDealer";
import { DistributingCardsToUser } from "./Card/DistributingCardsToUser/DistributingCardsToUser";
import { StartGame } from "./GameEvent/StartGame/StartGame";
import { RoomStater } from "./Room/RoomStater/RoomStater";
import { CheckStateRoom } from "./Room/CheckStateRoom/CheckStateRoom";
import { RoleAssigner } from "./Role/RoleAssigner/RoleAssigner";
import { UserAttackAction } from "./Action/UserAttackAction/UserAttackAction";
import { UserChakeState } from "./classWorkWithUser/UserChakeState/UserChakeState";
import { CheckCardInUser } from "./Card/CheckCardInUser/CheckCardInUser";
import { CheckCardOnTable } from "./Card/CheckCardOnTable/CheckCardOnTable";
import { CardOnTable } from "./Card/CardOnTable/CardOnTable";
import { UserCardRemove } from "./classWorkWithUser/UserCardRemove/UserCardRemove";
const wss = new WebSocket.Server({ port: 8080 });
const messageError = (message: string) => {
  return { status: "error", message: message };
};

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
        console.log("Join");
        const managerRoom = new ManagerRoom();
        const userManager = new UserManager();
        const UserFindIndexInRoom = new UserFindRoom();
        const userParser = new UserParser();
        const responseFactory = new ResponseFactory();
        const userPublisher = new UserPublisher(userManager);
        const messageRecipientFilter = new MessageRecipientFilter();
        const sendMessage = new SendMessage();
        const checkStateRoom = new CheckStateRoom();
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
          notifyUser,
          checkStateRoom
        );

        room.joinRoom(data);
        // rooms = room.rooms;

        break;
      }
      case "start": {
        console.log("start");
        const managerRoom = new ManagerRoom();
        const userManager = new UserManager();
        const UserFindIndexInRoom = new UserFindRoom();
        const userParser = new UserParser();
        const responseFactory = new ResponseFactory();
        const userChangeStartGame = new UserChangeStartGame();
        const userPublisher = new UserPublisher(userManager);
        const messageRecipientFilter = new MessageRecipientFilter();
        const sendMessage = new SendMessage();
        const checkStateRoom = new CheckStateRoom();
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
          notifyUser,
          checkStateRoom
        );
        userReadyAction.UserReady(data);
        StartGameFn(data);
        break;
      }
      case "attack": {
        console.log("attack");
        Attack(data);
        break;
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
function StartGameFn(data: IData) {
  const userReadinessCheck = new UserReadinessCheck();
  const managerRoom = new ManagerRoom();
  const userManager = new UserManager();
  const UserFindIndexInRoom = new UserFindRoom();
  const userParser = new UserParser();
  const responseFactory = new ResponseFactory();
  const mixCards = new MixCards();
  const distributingCardsToUser = new DistributingCardsToUser();
  const simpleCardDealer = new SimpleCardDealer(distributingCardsToUser);
  const userPublisher = new UserPublisher(userManager);
  const messageRecipientFilter = new MessageRecipientFilter();
  const sendMessage = new SendMessage();
  const roomStater = new RoomStater();
  const checkStateRoom = new CheckStateRoom();
  const notifyUser = new NotifyUser(
    responseFactory,
    userPublisher,
    messageRecipientFilter,
    sendMessage
  );
  const roleAssigner = new RoleAssigner();
  const startGame = new StartGame(
    userReadinessCheck,
    rooms,
    mixCards,
    simpleCardDealer,
    notifyUser,
    roomStater,
    checkStateRoom,
    roleAssigner
  );
  startGame.StartGame(data);
}
function Attack(data: IData) {
  const managerRoom = new ManagerRoom();
  const userManager = new UserManager();
  const UserFindIndexInRoom = new UserFindRoom();
  const userParser = new UserParser();
  const responseFactorys = new ResponseFactory();
  const userChangeStartGame = new UserChangeStartGame();
  const userPublishers = new UserPublisher(userManager);
  const messageRecipientFilters = new MessageRecipientFilter();
  const sendMessages = new SendMessage();
  const checkStateRoom = new CheckStateRoom();
  const notifyUser = new NotifyUser(
    responseFactorys,
    userPublishers,
    messageRecipientFilters,
    sendMessages
  );

  const userChakeState = new UserChakeState();
  const checkCardInUser = new CheckCardInUser();
  const checkCardOnTable = new CheckCardOnTable();
  const cardOnTable = new CardOnTable();
  const userCardRemove = new UserCardRemove();
  const userAttackAction = new UserAttackAction(
    rooms,
    userParser,
    UserFindIndexInRoom,
    userChangeStartGame,
    notifyUser,
    checkStateRoom,
    userChakeState,
    checkCardInUser,
    checkCardOnTable,
    cardOnTable,
    userCardRemove
  );
  userAttackAction.UserAttack(data);
}
