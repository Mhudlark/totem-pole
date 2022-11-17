import { createCreatePayload } from '@/sharedUtils/api/request/room';

import { createRoom } from '../methods/create';

describe('createRoom', () => {
  test('Returns a room with a single user', async () => {
    const mockUsername = 'abc123';
    const createPayload = createCreatePayload(mockUsername);

    const room = await createRoom(createPayload);

    expect(room.roomName).toBeTruthy();
    expect(typeof room.roomName === 'string').toBeTruthy();
    expect(room.users).toBeTruthy();
    expect(Array.isArray(room.users)).toBeTruthy();
    expect(room.users.length).toBe(1);
    expect(room.users[0]?.username).toEqual(mockUsername);
  });
});
