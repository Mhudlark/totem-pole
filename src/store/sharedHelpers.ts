import type { Alert } from './alerts/helpers';
import { alertReducerInitialState } from './alerts/helpers';

/**
 * The schema for the root-level application / redux store, containing the global app state.
 */
export interface ApplicationStore {
  alert: Alert;
}

/**
 * The initial state of the application store / redux store.
 * This is what the store looks like every time the application starts.
 */
export const initialStore: ApplicationStore = {
  alert: alertReducerInitialState,
};
