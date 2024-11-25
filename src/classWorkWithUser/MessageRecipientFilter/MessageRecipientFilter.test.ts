import { IPlayerPublisher } from "../../classMessage/ResponseFactory";
import { MessageRecipientFilter } from "./MessageRecipientFilter";

const testUsersPublish: IPlayerPublisher[] = [
  {
    id: 1,
    cardCount: 0,
    firstName: "Test",
    startGame: false,
  },
  {
    id: 2,
    cardCount: 0,
    firstName: "Test",
    startGame: false,
  },
];

const resultUsersPublish: IPlayerPublisher[] = [
  {
    id: 1,
    cardCount: 0,
    firstName: "Test",
    startGame: false,
  },
];
describe("filterMessageToUsersExcept", () => {
  it("user with id  2 shoulb be remove with arr", () => {
    const messageRecipientFilter = new MessageRecipientFilter();
    expect(messageRecipientFilter.filterMessageToUsersExcept(testUsersPublish,2)).toEqual(resultUsersPublish)
  })
});
