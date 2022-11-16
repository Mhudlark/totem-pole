import type { Alert } from './alerts/helpers';
import { alertReducerInitialState } from './alerts/helpers';
import type { Room } from './room/helpers';
import { roomReducerInitialState } from './room/helpers';
import type { User } from './user/helpers';
import { userReducerInitialState } from './user/helpers';

/**
 * The schema for the root-level application / redux store, containing the global app state.
 */
export interface ApplicationStore {
  alert: Alert;
  user: User;
  room: Room;
}

/**
 * The initial state of the application store / redux store.
 * This is what the store looks like every time the application starts.
 */
export const initialStore: ApplicationStore = {
  alert: alertReducerInitialState,
  user: userReducerInitialState,
  room: roomReducerInitialState,
};
