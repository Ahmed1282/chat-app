// user-login

export interface UserLoginResponse {
    token: string;
    user: {
      name: string;
      username: string;
      email: string;
      info?: string;
    };
  }
  