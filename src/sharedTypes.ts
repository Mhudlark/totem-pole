export type AnyFunction = (...args: any[]) => void;

export interface User {
  username: string;
}

export interface Room {
  roomName: string;
  users: User[];
}
