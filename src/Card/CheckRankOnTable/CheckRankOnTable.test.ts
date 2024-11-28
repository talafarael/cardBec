import { ICard, ICardInGame } from "../../Room";
import { CheckRankOnTable } from "./CheckRankOnTable";
const table: ICardInGame[] = [
  {
    attack: { rank: "6", suit: "hearts", level: 6 },
    deffit: { rank: "6", suit: "diamonds", level: 6 },
  },
  {
    attack: { rank: "7", suit: "hearts", level: 6 },
    deffit: { rank: "K", suit: "diamonds", level: 6 },
  },
];
describe("findPlayerIndexInRoom", () => {
  it("to be true", () => {
    const card: ICard = { rank: "K", suit: "diamonds", level: 6 };

    const checkRankOnTable = new CheckRankOnTable();
    expect(checkRankOnTable.CheckRankOnTable(table, card)).toBe(true);
  });
  it("to be false", () => {
    const card: ICard = { rank: "Q", suit: "diamonds", level: 6 };

    const checkRankOnTable = new CheckRankOnTable();
    expect(checkRankOnTable.CheckRankOnTable(table, card)).toBe(false);
  });
});
