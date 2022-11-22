import type { Room, User } from '@/sharedTypes';
import { RequestMethod } from '@/sharedUtils/api/request';
import {
  createCreatePayload,
  createJoinPayload,
} from '@/sharedUtils/api/request/room';
import { fetchBase } from '@/utils/api';

import type { Action, AppThunk } from '../action';
import { openErrorAlert } from '../util';

export const SET_ROOM = 'SET_ROOM';

export const SET_ROOM_NAME = 'SET_ROOM_NAME';

export const ADD_USER_TO_ROOM = 'ADD_USER_TO_ROOM';
export const ADD_USERS_TO_ROOM = 'ADD_USERS_TO_ROOM';
export const REMOVE_USER_FROM_ROOM = 'REMOVE_USER_FROM_ROOM';
export const REMOVE_USERS_FROM_ROOM = 'REMOVE_USERS_FROM_ROOM';

type SetRoom = (room: Room) => Action<Room>;

export const setRoom: SetRoom = (room: Room) => ({
  type: SET_ROOM,
  payload: room,
});

type SetRoomName = (roomName: string) => Action<string>;

export const setRoomName: SetRoomName = (roomName) => ({
  type: SET_ROOM_NAME,
  payload: roomName,
});

type AddUserToRoom = (user: User) => Action<User>;

export const addUserToRoom: AddUserToRoom = (user) => ({
  type: ADD_USER_TO_ROOM,
  payload: user,
});

type AddUsersToRoom = (users: User[]) => Action<User[]>;

export const addUsersToRoom: AddUsersToRoom = (users) => ({
  type: ADD_USERS_TO_ROOM,
  payload: users,
});

type RemoveUserFromRoom = (username: string) => Action<string>;

export const removeUserFromRoom: RemoveUserFromRoom = (username) => ({
  type: REMOVE_USER_FROM_ROOM,
  payload: username,
});

type RemoveUsersFromRoom = (usernames: string[]) => Action<string[]>;

export const removeUsersFromRoom: RemoveUsersFromRoom = (usernames) => ({
  type: REMOVE_USERS_FROM_ROOM,
  payload: usernames,
});

// ====================== Thunk Actions =========================

export const createRoom =
  (abortControllerSignal?: AbortSignal): AppThunk<Promise<boolean>> =>
  async (dispatch, getState) => {
    try {
      const createPayload = createCreatePayload(
        getState().user.userMetadata.username
      );

      const res = await fetchBase<{ room: Room }>(
        RequestMethod.POST,
        `/room`,
        createPayload,
        true,
        abortControllerSignal
      );

      const { room } = res;

      if (room) {
        dispatch(setRoom(room));
        return true;
      }

      throw new Error('Room could not be created');
    } catch (error: any) {
      dispatch(openErrorAlert(error.message, abortControllerSignal));
      return false;
    }
  };

export const joinRoom =
  (
    roomName: string,
    abortControllerSignal?: AbortSignal
  ): AppThunk<Promise<boolean>> =>
  async (dispatch, getState) => {
    try {
      const joinPayload = createJoinPayload(
        getState().user.userMetadata.username
      );

      const res = await fetchBase<{ room: Room }>(
        RequestMethod.PUT,
        `/room/${roomName}`,
        joinPayload,
        true,
        abortControllerSignal
      );

      const { room } = res;

      console.log('Room: ', room);

      if (room) {
        dispatch(setRoom(room));
        return true;
      }

      throw new Error('Error joining room');
    } catch (error: any) {
      dispatch(openErrorAlert(error.message, abortControllerSignal));
      return false;
    }
  };
