import type { User } from '@/sharedTypes';

export type InitUser = (username: string) => User;

export const initUser: InitUser = (username) => ({
  userMetadata: {
    key: Math.random().toString(36).slice(2, 9),
    username,
  },
});
