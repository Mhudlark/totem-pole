import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { deleteUser } from '@/backend/db/database/delete';
import { useMessagesListener } from '@/backend/db/database/hooks/useMessagesListener';
import { useRoomListener } from '@/backend/db/database/hooks/useRoomListener';
import { addMessage, addRoom, addUser } from '@/backend/db/database/set';
import { addUserToRoom } from '@/backend/db/database/update';
import type { ChatMessage } from '@/sharedTypes';
import { initUser } from '@/sharedUtils/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addUsersToRoom,
  removeUsersFromRoom,
  resetRoom,
  setRoom,
} from '@/store/room/actions';
import { setUserId, setUsername } from '@/store/user/actions';

export type DbContextType = {
  login: (username: string) => Promise<void>;
  createRoom: () => Promise<void>;
  joinRoom: (roomName: string) => Promise<void>;
  leaveRoom: () => Promise<void>;
  sendChatMessage: (message: string) => Promise<void>;
  chatMessages: ChatMessage[];
};

const DbContextInitialValue: DbContextType = {
  login: (_username) => Promise.resolve(),
  createRoom: () => Promise.resolve(),
  joinRoom: (_roomName) => Promise.resolve(),
  leaveRoom: () => Promise.resolve(),
  sendChatMessage: (_message) => Promise.resolve(),
  chatMessages: [],
};

export const DbContext = createContext<DbContextType>(DbContextInitialValue);

export type DbProviderProps = { children: ReactNode };

const DbProvider = ({ children }: DbProviderProps) => {
  const dispatch = useAppDispatch();

  const supabase = useSupabaseClient();

  const { user, room } = useAppSelector((state) => state);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const onJoin = (payload: any[]) => {
    const newUsers = payload.map((clientPayload) => {
      return initUser(clientPayload.user.userId, clientPayload.user.username);
    });

    dispatch(addUsersToRoom(newUsers));
  };

  const onLeave = (payload: any[]) => {
    const leftUsersUsernames = payload.map(
      (presence) => presence.user.username
    );

    dispatch(removeUsersFromRoom(leftUsersUsernames));
  };

  const unsubscribeAllChannels = () => {
    supabase.removeAllChannels();
  };

  const login = async (username: string) => {
    console.log('login');

    dispatch(setUsername(username));

    const userInfo = await addUser(supabase, username);

    console.log('userInfo', userInfo);

    if (userInfo?.user_id) dispatch(setUserId(userInfo.user_id));
  };

  const createRoom = async () => {
    console.log('createRoom');

    const roomInfo = await addRoom(supabase);

    console.log('roomInfo', roomInfo);

    dispatch(
      setRoom({
        roomName: roomInfo.room_id,
        roomId: roomInfo.room_id,
        users: [],
        chatMessages: [],
      })
    );
  };

  const joinRoom = async (roomName: string) => {
    console.log('joinRoom');

    const out = await addUserToRoom(supabase, '', roomName);

    console.log('out', out);

    // dispatch(setRoomName(roomName));
  };

  const leave = async () => {
    if (user.userId) await deleteUser(supabase, user.userId);

    dispatch(resetRoom());
    unsubscribeAllChannels();
  };

  const sendChatMessage = async (message: string) => {
    console.log('sendChatMessage');

    const out = await addMessage(
      supabase,
      message,
      room.roomName,
      user.username
    );

    console.log('out', out);
  };

  const handleRoomUsersUpdate = (payload: any) => {
    console.log('handleRoomUsersUpdate');
    console.log('payload', payload);

    const a = payload !== undefined ? Math.random() : 0;
    if (a < 0) {
      onLeave([{}]);
    } else if (a > 1) {
      onJoin([{}]);
    }
  };

  const handleMessagesUpdate = (payload: any) => {
    console.log('handleMessagesUpdate');
    console.log('payload', payload);

    setChatMessages([]);
  };

  useEffect(() => {
    return () => {
      leave();
    };
  }, []);

  useRoomListener(
    supabase,
    room?.roomName !== undefined,
    room.roomName,
    handleRoomUsersUpdate
  );

  useMessagesListener(
    supabase,
    room?.roomName !== undefined,
    room.roomName,
    handleMessagesUpdate
  );

  return (
    <DbContext.Provider
      value={{
        login,
        createRoom,
        joinRoom,
        leaveRoom: leave,
        sendChatMessage,
        chatMessages,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};

export default DbProvider;

export const useDbContext = () => useContext(DbContext);
