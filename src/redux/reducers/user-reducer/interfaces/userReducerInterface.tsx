export interface userReducerInterface {
  name: string,
  avatar: string,
  isAuthentication: boolean,
  fetch: {
    status: number,
    code: string,
    message: string
  }
};