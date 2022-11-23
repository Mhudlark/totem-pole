import type {
  RealtimeChannel,
  RealtimePresenceState,
} from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { generateRoomName } from '@/backend/room/util';
import { initUser } from '@/sharedUtils/user';
import { openAlert } from '@/store/alerts/actions';
import { AlertType } from '@/store/alerts/helpers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addUsersToRoom,
  removeUsersFromRoom,
  setRoomName,
} from '@/store/room/actions';

import { dbConfig } from '../backend/db/config';
import type { CustomPresence } from '../backend/db/helpers';
import {
  ChannelStatus,
  PresenceChannelEvent,
  PresenceTrackStatus,
  RealtimeChannelTypes,
} from '../backend/db/helpers';

export type DbContextType = {
  createRoom: () => Promise<void>;
  joinRoom: (roomName: string) => Promise<void>;
  leaveRoom: () => Promise<void>;
};

const DbContextInitialValue: DbContextType = {
  createRoom: () => Promise.resolve(),
  joinRoom: (_roomName: string) => Promise.resolve(),
  leaveRoom: () => Promise.resolve(),
};

export const DbContext = createContext<DbContextType>(DbContextInitialValue);

export type DbProviderProps = { children: ReactNode };

const DbProvider = ({ children }: DbProviderProps) => {
  const dispatch = useAppDispatch();

  const { user, room } = useAppSelector((state) => state);

  const [channels, setChannels] = useState<Record<string, RealtimeChannel>>({});

  const supabase = useMemo(
    () =>
      createClient(
        process.env.NEXT_PUBLIC_DB_URL as string,
        process.env.NEXT_PUBLIC_DB_API_KEY as string,
        {
          realtime: {
            params: {
              eventsPerSecond: dbConfig.defaultEventsPerSecond,
            },
          },
        }
      ),
    []
  );

  const pushChannel = (channelName: string, channel: RealtimeChannel) => {
    setChannels((prev) => ({ ...prev, [channelName]: channel }));
  };

  /**
   * Called whenever a user (including this user) joins the current room.
   * @param payload
   */
  const onJoin = (payload: CustomPresence[]) => {
    const newUsers = payload.map((presence) => {
      return initUser(presence.userMetadata.username);
    });

    dispatch(addUsersToRoom(newUsers));
  };

  const onSync = (roomName: string, payload: RealtimePresenceState) => {
    console.log('on sync');
    console.log('roomName:', roomName);
    console.log(payload);
  };

  /**
   * Called whenever a user leaves the current room
   * @param payload
   */
  const onLeave = (payload: CustomPresence[]) => {
    const leftUsersUsernames = payload.map(
      (presence) => presence.userMetadata.username
    );

    dispatch(removeUsersFromRoom(leftUsersUsernames));
  };

  const addPresenceChannel = async (channelName: string) => {
    const channel = supabase.channel(channelName);
    pushChannel(channelName, channel);

    channel.on(
      RealtimeChannelTypes.presence,
      { event: PresenceChannelEvent.join },
      ({ newPresences }) => onJoin(newPresences as CustomPresence[])
    );
    channel.on(
      RealtimeChannelTypes.presence,
      { event: PresenceChannelEvent.sync },
      () => onSync(channelName, channel.presenceState())
    );
    channel.on(
      RealtimeChannelTypes.presence,
      { event: PresenceChannelEvent.leave },
      ({ leftPresences }) => onLeave(leftPresences as CustomPresence[])
    );
    channel.subscribe(async (status) => {
      if (status === ChannelStatus.subscribed) {
        const onlineStatus = await channel.track(user);

        if (onlineStatus !== PresenceTrackStatus.ok) {
          dispatch(
            openAlert(
              AlertType.ERROR,
              'Failed to track user with supabase realtime'
            )
          );
        }
      }
    });
  };

  const createRoom = async () => {
    console.log('createRoom');

    const roomName = generateRoomName();

    dispatch(setRoomName(roomName));
    await addPresenceChannel(roomName);
  };

  const joinRoom = async (roomName: string) => {
    console.log('joinRoom', roomName);

    dispatch(setRoomName(roomName));
    await addPresenceChannel(roomName);
  };

  const leaveRoom = async () => {
    const { roomName } = room;
    console.log('leaveRoom', roomName);

    dispatch(setRoomName(''));

    const allUsers = room.users.map(
      (roomUser) => roomUser.userMetadata.username
    );

    dispatch(removeUsersFromRoom(allUsers));

    Object.values(channels).forEach((channel) => channel.unsubscribe());
    setChannels({});
  };

  useEffect(() => {
    return () => {
      leaveRoom();
    };
  }, []);

  return (
    <DbContext.Provider value={{ createRoom, joinRoom, leaveRoom }}>
      {children}
    </DbContext.Provider>
  );
};

export default DbProvider;

export const useDbContext = () => useContext(DbContext);
