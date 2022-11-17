import { createJoinPayload } from '@/sharedUtils/api/request/room';

describe('/api/room/index.ts', () => {
  test('GET', async () => {
    // const mockRooms = await getMockRooms();
    // const mockRoomName = mockRooms[0].roomName;
    // const query = createJoinPayload(mockUser);
    // await testApiHandler<ResponseRoomPayload>({
    //   handler,
    //   requestPatcher: (req) => {
    //     req.url = new URL(`/api/room/${}`, 'http://localhost');
    //     req.method = RequestMethod.POST;
    //   },
    //   test: async ({ fetch }) => {
    //     const res = await fetch({ method: 'POST', body: 'data' });
    //     const { hello } = await res.json();
    //     expect(hello).toBe('world'); // ◄ Passes!
    //   },
    // });

    const query = createJoinPayload('abc123');
    expect(query.username).toBe('abc123');
  });
});
