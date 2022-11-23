import type { Reducer } from 'redux';

import type { Room, User } from '@/sharedTypes';

import type { Action } from '../action';
import type { ApplicationStore } from '../sharedHelpers';
import { initialStore } from '../sharedHelpers';
import {
  ADD_USER_TO_ROOM,
  ADD_USERS_TO_ROOM,
  REMOVE_USER_FROM_ROOM,
  REMOVE_USERS_FROM_ROOM,
  RESET_ROOM,
  SET_ROOM,
  SET_ROOM_NAME,
} from './actions';

const roomReducer: Reducer<
  ApplicationStore['room'],
  Action<Room | User | User[] | string | string[] | null>
> = (room = initialStore.room, action) => {
  if (action.type === RESET_ROOM) {
    return initialStore.room;
  }

  if (action.type === SET_ROOM) {
    return action.payload as Room;
  }

  if (action.type === SET_ROOM_NAME) {
    return { ...room, roomName: action.payload as string };
  }

  if (action.type === ADD_USER_TO_ROOM) {
    return { ...room, users: [...room.users, action.payload as User] };
  }

  if (action.type === ADD_USERS_TO_ROOM) {
    return { ...room, users: [...room.users, ...(action.payload as User[])] };
  }

  if (action.type === REMOVE_USER_FROM_ROOM) {
    const removedUser = action.payload as string;
    const newUsers = room.users.filter(
      (user) => user.userMetadata.username !== removedUser
    );
    return { ...room, users: newUsers };
  }

  if (action.type === REMOVE_USERS_FROM_ROOM) {
    const removedUsers = action.payload as string[];
    const newUsers = room.users.filter(
      (user) => !removedUsers.includes(user.userMetadata.username)
    );
    return { ...room, users: newUsers };
  }

  return room;
};

export default roomReducer;
