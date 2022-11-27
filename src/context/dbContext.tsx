import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { deleteUser } from '@/backend/db/database/delete';
import { fetchRoom, fetchUsers } from '@/backend/db/database/get';
import { useMessagesListener } from '@/backend/db/database/hooks/useMessagesListener';
import { useRoomListener } from '@/backend/db/database/hooks/useRoomListener';
import type { UserSchema } from '@/backend/db/database/schemas/types';
import { addMessage, addRoom, addUser } from '@/backend/db/database/set';
import { addUserToRoom } from '@/backend/db/database/update';
import type { ChatMessage, Room, User } from '@/sharedTypes';
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

  const onJoin = (newUsers: User[]) => {
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

    const userInfo = await addUserToRoom(
      supabase,
      user.userId,
      roomInfo.room_id
    );

    console.log('userInfo', userInfo);

    dispatch(
      setRoom({
        roomName: roomInfo.room_id,
        roomId: roomInfo.room_id,
        users: [user],
        chatMessages: [],
      })
    );
  };

  const joinRoom = async (roomName: string) => {
    console.log('joinRoom');

    if (!user.userId) return;

    const userInfo = await addUserToRoom(supabase, user.userId, roomName);

    console.log('userInfo', userInfo);

    const roomInfo = await fetchRoom(supabase, userInfo.room_id);

    console.log('roomInfos', roomInfo);

    const usersInfo = await fetchUsers(supabase, userInfo.room_id);

    console.log('usersInfo', usersInfo);

    const roomJoined: Room = {
      roomName: roomInfo.room_id,
      roomId: roomInfo.room_id,
      users: [],
      chatMessages: [],
    };

    dispatch(setRoom(roomJoined));
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

  const handleRoomUsersUpdate = (newUserInfo: UserSchema) => {
    console.log('handleRoomUsersUpdate');
    console.log('newUser', newUserInfo);

    const newUser: User = {
      userId: newUserInfo.user_id,
      username: newUserInfo.username,
    };

    onJoin([newUser]);

    const a = newUserInfo !== undefined ? Math.random() : 0;
    if (a < 0) {
      onLeave([{}]);
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
