interface IUserTg {
  hash: string;
  user: {
    id: number;
    allowsWriteToPm: boolean;
    username: string;
    firstName: string;
  };
}
export default IUserTg;
