
import { ICard} from "../../Room";
import { UserCardRemove } from "./UserCardRemove";


describe("UserCardRemove ", () => {
  it("must remove", () => {
    const userCardRemove  = new UserCardRemove();
    const cards: ICard = { rank: "2", suit: "Ace of Spades" };
    const card=[{ rank: "1", suit: "Ace of Spades" },cards]
    const cardResult=[cards]
    expect(userCardRemove.CardRemove(card,0)).toEqual(cardResult);
  });

});