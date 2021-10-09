export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    name: string;
  };
}