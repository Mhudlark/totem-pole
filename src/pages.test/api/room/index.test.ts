import type { FetchReturnType } from 'next-test-api-route-handler';
import { testApiHandler } from 'next-test-api-route-handler';

import handler from '@/pages/api/room';
import { RequestMethod } from '@/sharedUtils/api/request';
import { createCreatePayload } from '@/sharedUtils/api/request/room';
import type { ResponseRoomPayload } from '@/sharedUtils/api/response/room';

describe('/api/room/index.ts', () => {
  test('POST - create room', async () => {
    const mockUsername = 'abc123';
    const body = createCreatePayload(mockUsername);

    await testApiHandler<ResponseRoomPayload>({
      handler,
      requestPatcher: () => {},
      test: async ({ fetch }) => {
        const fetchExtended = fetch as (
          options: RequestInit
        ) => FetchReturnType<ResponseRoomPayload>;

        const res = await fetchExtended({
          method: RequestMethod.POST,
          body: JSON.stringify(body),
        });
        const { room } = await res.json();
        expect(room.roomName).toBeTruthy();
        expect(typeof room.roomName === 'string').toBeTruthy();
        expect(room.users).toBeTruthy();
        expect(Array.isArray(room.users)).toBeTruthy();
        expect(room.users.length).toBe(1);
        expect(room.users[0]?.username).toEqual(mockUsername);
      },
    });
  });
});
