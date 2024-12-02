import WebSocket from "ws";

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
import { UserChangeStartGame } from "./classWorkWithUser/UserChangeStartGame/UserChangeStartGame";
import { UserReadinessCheck } from "./classWorkWithUser/UserReadinessCheck/UserReadinessCheck";
import { MixCards } from "./Card/MixCard/MixCard";
import { SimpleCardDealer } from "./Card/SimpleCardDealer/SimpleCardDealer";
import { DistributingCardsToUser } from "./Card/DistributingCardsToUser/DistributingCardsToUser";
import { StartGame } from "./GameEvent/StartGame/StartGame";
import { RoomStater } from "./Room/RoomStater/RoomStater";
import { CheckStateRoom } from "./Room/CheckStateRoom/CheckStateRoom";
import { RoleAssigner } from "./Role/RoleAssigner/RoleAssigner";
import { UserChakeState } from "./classWorkWithUser/UserChakeState/UserChakeState";
import { CheckCardInUser } from "./Card/CheckCardInUser/CheckCardInUser";

import {
  IDefData,
  UserDeffitAction,
} from "./Action/UserDeffitAction/UserDeffitAction";
import { ComparisonCard } from "./Card/ComparisonCard/ComparisonCard";
import { CheckRankOnTable } from "./Card/CheckRankOnTable/CheckRankOnTable";
import { UserPass } from "./classWorkWithUser/UserPass/UserPass";
import { CheckPassUser } from "./GameEvent/CheckPassUser/CheckPassUser";
import { UserPassCheck } from "./classWorkWithUser/UserPassCheck/UserPassCheck";
import { RoomJoin, UserReadyAction } from "./Action";
import { CardOnTable, CheckCardOnTable } from "./Card";
import type { IPlayerPublisher } from "./Type";


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
// const roo-ms: { [key: string]: IRoom | {} } = {};
let rooms = new Rooms();
wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    const data = JSON.parse(message);
    switch (data.action) {
      case "join": {
        console.log("Join");
        const managerRoom = new ManagerRoom();
        const userManager = new UserManager();
        const userFindIndexInRoom = new UserFindRoom();
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

        const room = new RoomJoin({
          rooms,
          ws,
          managerRoom,
          userManager,
          userFindIndexInRoom,
          userParser,
          notifyUser,
          checkStateRoom,
        });

        room.joinRoom(data);
        // rooms = room.rooms;

        break;
      }
      case "start": {
        console.log("start");
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
      case "deff": {
        console.log("deff");
        Def(data);
        break;
      }
      case "add": {
        add(data);
        break;
      }
      case "pass": {
        console.log("pas");
        pass(data);
        break;
      }
      case "grab": {
        console.log("grab");
        Grad(data);
        break;
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
function StartGameFn(data: IData) {
  const startGame = new StartGame({
    userReadinessCheck: new UserReadinessCheck(),
    rooms,
    mixCards: new MixCards(),
    simpleCardDealer: new SimpleCardDealer(new DistributingCardsToUser()),
    notifyUser: new NotifyUser(
      new ResponseFactory(),
      new UserPublisher(new UserManager()),
      new MessageRecipientFilter(),
      new SendMessage()
    ),
    roomStater: new RoomStater(),
    checkStateRoom: new CheckStateRoom(),
    roleAssigner: new RoleAssigner(),
  });
  startGame.StartGame(data);
}
function Grad(data: IData) {
  const userManager = new UserManager();
  const responseFactorys = new ResponseFactory();
  const userPublishers = new UserPublisher(userManager);
  const messageRecipientFilters = new MessageRecipientFilter();
  const sendMessages = new SendMessage();
  const distributingCardsToUser = new DistributingCardsToUser();

  const userAddCardAction = new GrabCardAction({
    rooms: new Rooms(),
    userParser: new UserParser(),
    userFindRoom: new UserFindRoom(),
    notifyUser: new NotifyUser(
      responseFactorys,
      userPublishers,
      messageRecipientFilters,
      sendMessages
    ),
    userChakeState: new UserChakeState(),
    checkCardOnTable: new CheckCardOnTable(),
    cardOnTable: new CardOnTable(),
    simpleCardDealer: new SimpleCardDealer(distributingCardsToUser),
    userPass: new UserPass(),
  });
  userAddCardAction.grabAll(data);
}
function Attack(data: IData) {
  const userManager = new UserManager();
  const responseFactorys = new ResponseFactory();

  const userPublishers = new UserPublisher(userManager);
  const messageRecipientFilters = new MessageRecipientFilter();
  const sendMessages = new SendMessage();

  const userAttackAction = new UserAttackAction({
    rooms: new Rooms(),
    userParser: new UserParser(),
    userFindRoom: new UserFindRoom(),
    notifyUser: new NotifyUser(
      responseFactorys,
      userPublishers,
      messageRecipientFilters,
      sendMessages
    ),
    checkStateRoom: new CheckStateRoom(),
    userChakeState: new UserChakeState(),
    checkCardInUser: new CheckCardInUser(),
    checkCardOnTable: new CheckCardOnTable(),
    cardOnTable: new CardOnTable(),
    userCardRemove: new UserCardRemove(),
    userPass: new UserPass(),
  });
  userAttackAction.UserAttack(data);
}
function Def(data: IDefData) {
  const userManager = new UserManager();
  const responseFactorys = new ResponseFactory();
  const userPublishers = new UserPublisher(userManager);
  const messageRecipientFilters = new MessageRecipientFilter();
  const sendMessages = new SendMessage();

  const userDeffitAction = new UserDeffitAction({
    rooms: new Rooms(),
    userParser: new UserParser(),
    userFindRoom: new UserFindRoom(),
    notifyUser: new NotifyUser(
      responseFactorys,
      userPublishers,
      messageRecipientFilters,
      sendMessages
    ),
    checkStateRoom: new CheckStateRoom(),
    userChakeState: new UserChakeState(),
    checkCardInUser: new CheckCardInUser(),
    cardOnTable: new CardOnTable(),
    userCardRemove: new UserCardRemove(),
    comparisonCard: new ComparisonCard(),
    userPass: new UserPass(),
  });
  userDeffitAction.UserDeffitAction(data);
}
const add = (data: IData) => {
  const userManager = new UserManager();
  const responseFactorys = new ResponseFactory();
  const userPublishers = new UserPublisher(userManager);
  const messageRecipientFilters = new MessageRecipientFilter();
  const sendMessages = new SendMessage();

  const userAddCardAction = new UserAddCardAction({
    rooms: new Rooms(),
    userParser: new UserParser(),
    userFindRoom: new UserFindRoom(),
    notifyUser: new NotifyUser(
      responseFactorys,
      userPublishers,
      messageRecipientFilters,
      sendMessages
    ),
    checkStateRoom: new CheckStateRoom(),
    userChakeState: new UserChakeState(),
    checkCardInUser: new CheckCardInUser(),
    checkCardOnTable: new CheckCardOnTable(),
    cardOnTable: new CardOnTable(),
    userCardRemove: new UserCardRemove(),
    checkRankOnTable: new CheckRankOnTable(),
    userPass: new UserPass(),
  });
  userAddCardAction.UserAddCardAction(data);
};
function pass(data: IData) {
  console.log("pass");
  const userManager = new UserManager();
  const UserFindIndexInRoom = new UserFindRoom();
  const userParser = new UserParser();
  const responseFactorys = new ResponseFactory();

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
  const distributingCardsToUser = new DistributingCardsToUser();

  const checkCardOnTable = new CheckCardOnTable();

  const userPass = new UserPass();

  const checkPassUser = new CheckPassUser({
    rooms: new Rooms(),
    userParser: new UserParser(),
    userFindRoom: new UserFindRoom(),
    notifyUser: new NotifyUser(
      responseFactorys,
      userPublishers,
      messageRecipientFilters,
      sendMessages
    ),
    checkStateRoom: new CheckStateRoom(),
    cardOnTable: new CardOnTable(),
    userPassCheck: new UserPassCheck(),
    simpleCardDealer: new SimpleCardDealer(distributingCardsToUser),
    roleAssigner: new RoleAssigner(),
    userPass: new UserPass(),
  });

  const userAddCardAction = new UserPassAction(
    rooms,
    userParser,
    UserFindIndexInRoom,
    notifyUser,
    checkStateRoom,
    checkCardOnTable,
    userPass
  );
  console.log("suka");
  userAddCardAction.UserPassAttacAction(data);
  checkPassUser.CheckPassUser(data);
}
