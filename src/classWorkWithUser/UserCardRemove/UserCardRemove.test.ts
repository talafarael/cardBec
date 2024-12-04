import { ICard } from "src/Type";
import UserCardRemove from "./UserCardRemove";

describe("UserCardRemove ", () => {
  it("must remove", () => {
    const userCardRemove = new UserCardRemove();
    const cards: ICard = {
      rank: "2",
      suit: "Ace of Spades",
    } as unknown as ICard;
    const card = [
      { rank: "1", suit: "Ace of Spades" } as unknown as ICard,
      cards,
    ];
    const cardResult = [cards];
    expect(userCardRemove.CardRemove(card, 0)).toEqual(cardResult);
  });
});
