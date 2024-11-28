import { ICard, ICardInGame, IRoom } from "../../Room";
import { CardOnTable } from "./CardOnTable";

describe("cardOnTable", () => {
  it("should be put card on table", () => {
    const cardOnTable = new CardOnTable();

    const cardsOnTable = [] as ICardInGame[];

    const cards: ICard = { rank: "1", suit: "Ace of Spades" };
    cardOnTable.PutCardAttack(cards, cardsOnTable);
    expect(cardsOnTable[0].attack).toEqual(cards);
  });
});
