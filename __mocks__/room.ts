import type { Room } from '@/store/room/helpers';

import {
  mockUser1,
  mockUser2,
  mockUser3,
  mockUser4,
  mockUser5,
  mockUser6,
} from './user';

export const mockRoom: Room = {
  roomName: 'mock-room',
  users: [mockUser1, mockUser2, mockUser3],
};

export const mockRoom1: Room = {
  roomName: 'mock-room-1',
  users: [mockUser1, mockUser2, mockUser3],
};

export const mockRoom2: Room = {
  roomName: 'mock-room-2',
  users: [mockUser4, mockUser5],
};

export const mockRoom3: Room = {
  roomName: 'mock-room-3',
  users: [mockUser6],
};

export const getMockRoom = async () => mockRoom;
