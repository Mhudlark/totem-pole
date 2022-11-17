import type { Room } from '@/sharedTypes';

export type NewRoom = (roomName: string) => Room;

export const newRoom: NewRoom = (roomName) => ({
  roomName,
  users: [],
});
