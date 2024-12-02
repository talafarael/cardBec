import { ICard } from "../../Room";
import MixCard from "./MixCard";
const cards: ICard[] = [
  { rank: "1", suit: "Ace of Spades" },
  { rank: "2", suit: "King of Hearts" },
  { rank: "3", suit: "Queen of Diamonds" },
  { rank: "4", suit: "Jack of Clubs" },
]as unknown as ICard[];

const mixCards = new MixCard();

describe("MixCards", () => {
  it("should shuffle the cards array", () => {
    const shuffledCards = mixCards.Mix(cards);

    expect(shuffledCards).not.toEqual(cards);

    expect(shuffledCards.length).toBe(cards.length);

    expect(shuffledCards).toEqual(expect.arrayContaining(cards));
  });
});
