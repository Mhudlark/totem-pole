/* eslint-disable jest/no-mocks-import */
import { mockRoom } from '@/../__mocks__/room';

import { SET_ROOM } from '../actions';
import { roomReducerInitialState } from '../helpers';
import roomReducer from '../reducer';

describe('Room reducer', () => {
  it('should handle create room', () => {
    expect(
      roomReducer(roomReducerInitialState, {
        type: SET_ROOM,
        payload: mockRoom,
      })
    ).toEqual(mockRoom);
  });
});
