import { ICard, IPlayers } from "../../Room";
import { CheckCardInUser } from "./CheckCardInUser";

const cards: ICard[] = [
  { rank: "1", suit: "Ace of Spades" },
  { rank: "2", suit: "King of Hearts" },
  { rank: "3", suit: "Queen of Diamonds" },
  { rank: "4", suit: "Jack of Clubs" },
] as unknown as ICard[];
const user: IPlayers = {
  card: cards,
} as unknown as IPlayers;
describe("CheckCardInUser", () => {
  it("should return 0", () => {
    const checkCardInUser = new CheckCardInUser();
    expect(
      checkCardInUser.CheckCardInUser(user, {
        rank: "1",
        suit: "Ace of Spades",
      } as unknown as ICard)
    ).toBe(0);
  });
  it("should return -1", () => {
    const checkCardInUser = new CheckCardInUser();
    expect(
      checkCardInUser.CheckCardInUser(user, {
        rank: "9",
        suit: "Ace of Spades",
      } as unknown as ICard)
    ).toBe(-1);
  });
});
