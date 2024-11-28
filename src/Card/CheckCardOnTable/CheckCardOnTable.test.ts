import { ICard, ICardInGame } from "../../Room";
import { CheckCardOnTable } from "./CheckCardOnTable";

describe("CheckCardOnTable", () => {
  it("should be return ture (0 card)", () => {
    const checkCardOnTable = new CheckCardOnTable();

    const cardsOnTable = [] as unknown as ICardInGame[];

    expect(checkCardOnTable.checkIfCardIsZero(cardsOnTable)).toBe(true);
  });
  it("should be return false (1 card)", () => {
    const checkCardOnTable = new CheckCardOnTable();
    const cards: ICard = { rank: "1", suit: "Ace of Spades" };
    const cardsOnTable = [cards] as unknown as ICardInGame[];

    expect(checkCardOnTable.checkIfCardIsZero(cardsOnTable)).toBe(false);
  });
});
