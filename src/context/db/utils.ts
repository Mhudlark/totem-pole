import type {
  BroadcastChannelEvent,
  BroadcastChannelSendBody,
  RealtimeChannelType,
} from './helpers';

export const initChannelBody = (
  type: RealtimeChannelType,
  event: BroadcastChannelEvent,
  payload: any
): BroadcastChannelSendBody => {
  return {
    type,
    event,
    payload,
  };
};
