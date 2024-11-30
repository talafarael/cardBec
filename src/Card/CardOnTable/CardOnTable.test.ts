import { ICard, ICardInGame, IRoom } from "../../Room";
import { CardOnTable } from "./CardOnTable";

describe("cardOnTable", () => {
  it("should be put card on table", () => {
    const cardOnTable = new CardOnTable();

    const cardsOnTable = [] as ICardInGame[];

    const cards: ICard = {
      rank: "1",
      suit: "Ace of Spades",
    } as unknown as ICard;
    cardOnTable.PutCardAttack(cards, cardsOnTable);
    expect(cardsOnTable[0].attack).toEqual(cards);
  });
});
describe("remove", () => {
  it("should return empty table and add card to pass ", () => {
    const cardOnTable = new CardOnTable();
    const cards: ICard = {
      rank: "1",
      suit: "Ace of Spades",
    } as unknown as ICard;
    const cardsOnTable = [
      {
        attack: cards,
        deffit: cards,
      },
    ] as ICardInGame[];
    
  });
});
