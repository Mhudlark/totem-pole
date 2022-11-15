import { debounce, throttle } from 'lodash';
import { useCallback } from 'react';

import type { AnyFunction } from './sharedTypes';

export const useDebounce = (fn: AnyFunction, wait: number = 500) => {
  return useCallback(debounce(fn, wait), [wait]);
};

export const useThrottle = (fn: AnyFunction, wait: number = 500) => {
  return useCallback(throttle(fn, wait), [wait]);
};
