import { IRoom } from "../../Room";
import { GrabState } from "./GrabState";



describe("checkGrabState", () => {
  it("should return false", () => {
    const grabState = new GrabState();
    
const roomGrabFalse: IRoom = {
    GrabState: false,
  } as unknown as IRoom;
    expect(grabState.checkGrabState(roomGrabFalse)).toBe(false);
  });
});

describe("cheng to true", () => {
  it("should return true", () => {
    const roomGrabFalse: IRoom = {
        GrabState: false,
      } as unknown as IRoom;
      
      const roomGrabTrue: IRoom = {
        GrabState: true,
      } as unknown as IRoom;
    const grabState = new GrabState();
    expect(grabState.changeGrabStateTrue(roomGrabFalse)).toEqual(roomGrabTrue);
  });
});

describe("cheng to false", () => {
  it("should return false", () => {
    const roomGrabFalse: IRoom = {
        GrabState: false,
      } as unknown as IRoom;
      
      const roomGrabTrue: IRoom = {
        GrabState: true,
      } as unknown as IRoom;
    const grabState = new GrabState();
    
    expect(grabState.changeGrabStateFalse(roomGrabTrue)).toEqual(roomGrabFalse);
  });
});
