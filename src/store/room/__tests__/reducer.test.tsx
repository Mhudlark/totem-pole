/* eslint-disable jest/no-mocks-import */

import { mockRoom } from '@/../__mocks__/room';
import { initUser } from '@/sharedUtils/user';

import {
  ADD_USER_TO_ROOM,
  ADD_USERS_TO_ROOM,
  REMOVE_USER_FROM_ROOM,
  REMOVE_USERS_FROM_ROOM,
  SET_ROOM,
  SET_ROOM_NAME,
} from '../actions';
import { roomReducerInitialState } from '../helpers';
import roomReducer from '../reducer';

describe('Room reducer', () => {
  it('set room', () => {
    expect(
      roomReducer(roomReducerInitialState, {
        type: SET_ROOM,
        payload: mockRoom,
      })
    ).toEqual(mockRoom);
  });

  it('set room name', () => {
    const newRoomName = 'new-room-name';
    expect(
      roomReducer(mockRoom, {
        type: SET_ROOM_NAME,
        payload: newRoomName,
      }).roomName
    ).toEqual(newRoomName);
  });

  it('add user to room', () => {
    const mockRoomNumUsers = mockRoom.users.length;
    const newUser = initUser('new-user');

    const newReducer = roomReducer(mockRoom, {
      type: ADD_USER_TO_ROOM,
      payload: newUser,
    });

    // Check that the number of users in the room is correct
    expect(newReducer.users.length).toEqual(mockRoomNumUsers + 1);

    // Check that the new user is in the room
    expect(
      newReducer.users[newReducer.users.length - 1]?.userMetadata.username
    ).toEqual(newUser.userMetadata.username);
  });

  it('add users to room', () => {
    const mockRoomNumUsers = mockRoom.users.length;
    const newUsers = [initUser('new-user-1'), initUser('new-user-2')];

    const newReducer = roomReducer(mockRoom, {
      type: ADD_USERS_TO_ROOM,
      payload: newUsers,
    });

    // Check that the number of users in the room is correct
    expect(newReducer.users.length).toEqual(mockRoomNumUsers + newUsers.length);

    // Check that the new users are in the room
    newUsers.forEach((newUser) => {
      const filteredReducerUsers = newReducer.users.filter((user) => {
        return user.userMetadata.username === newUser.userMetadata.username;
      });
      expect(filteredReducerUsers.length).toEqual(1);
    });
  });

  it('remove user from room', () => {
    const mockRoomNumUsers = mockRoom.users.length;
    const userToBeRemoved = mockRoom.users[0]?.userMetadata?.username ?? '';

    const newReducer = roomReducer(mockRoom, {
      type: REMOVE_USER_FROM_ROOM,
      payload: userToBeRemoved,
    });

    // Check that the number of users in the room is correct
    expect(newReducer.users.length).toEqual(mockRoomNumUsers - 1);

    // Check that the removed user is not in the room
    expect(
      newReducer.users.filter(
        (users) => users.userMetadata.username === userToBeRemoved
      ).length
    ).toEqual(0);
  });

  it('remove users from room', () => {
    const mockRoomNumUsers = mockRoom.users.length;
    const numUsersToBeRemoved = Math.min(2, mockRoomNumUsers);
    const usersToBeRemoved = mockRoom.users
      .slice(0, numUsersToBeRemoved)
      .map((user) => user.userMetadata.username);

    const newReducer = roomReducer(mockRoom, {
      type: REMOVE_USERS_FROM_ROOM,
      payload: usersToBeRemoved,
    });

    // Check that the number of users in the room is correct
    expect(newReducer.users.length).toEqual(
      mockRoomNumUsers - numUsersToBeRemoved
    );

    // Check that the removed user is not in the room
    usersToBeRemoved.forEach((userToBeRemoved) => {
      const filteredReducerUsers = newReducer.users.filter((user) => {
        return user.userMetadata.username === userToBeRemoved;
      });
      expect(filteredReducerUsers.length).toEqual(0);
    });
  });
});
