import type { Room } from '@/sharedTypes';
import { RequestMethod } from '@/sharedUtils/api/request';
import {
  createCreatePayload,
  createJoinPayload,
} from '@/sharedUtils/api/request/room';
import { fetchBase } from '@/utils/api';

import type { Action, AppThunk } from '../action';
import { openErrorAlert } from '../util';

export const SET_ROOM = 'SET_ROOM';

type SetRoom = (room: Room) => Action<Room>;

const setRoom: SetRoom = (room: Room) => ({
  type: SET_ROOM,
  payload: room,
});

// ====================== Thunk Actions =========================

export const createRoom =
  (abortControllerSignal?: AbortSignal): AppThunk<Promise<boolean>> =>
  async (dispatch, getState) => {
    try {
      const createPayload = createCreatePayload(getState().user.username);

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
      const joinPayload = createJoinPayload(getState().user.username);

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
