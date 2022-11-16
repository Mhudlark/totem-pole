import type { User } from '../user/helpers';

export interface Room {
  roomName: string;
  users: User[];
}

export const roomReducerInitialState = {
  roomName: '',
  users: [],
};
