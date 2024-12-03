import { IResponseMessage, ITemplateMessage } from "src/Type";
import IResponseFactory from "./IResponseFactory";

class ResponseFactory implements IResponseFactory {
  templateMessage(data: ITemplateMessage) {
    const res: IResponseMessage = {
      session: data.session,
      action: data.action,
      players: data.players,
      roomId: data.roomId,
      you: data.user,
      trump: data.trump,
      pass: data.pass,
      cardsOnTable: data.cardsOnTable,
      passState: data.passState,
      cardsOnTableCount: data.cardsOnTableCount,
    };
    return res;
  }

  //   ResponseJoin(
  //     session: string,
  //     players: IPublishUser[],
  //     roomId: string,
  //     user: IUser,
  //     id: number
  //   ) {
  //     players.filter((elem) => elem.id != id);
  //   }
}
export default ResponseFactory;
