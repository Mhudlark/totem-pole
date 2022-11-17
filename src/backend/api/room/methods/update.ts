import { getMockRoom } from '__mocks__/rooms';

import type { Room } from '@/sharedTypes';
import type {
  JoinPayload,
  LeavePayload,
  RoomPayload,
} from '@/sharedUtils/api/request/room';
import { RoomPayloadType } from '@/sharedUtils/api/request/room';
import { initUser } from '@/sharedUtils/user';

export type UpdateRoom = (
  roomName: string,
  roomPayload: RoomPayload
) => Promise<Room>;

export const updateRoom: UpdateRoom = async (roomName, roomPayload) => {
  let room: Room;

  if (roomPayload.type === RoomPayloadType.JOIN) {
    const joinPayload = roomPayload as JoinPayload;

    // Get the room the user wants to join
    room = await getMockRoom(roomName);

    // Add the user to the room
    const newUser = initUser(joinPayload.username);
    room.users.push(newUser);
  } else if (roomPayload.type === RoomPayloadType.LEAVE) {
    const leavePayload = roomPayload as LeavePayload;

    // Get the room the user wants to join
    room = await getMockRoom(roomName);

    // Add the user to the room
    const newUser = initUser(leavePayload.username);
    room.users.push(newUser);
  } else {
    throw new Error(`Invalid room payload type ${roomPayload.type}`);
  }

  return room;
};
