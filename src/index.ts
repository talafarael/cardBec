import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8080 });
interface Room {
  players: { id: string; ws: WebSocket }[];
  isGameActive: boolean;
}

const rooms: { [key: string]: Room } = {};
wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    const { action, roomId, playerId } = JSON.parse(message);
    switch (action) {
      case "join":
        const playerId = uuidv4(); // генерируем уникальный ID
        ws.playerId = playerId;
        break;
    }
    ws.send(message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
