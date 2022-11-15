import { combineReducers } from 'redux';

import alertsReducer from './alerts/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  alert: alertsReducer,
  user: userReducer,
});

export default rootReducer;
