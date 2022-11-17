import type { Reducer } from 'redux';

import type { Room } from '@/sharedTypes';

import type { Action } from '../action';
import type { ApplicationStore } from '../sharedHelpers';
import { initialStore } from '../sharedHelpers';
import { SET_ROOM } from './actions';

const roomReducer: Reducer<ApplicationStore['room'], Action<Room>> = (
  room = initialStore.room,
  action
) => {
  if (action.type === SET_ROOM) {
    return action.payload;
  }

  return room;
};

export default roomReducer;
