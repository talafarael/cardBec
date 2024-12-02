import { IRoom } from "../../Room";
import { GrabState } from "./GrabState";

const roomGrabFalse: IRoom = {
  GrabState: false,
} as unknown as IRoom;

const roomGrabTrue: IRoom = {
  GrabState: true,
} as unknown as IRoom;
describe("checkGrabState", () => {
  it("should return false", () => {
    const grabState = new GrabState();
    expect(grabState.checkGrabState(roomGrabFalse)).toBe(false);
  });
});

describe("cheng to true", () => {
  it("should return true", () => {
    const grabState = new GrabState();
    expect(grabState.changeGrabStateTrue(roomGrabFalse)).toEqual(roomGrabTrue);
  });
});

describe("cheng to false", () => {
  it("should return false", () => {
    const grabState = new GrabState();
    expect(grabState.changeGrabStateFalse(roomGrabTrue)).toEqual(roomGrabFalse);
  });
});
