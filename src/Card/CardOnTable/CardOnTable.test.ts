import { ICard, ICardInGame } from "../../Room";
import CardOnTable, { IResponseRemveCard } from "./CardOnTable";

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
    const cardsOnTable: ICardInGame[] = [
      {
        attack: cards,
        deffit: cards,
      },
    ] as ICardInGame[];
    const passCarrd: ICardInGame[] = [];
    const result = {
      cardOnTable: [],
      pass: [
        {
          attack: cards,
          deffit: cards,
        },
      ],
    };
    const removeCard = cardOnTable.removeCard(cardsOnTable, passCarrd);
    expect(removeCard).toEqual(result);
  });
});

describe("pickUpAllCard", () => {
  it("should transfer card from table to user", () => {
    const cardOnTable = new CardOnTable();
    const cards: ICard = {
      rank: "1",
      suit: "Ace of Spades",
    } as unknown as ICard;
    const cardsOnTable: ICardInGame[] = [
      {
        attack: cards,
        deffit: cards,
      },
    ] as ICardInGame[];

    const card: ICard[] = [];

    const result: IResponseRemveCard = {
      cardOnTable: [],
      card: [cards, cards],
    };
    expect(cardOnTable.pickUpAllCard(cardsOnTable, card)).toEqual(result);
  });
});
