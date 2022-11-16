import type { Action } from '../action';

export const SET_USERNAME = 'SET_USERNAME';

export type CreateUser = (username: string) => Action<string>;

export const createUser: CreateUser = (username) => ({
  type: SET_USERNAME,
  payload: username,
});
