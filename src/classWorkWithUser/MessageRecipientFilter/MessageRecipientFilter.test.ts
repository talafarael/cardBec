import IPlayerPublisher from "../../Type/UserType/IPlayerPublisher/IPlayerPublisher";
import MessageRecipientFilter from "./MessageRecipientFilter";

const testUsersPublish: IPlayerPublisher[] = [
  {
    id: 1,
    cardCount: 0,
    firstName: "Test",
    startGame: false,
    state: "",
    passState: false,
    photoUrl: "test",
  },
  {
    id: 2,
    cardCount: 0,
    firstName: "Test",
    startGame: false,
    state: "",
    passState: false,
    photoUrl: "test",
  },
];

const resultUsersPublish: IPlayerPublisher[] = [
  {
    id: 1,
    cardCount: 0,
    firstName: "Test",
    startGame: false,
    state: "",
    passState: false,
    photoUrl: "test",
  },
];
describe("filterMessageToUsersExcept", () => {
  it("user with id  2 shoulb be remove with arr", () => {
    const messageRecipientFilter = new MessageRecipientFilter();
    expect(
      messageRecipientFilter.filterMessageToUsersExcept(testUsersPublish, 2),
    ).toEqual(resultUsersPublish);
  });
});
