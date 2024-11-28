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
    const cards: ICard = {
      rank: "1",
      suit: "Ace of Spades",
    } as unknown as ICard;
    const cardsOnTable = [cards] as unknown as ICardInGame[];

    expect(checkCardOnTable.checkIfCardIsZero(cardsOnTable)).toBe(false);
  });
  it("should be return ture (1 card)", () => {
    const checkCardOnTable = new CheckCardOnTable();
    const cards: ICard = {
      rank: "1",
      suit: "Ace of Spades",
    } as unknown as ICard;
    const cardsOnTable = [cards] as unknown as ICardInGame[];

    expect(checkCardOnTable.checkIfCardMaxMinForAdd(cardsOnTable)).toBe(true);
  });
  it("should be return ture (6 card)", () => {
    const checkCardOnTable = new CheckCardOnTable();
    const cards: ICard = {
      rank: "1",
      suit: "Ace of Spades",
    } as unknown as ICard;
    const cardsOnTable = [
      cards,
      cards,
      cards,
      cards,
      cards,
      cards,
    ] as unknown as ICardInGame[];

    expect(checkCardOnTable.checkIfCardMaxMinForAdd(cardsOnTable)).toBe(true);
  });
  it("should be return false (7 card)", () => {
    const checkCardOnTable = new CheckCardOnTable();
    const cards: ICard = {
      rank: "1",
      suit: "Ace of Spades",
    } as unknown as ICard;
    const cardsOnTable = [
      cards,
      cards,
      cards,
      cards,
      cards,
      cards,
      cards,
    ] as unknown as ICardInGame[];

    expect(checkCardOnTable.checkIfCardMaxMinForAdd(cardsOnTable)).toBe(false);
  });
  it("should be return false (0 card)", () => {
    const checkCardOnTable = new CheckCardOnTable();

    const cardsOnTable = [] as unknown as ICardInGame[];

    expect(checkCardOnTable.checkIfCardMaxMinForAdd(cardsOnTable)).toBe(false);
  });
});