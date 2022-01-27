declare namespace jwt {
  export interface JwtPayload {
      userId: string;
      username: string;
  }
}

declare namespace Express {
  export interface Request {
    userId: number;
  }
}