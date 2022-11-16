import { getMockRoom } from '@/../__mocks__/room';

import type { Action, AppThunk } from '../action';
import type { Room } from './helpers';

export const SET_ROOM = 'SET_ROOM';

type SetRoom = (room: Room) => Action<Room>;

const setRoom: SetRoom = (room: Room) => ({
  type: SET_ROOM,
  payload: room,
});

// ====================== Thunk Actions =========================

export const createRoom =
  (): AppThunk<Promise<boolean>> => async (dispatch) => {
    const room = await getMockRoom();

    dispatch(setRoom(room));

    return true;
  };

export const joinRoom =
  (roomName: string): AppThunk<Promise<boolean>> =>
  async (dispatch) => {
    console.log('Joining room', roomName);
    const room = await getMockRoom();

    console.log(room);

    dispatch(setRoom(room));

    return true;
  };

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
