import type { User } from '@/store/user/helpers';

export type CreateUser = (username: string) => User;

export const createUser: CreateUser = (username) => ({
  username,
});
