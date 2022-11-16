import type { Reducer } from 'redux';

import type { Action } from '../action';
import type { ApplicationStore } from '../sharedHelpers';
import { initialStore } from '../sharedHelpers';
import { CREATE_ROOM } from './actions';
import type { Room } from './helpers';

const roomReducer: Reducer<ApplicationStore['room'], Action<Room>> = (
  room = initialStore.room,
  action
) => {
  if (action.type === CREATE_ROOM) {
    return action.payload;
  }

  return room;
};

export default roomReducer;
