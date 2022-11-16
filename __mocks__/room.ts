import type { Room } from '@/store/room/helpers';

import { mockUser } from './user';

export const mockRoom: Room = {
  roomName: 'test-room',
  users: [mockUser],
};

export const getMockRoom = async () => mockRoom;
