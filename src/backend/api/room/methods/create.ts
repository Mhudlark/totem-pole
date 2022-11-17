import { getMockEmptyRoom } from '__mocks__/room';

import type { Room } from '@/store/room/helpers';

import { createUser } from '../../user';
import type { CreatePayload, RoomPayload } from '../helpers';
import { RoomPayloadType } from '../helpers';

export type CreateRoom = (roomPayload: RoomPayload) => Promise<Room>;

export const createRoom: CreateRoom = async (roomPayload) => {
  let room: Room;

  if (roomPayload.type === RoomPayloadType.CREATE) {
    const createPayload = roomPayload as CreatePayload;

    // Return mock room instead of creating room
    room = await getMockEmptyRoom();

    // Add the user to the room
    const newUser = createUser(createPayload.username);
    room.users.push(newUser);
  } else {
    throw new Error(`Invalid room payload type ${roomPayload.type}`);
  }

  return room;
};
