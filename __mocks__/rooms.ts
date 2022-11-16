import type { Room } from '@/store/room/helpers';

import { mockRoom1, mockRoom2, mockRoom3 } from './room';

export const rooms: Room[] = [mockRoom1, mockRoom2, mockRoom3];

export const getMockRooms = async () => rooms;

export const getMockRoom = async (roomName: string) => {
  return rooms.find((roomObj) => roomObj.roomName === roomName);
};
