import { getMockRoom } from '@/../__mocks__/room';

import type { Action, AppThunk } from '../action';
import type { Room } from './helpers';

export const CREATE_ROOM = 'CREATE_ROOM';
const SET_ROOM = 'CREATE_ROOM';

type SetRoom = (room: Room) => Action<Room>;

const setRoom: SetRoom = (room: Room) => ({
  type: SET_ROOM,
  payload: room,
});

export const createRoom =
  (): AppThunk<Promise<boolean>> => async (dispatch) => {
    const room = await getMockRoom();

    dispatch(setRoom(room));

    return true;
  };

// export type LoginAdminThunk = (
//   dispatch: any,
//   credentials: string
// ) => Promise<void>;
// export type LoginAdmin = (credentials: string) => LoginAdminThunk;

// export const loginAdmin: LoginAdmin = (credentials) => async (dispatch) => {
//   return loginAdminThunk(dispatch, credentials);
// };

// export const loginAdminThunk: LoginAdminThunk = async (
//   dispatch,
//   credentials
// ) => {
//   dispatch(fetchSmartChoice('POST', '/auth/loginAdmin', credentials))
//     .then((res) => {
//       if (!res?.token) {
//         throw { message: 'Access denied' };
//       }

//       const decodedToken = jwtDecode(res.token);
//       dispatch({
//         type: actionTypes.loginSuccess,
//         payload: {
//           ...decodedToken,
//           token: res.token,
//         },
//       });
//       return { ...res, success: true };
//     })
//     .catch((error) => {
//       const message =
//         responseCodes.loginAdmin?.[error.message] ?? error.message;
//       dispatch(dispatchErrorAlert(message));
//       throw new Error(message);
//     });
// };
