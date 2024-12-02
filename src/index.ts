import WebSocket from "ws";
import { Rooms } from "./Room";
import { MessageRecipientFilter, UserCardRemove, UserChakeState, UserChangeStartGame, UserFindRoom, UserManager, UserParser, UserPass, UserPassCheck, UserPublisher, UserReadinessCheck } from "./classWorkWithUser";
import { ManagerRoom } from "./ManagerRoom";
import { NotifyUser, ResponseFactory, SendMessage } from "./classMessage";
import { CheckStateRoom } from "./Room/CheckStateRoom/CheckStateRoom";
import { GrabCardAction, RoomJoin, UserAddCardAction, UserAttackAction, UserPassAction, UserReadyAction } from "./Action";
import { IData } from "./Type";
import { StartGame } from "./GameEvent/StartGame/StartGame";
import { CardOnTable, CheckCardInUser, CheckCardOnTable, CheckRankOnTable, ComparisonCard, DistributingCardsToUser, MixCards } from "./Card";
import SimpleCardDealer from "./Card/SimpleCardDealer/SimpleCardDealer";
import { RoomStater } from "./Room/RoomStater/RoomStater";
import { RoleAssigner } from "./Role/RoleAssigner/RoleAssigner";
import { IDefData, UserDeffitAction } from "./Action/UserDeffitAction/UserDeffitAction";
import { CheckPassUser } from "./GameEvent/CheckPassUser/CheckPassUser";


const wss = new WebSocket.Server({ port: 8080 });
const messageError = (message: string) => {
  return { status: "error", message: message };
};

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
