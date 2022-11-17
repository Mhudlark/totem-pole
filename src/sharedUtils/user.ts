import type { User } from '@/sharedTypes';

export type InitUser = (username: string) => User;

export const initUser: InitUser = (username) => ({
  username,
});
