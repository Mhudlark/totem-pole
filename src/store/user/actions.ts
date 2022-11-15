import type { Action } from '../action';

export const SET_USERNAME = 'SET_USERNAME';

export type SetUsername = (username: string) => Action<string>;

export const setUsername: SetUsername = (username) => ({
  type: SET_USERNAME,
  payload: username,
});
