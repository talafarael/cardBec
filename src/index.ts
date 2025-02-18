import WebSocket from "ws";
import {
  MessageRecipientFilter,
  UserCardRemove,
  UserChakeState,
  UserChangeStartGame,
  UserFindRoom,
  UserManager,
  UserParser,
  UserPass,
  UserPassCheck,
  UserPublisher,
  UserReadinessCheck,
} from "./classWorkWithUser";
import { ManagerRoom } from "./ManagerRoom";
import * as http from "http"
import { v4 as uuidv4 } from "uuid";
import { NotifyUser, ResponseFactory, SendMessage } from "./classMessage";
import {
  GrabCardAction,
  RoomJoin,
  UserAddCardAction,
  UserAttackAction,
  UserPassAction,
  UserReadyAction,
} from "./Action";
import { IData } from "./Type";
import {
  CardOnTable,
  CheckCardInUser,
  CheckCardOnTable,
  CheckRankOnTable,
  ComparisonCard,
  DistributingCardsToUser,
  MixCards,
} from "./Card";
import SimpleCardDealer from "./Card/SimpleCardDealer/SimpleCardDealer";
import { RoleAssigner } from "./Role/RoleAssigner/RoleAssigner";
import {
  IDefData,
  UserDeffitAction,
} from "./Action/UserDeffitAction/UserDeffitAction";
import { CheckPassUser, StartGame } from "./GameEvent";
import { CheckStateRoom, Rooms, RoomStater } from "./Room";

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
    rooms: rooms,
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
    roleAssigner: new RoleAssigner(),
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
    rooms: rooms,
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
    rooms: rooms,
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
    rooms: rooms,
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
    rooms: rooms,
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

const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = "7448678561:AAFtynJEawxUtbGlnBtibcLpeFwmVdw57jQ";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg: any, match: any) => { });

bot.on("message", (msg: any) => {
  const chatId = msg.chat.id;

  console.log(chatId);
  bot.sendMessage(chatId, "Received your message");
});
bot.onText(/\/start/, (msg: any) => {
  const chatId = msg.chat.id;
  const uuid = uuidv4();
  const miniAppLink = `https://t.me/CardFaraBot/card?startapp=${uuid}`;
  const chrome = `https://telegram-mini-card-vpcz-talafaraels-projects.vercel.app/?token=${uuid}`;
  bot.sendMessage(chatId, `Откройте Mini App по ссылке: ${miniAppLink}`);
  bot.sendMessage(chatId, `Откройте Mini App по ссылке: ${chrome}`);
});
bot.onText(/\/start (.+)/, (msg: any, match: any) => {
  const chatId = msg.chat.id;
  const startParam = match[1];

  bot.sendMessage(chatId, `Получен параметр: ${startParam}`);
});



http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8081); 
