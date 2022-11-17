import { RequestMethod } from '@/backend/api/helpers';

// eslint-disable-next-line no-restricted-globals
export const baseApiPath = `http://localhost:3000`;

const createUrl = (endpointPath: string) => `${baseApiPath}/api${endpointPath}`;

type CreateBody = (bodyObj: Object) => { body: string } | {};

const createBody: CreateBody = (bodyObj) => {
  return Object.keys(bodyObj).length ? { body: JSON.stringify(bodyObj) } : {};
};

type CreateAuthorisation = (
  isAuthorised: boolean
) => { Authorization: string } | {};

const createAuthorisation: CreateAuthorisation = (isAuthorised) => {
  return isAuthorised
    ? {
        Authorization: `Bearer userReducer.currentUser.token`,
      }
    : {};
};

type CreateAbortController = (
  abortControllerSignal?: AbortSignal
) => { signal: AbortSignal } | {};

const createAbortController: CreateAbortController = (
  abortControllerSignal
) => {
  return abortControllerSignal ? { signal: abortControllerSignal } : {};
};

const createFetchOptions = (
  method: RequestMethod,
  bodyObj: Object,
  isAuthorised: boolean,
  abortControllerSignal?: AbortSignal
) => ({
  headers: {
    'Content-Type': 'application/json',
    ...createAuthorisation(isAuthorised),
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
  abortControllerSignal?: AbortSignal
): Promise<T> => {
  const url = createUrl(endpointPath);
  const fetchOptions = createFetchOptions(
    method,
    bodyObj,
    isAuthorised,
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
