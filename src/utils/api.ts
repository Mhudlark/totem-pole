import { RequestMethod } from '@/backend/api/utils';
import type { RootState } from '@/store/store';

// eslint-disable-next-line no-restricted-globals
export const baseApiPath = `http://localhost:3000`;

const createUrl = (endpointPath: string) => `${baseApiPath}/api${endpointPath}`;

const createBody = (bodyObj: Object): { body: string } | {} => {
  return Object.keys(bodyObj).length ? { body: JSON.stringify(bodyObj) } : {};
};

const createAuthorisation = (
  isAuthorised: boolean,
  getState: () => RootState
): { Authorization: string } | {} => {
  console.log(getState());
  return isAuthorised
    ? {
        Authorization: `Bearer getState().userReducer.currentUser.token`,
      }
    : {};
};

const createAbortController = (
  abortControllerSignal: AbortSignal | null
): { signal: AbortSignal } | {} => {
  return abortControllerSignal !== null
    ? { signal: abortControllerSignal }
    : {};
};

const createFetchOptions = (
  method: RequestMethod,
  bodyObj: Object,
  isAuthorised: boolean,
  getState: () => RootState,
  abortControllerSignal: AbortSignal | null
) => ({
  headers: {
    'Content-Type': 'application/json',
    ...createAuthorisation(isAuthorised, getState),
  },
  method,
  ...createBody(bodyObj),
  ...createAbortController(abortControllerSignal),
});

export const fetchBase = async <T>(
  method: RequestMethod = RequestMethod.GET,
  endpointPath: string,
  bodyObj: Object = {},
  isAuthorised: boolean = false,
  abortControllerSignal: AbortSignal | null = null,
  getState: () => RootState
): Promise<T> => {
  const url = createUrl(endpointPath);
  const fetchOptions = createFetchOptions(
    method,
    bodyObj,
    isAuthorised,
    getState,
    abortControllerSignal
  );

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const { status, statusText } = response;
    throw new Error(`${status}: ${statusText}`);
  }

  const res = await response.json();

  return res;
};
