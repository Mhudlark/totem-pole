import { getMockRoom } from '__mocks__/rooms';

import type { Room } from '@/store/room/helpers';

export type GetRoom = (roomName: string) => Promise<Room>;

export const getRoom: GetRoom = async (roomName) => {
  const room = await getMockRoom(roomName);
  return room;
};
