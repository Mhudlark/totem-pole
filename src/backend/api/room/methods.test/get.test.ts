// eslint-disable-next-line jest/no-mocks-import
import { getMockRooms } from '@/../__mocks__/rooms';
import type { Room } from '@/sharedTypes';

import { getRoom } from '../methods/get';

describe('getRoom', () => {
  test('Returns a room with the correct room name', async () => {
    const mockRooms = (await getMockRooms()) as Room[];
    const mockRoom = mockRooms[0] as Room;

    const room = await getRoom(mockRoom.roomName);

    // Basic room tests
    expect(room.roomName).toBeTruthy();
    expect(typeof room.roomName === 'string').toBeTruthy();
    expect(room.users).toBeTruthy();
    expect(Array.isArray(room.users)).toBeTruthy();

    expect(room.roomName).toEqual(mockRoom.roomName);
    expect(room.users.length).toEqual(mockRoom.users.length);
  });

  test('Returns a room with the correct users', async () => {
    const mockRooms = (await getMockRooms()) as Room[];
    const mockRoom = mockRooms[0] as Room;

    const room = await getRoom(mockRoom.roomName);

    // Basic room tests
    expect(room.roomName).toBeTruthy();
    expect(typeof room.roomName === 'string').toBeTruthy();
    expect(room.users).toBeTruthy();
    expect(Array.isArray(room.users)).toBeTruthy();

    expect(room.roomName).toEqual(mockRoom.roomName);
    expect(room.users.length).toEqual(mockRoom.users.length);

    expect(room.users[0]?.userMetadata.username).toEqual(
      mockRoom.users[0]?.userMetadata.username
    );
  });
});
