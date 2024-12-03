"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const classWorkWithUser_1 = require("./classWorkWithUser");
const ManagerRoom_1 = require("./ManagerRoom");
const classMessage_1 = require("./classMessage");
const Action_1 = require("./Action");
const Card_1 = require("./Card");
const SimpleCardDealer_1 = __importDefault(require("./Card/SimpleCardDealer/SimpleCardDealer"));
const RoleAssigner_1 = require("./Role/RoleAssigner/RoleAssigner");
const UserDeffitAction_1 = require("./Action/UserDeffitAction/UserDeffitAction");
const GameEvent_1 = require("./GameEvent");
const Room_1 = require("./Room");
const wss = new ws_1.default.Server({ port: 8080 });
const messageError = (message) => {
    return { status: "error", message: message };
};
// const roo-ms: { [key: string]: IRoom | {} } = {};
let rooms = new Room_1.Rooms();
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);
        switch (data.action) {
            case "join": {
                console.log("Join");
                const managerRoom = new ManagerRoom_1.ManagerRoom();
                const userManager = new classWorkWithUser_1.UserManager();
                const userFindIndexInRoom = new classWorkWithUser_1.UserFindRoom();
                const userParser = new classWorkWithUser_1.UserParser();
                const responseFactory = new classMessage_1.ResponseFactory();
                const userPublisher = new classWorkWithUser_1.UserPublisher(userManager);
                const messageRecipientFilter = new classWorkWithUser_1.MessageRecipientFilter();
                const sendMessage = new classMessage_1.SendMessage();
                const checkStateRoom = new Room_1.CheckStateRoom();
                const notifyUser = new classMessage_1.NotifyUser(responseFactory, userPublisher, messageRecipientFilter, sendMessage);
                const room = new Action_1.RoomJoin({
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
                const userManager = new classWorkWithUser_1.UserManager();
                const UserFindIndexInRoom = new classWorkWithUser_1.UserFindRoom();
                const userParser = new classWorkWithUser_1.UserParser();
                const responseFactory = new classMessage_1.ResponseFactory();
                const userChangeStartGame = new classWorkWithUser_1.UserChangeStartGame();
                const userPublisher = new classWorkWithUser_1.UserPublisher(userManager);
                const messageRecipientFilter = new classWorkWithUser_1.MessageRecipientFilter();
                const sendMessage = new classMessage_1.SendMessage();
                const checkStateRoom = new Room_1.CheckStateRoom();
                const notifyUser = new classMessage_1.NotifyUser(responseFactory, userPublisher, messageRecipientFilter, sendMessage);
                const userReadyAction = new Action_1.UserReadyAction(rooms, userParser, UserFindIndexInRoom, userChangeStartGame, notifyUser, checkStateRoom);
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
function StartGameFn(data) {
    const startGame = new GameEvent_1.StartGame({
        userReadinessCheck: new classWorkWithUser_1.UserReadinessCheck(),
        rooms,
        mixCards: new Card_1.MixCards(),
        simpleCardDealer: new SimpleCardDealer_1.default(new Card_1.DistributingCardsToUser()),
        notifyUser: new classMessage_1.NotifyUser(new classMessage_1.ResponseFactory(), new classWorkWithUser_1.UserPublisher(new classWorkWithUser_1.UserManager()), new classWorkWithUser_1.MessageRecipientFilter(), new classMessage_1.SendMessage()),
        roomStater: new Room_1.RoomStater(),
        checkStateRoom: new Room_1.CheckStateRoom(),
        roleAssigner: new RoleAssigner_1.RoleAssigner(),
    });
    startGame.StartGame(data);
}
function Grad(data) {
    const userManager = new classWorkWithUser_1.UserManager();
    const responseFactorys = new classMessage_1.ResponseFactory();
    const userPublishers = new classWorkWithUser_1.UserPublisher(userManager);
    const messageRecipientFilters = new classWorkWithUser_1.MessageRecipientFilter();
    const sendMessages = new classMessage_1.SendMessage();
    const distributingCardsToUser = new Card_1.DistributingCardsToUser();
    const userAddCardAction = new Action_1.GrabCardAction({
        rooms: rooms,
        userParser: new classWorkWithUser_1.UserParser(),
        userFindRoom: new classWorkWithUser_1.UserFindRoom(),
        notifyUser: new classMessage_1.NotifyUser(responseFactorys, userPublishers, messageRecipientFilters, sendMessages),
        userChakeState: new classWorkWithUser_1.UserChakeState(),
        checkCardOnTable: new Card_1.CheckCardOnTable(),
        cardOnTable: new Card_1.CardOnTable(),
        simpleCardDealer: new SimpleCardDealer_1.default(distributingCardsToUser),
        userPass: new classWorkWithUser_1.UserPass(),
    });
    userAddCardAction.grabAll(data);
}
function Attack(data) {
    const userManager = new classWorkWithUser_1.UserManager();
    const responseFactorys = new classMessage_1.ResponseFactory();
    const userPublishers = new classWorkWithUser_1.UserPublisher(userManager);
    const messageRecipientFilters = new classWorkWithUser_1.MessageRecipientFilter();
    const sendMessages = new classMessage_1.SendMessage();
    const userAttackAction = new Action_1.UserAttackAction({
        rooms: rooms,
        userParser: new classWorkWithUser_1.UserParser(),
        userFindRoom: new classWorkWithUser_1.UserFindRoom(),
        notifyUser: new classMessage_1.NotifyUser(responseFactorys, userPublishers, messageRecipientFilters, sendMessages),
        checkStateRoom: new Room_1.CheckStateRoom(),
        userChakeState: new classWorkWithUser_1.UserChakeState(),
        checkCardInUser: new Card_1.CheckCardInUser(),
        checkCardOnTable: new Card_1.CheckCardOnTable(),
        cardOnTable: new Card_1.CardOnTable(),
        userCardRemove: new classWorkWithUser_1.UserCardRemove(),
        userPass: new classWorkWithUser_1.UserPass(),
    });
    userAttackAction.UserAttack(data);
}
function Def(data) {
    const userManager = new classWorkWithUser_1.UserManager();
    const responseFactorys = new classMessage_1.ResponseFactory();
    const userPublishers = new classWorkWithUser_1.UserPublisher(userManager);
    const messageRecipientFilters = new classWorkWithUser_1.MessageRecipientFilter();
    const sendMessages = new classMessage_1.SendMessage();
    const userDeffitAction = new UserDeffitAction_1.UserDeffitAction({
        rooms: rooms,
        userParser: new classWorkWithUser_1.UserParser(),
        userFindRoom: new classWorkWithUser_1.UserFindRoom(),
        notifyUser: new classMessage_1.NotifyUser(responseFactorys, userPublishers, messageRecipientFilters, sendMessages),
        checkStateRoom: new Room_1.CheckStateRoom(),
        userChakeState: new classWorkWithUser_1.UserChakeState(),
        checkCardInUser: new Card_1.CheckCardInUser(),
        cardOnTable: new Card_1.CardOnTable(),
        userCardRemove: new classWorkWithUser_1.UserCardRemove(),
        comparisonCard: new Card_1.ComparisonCard(),
        userPass: new classWorkWithUser_1.UserPass(),
    });
    userDeffitAction.UserDeffitAction(data);
}
const add = (data) => {
    const userManager = new classWorkWithUser_1.UserManager();
    const responseFactorys = new classMessage_1.ResponseFactory();
    const userPublishers = new classWorkWithUser_1.UserPublisher(userManager);
    const messageRecipientFilters = new classWorkWithUser_1.MessageRecipientFilter();
    const sendMessages = new classMessage_1.SendMessage();
    const userAddCardAction = new Action_1.UserAddCardAction({
        rooms: rooms,
        userParser: new classWorkWithUser_1.UserParser(),
        userFindRoom: new classWorkWithUser_1.UserFindRoom(),
        notifyUser: new classMessage_1.NotifyUser(responseFactorys, userPublishers, messageRecipientFilters, sendMessages),
        checkStateRoom: new Room_1.CheckStateRoom(),
        userChakeState: new classWorkWithUser_1.UserChakeState(),
        checkCardInUser: new Card_1.CheckCardInUser(),
        checkCardOnTable: new Card_1.CheckCardOnTable(),
        cardOnTable: new Card_1.CardOnTable(),
        userCardRemove: new classWorkWithUser_1.UserCardRemove(),
        checkRankOnTable: new Card_1.CheckRankOnTable(),
        userPass: new classWorkWithUser_1.UserPass(),
    });
    userAddCardAction.UserAddCardAction(data);
};
function pass(data) {
    console.log("pass");
    const userManager = new classWorkWithUser_1.UserManager();
    const UserFindIndexInRoom = new classWorkWithUser_1.UserFindRoom();
    const userParser = new classWorkWithUser_1.UserParser();
    const responseFactorys = new classMessage_1.ResponseFactory();
    const userPublishers = new classWorkWithUser_1.UserPublisher(userManager);
    const messageRecipientFilters = new classWorkWithUser_1.MessageRecipientFilter();
    const sendMessages = new classMessage_1.SendMessage();
    const checkStateRoom = new Room_1.CheckStateRoom();
    const notifyUser = new classMessage_1.NotifyUser(responseFactorys, userPublishers, messageRecipientFilters, sendMessages);
    const distributingCardsToUser = new Card_1.DistributingCardsToUser();
    const checkCardOnTable = new Card_1.CheckCardOnTable();
    const userPass = new classWorkWithUser_1.UserPass();
    const checkPassUser = new GameEvent_1.CheckPassUser({
        rooms: rooms,
        userParser: new classWorkWithUser_1.UserParser(),
        userFindRoom: new classWorkWithUser_1.UserFindRoom(),
        notifyUser: new classMessage_1.NotifyUser(responseFactorys, userPublishers, messageRecipientFilters, sendMessages),
        checkStateRoom: new Room_1.CheckStateRoom(),
        cardOnTable: new Card_1.CardOnTable(),
        userPassCheck: new classWorkWithUser_1.UserPassCheck(),
        simpleCardDealer: new SimpleCardDealer_1.default(distributingCardsToUser),
        roleAssigner: new RoleAssigner_1.RoleAssigner(),
        userPass: new classWorkWithUser_1.UserPass(),
    });
    const userAddCardAction = new Action_1.UserPassAction(rooms, userParser, UserFindIndexInRoom, notifyUser, checkStateRoom, checkCardOnTable, userPass);
    console.log("suka");
    userAddCardAction.UserPassAttacAction(data);
    checkPassUser.CheckPassUser(data);
}
