export type AnyFunction = (...args: any[]) => void;

export interface User {
  userMetadata: {
    key: string;
    username: string;
  };
}

export interface Room {
  roomName: string;
  users: User[];
}
