export enum ChannelStatus {
  subscribed = 'SUBSCRIBED',
  timedOut = 'TIMED_OUT',
  closed = 'CLOSED',
  error = 'CHANNEL_ERROR',
}

export const RealtimeChannelTypes = {
  broadcast: 'broadcast',
  presence: 'presence',
} as const;

export type RealtimeChannelType =
  typeof RealtimeChannelTypes[keyof typeof RealtimeChannelTypes];

// Presence channel

export enum PresenceChannelEvent {
  sync = 'sync',
  join = 'join',
  leave = 'leave',
}

type Presence = {
  presence_ref: string;
  [key: string]: any;
};

export interface CustomPresence extends Presence {
  userMetadata: {
    key: string;
    username: string;
  };
}

// Broadcast channel

export enum BroadcastChannelEvent {
  create = 'CREATE',
  join = 'JOIN',
  leave = 'LEAVE',
}

export interface BroadcastChannelSendBody {
  type: RealtimeChannelType;
  event: BroadcastChannelEvent;
  payload: any;
}
