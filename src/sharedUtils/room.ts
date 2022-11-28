import type { Room } from '@/sharedTypes';

export type NewRoom = (roomId: string, roomName: string) => Room;

export const initRoom: NewRoom = (roomId, roomName) => ({
  roomId,
  roomName,
  users: [],
  chatMessages: [],
});
