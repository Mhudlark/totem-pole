import { combineReducers } from 'redux';

import alertsReducer from './alerts/reducer';

const rootReducer = combineReducers({
  alert: alertsReducer,
});

export default rootReducer;
