// eslint-disable-next-line jest/no-mocks-import
import { getMockRooms } from '@/../__mocks__/rooms';
import type { Room } from '@/sharedTypes';
import { createJoinPayload } from '@/sharedUtils/api/request/room';

import { updateRoom } from '../methods/update';

describe('updateRoom', () => {
  test('Join a room', async () => {
    const mockRooms = (await getMockRooms()) as Room[];
    const mockRoom = { ...mockRooms[0] } as Room;
    const mockRoomRoomName = mockRoom.roomName;
    const mockRoomUsers = [...mockRoom.users];

    const mockUsername = 'abc123';
    const joinPayload = createJoinPayload(mockUsername);

    const room = await updateRoom(mockRoomRoomName, joinPayload);

    // Basic room tests
    expect(room.roomName).toBeTruthy();
    expect(typeof room.roomName === 'string').toBeTruthy();
    expect(room.users).toBeTruthy();
    expect(Array.isArray(room.users)).toBeTruthy();

    // Check that it is the same room
    expect(room.roomName).toEqual(mockRoomRoomName);
    expect(room.users[0]?.username).toEqual(mockRoomUsers[0]?.username);

    // Check that a user has been added to the room
    expect(room.users.length).toEqual(mockRoomUsers.length + 1);

    // Check that the new user is in the room
    expect(room.users[room.users.length - 1]?.username).toEqual(mockUsername);
  });
});
