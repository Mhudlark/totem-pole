import { getMockEmptyRoom } from '@/../__mocks__/room';
import type { Room } from '@/sharedTypes';
import type {
  CreatePayload,
  RoomPayload,
} from '@/sharedUtils/api/request/room';
import { RoomPayloadType } from '@/sharedUtils/api/request/room';
import { initUser } from '@/sharedUtils/user';

export type CreateRoom = (roomPayload: RoomPayload) => Promise<Room>;

export const createRoom: CreateRoom = async (roomPayload) => {
  let room: Room;

  if (roomPayload.type === RoomPayloadType.CREATE) {
    const createPayload = roomPayload as CreatePayload;

    // Return mock room instead of creating room
    room = await getMockEmptyRoom();

    // Add the user to the room
    const newUser = initUser(createPayload.username);
    room.users.push(newUser);
  } else {
    throw new Error(`Invalid room payload type ${roomPayload.type}`);
  }

  return room;
};
