export const dbConfig = {
  // The number of realtime db event updates per second
  defaultEventsPerSecond: 5,
  realtime: {
    broadcast: {
      // The interval between broadcasts as a publisher on realtime db, in ms
      defaultBroadcastPublishInterval: 200,
    },
  },
};
