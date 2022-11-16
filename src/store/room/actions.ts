import { mockRoom } from '__mocks__/room';

export const CREATE_ROOM = 'CREATE_ROOM';

export type CreateRoom = () => (dispatch: any) => Promise<boolean>;

export const createRoom: CreateRoom = () => async (dispatch) => {
  const room = mockRoom;

  dispatch({
    type: CREATE_ROOM,
    payload: room,
  });

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
