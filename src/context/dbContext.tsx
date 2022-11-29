import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useMessagesListener } from '@/backend/db/database/hooks/useMessagesListener';
import { useRoomListener } from '@/backend/db/database/hooks/useRoomListener';
import { deleteMessagesForRoomFromDB } from '@/backend/db/database/messages/delete';
import { insertMessageIntoDB } from '@/backend/db/database/messages/insert';
import { deleteRoomFromDB } from '@/backend/db/database/room/delete';
import { insertRoomIntoDB } from '@/backend/db/database/room/insert';
import { selectRoomFromDB } from '@/backend/db/database/room/select';
import type {
  MessageSchema,
  UserSchema,
} from '@/backend/db/database/schemas/types';
import { deleteUserFromDB } from '@/backend/db/database/user/delete';
import { insertUserIntoDB } from '@/backend/db/database/user/insert';
import { updateUserRoomIdInDB } from '@/backend/db/database/user/update';
import type { ChatMessage, Room, User } from '@/sharedTypes';
import { initChatMessageFromAuthorId } from '@/sharedUtils/chatMessage';
import { initUser } from '@/sharedUtils/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addUsersToRoom,
  removeUserFromRoom,
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

  const onLeave = (deletedUserId: string) => {
    dispatch(removeUserFromRoom(deletedUserId));
  };

  const unsubscribeAllChannels = () => {
    supabase.removeAllChannels();
  };

  const login = async (username: string) => {
    console.log('login');

    dispatch(setUsername(username));

    const userInfo = await insertUserIntoDB(supabase, username);

    console.log('userInfo', userInfo);

    if (userInfo?.user_id) dispatch(setUserId(userInfo.user_id));
  };

  const createRoom = async () => {
    console.log('createRoom');

    const roomInfo = await insertRoomIntoDB(supabase);

    console.log('roomInfo', roomInfo);

    const userInfo = await updateUserRoomIdInDB(
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

    const userInfo = await updateUserRoomIdInDB(
      supabase,
      user.userId,
      roomName
    );
    console.log('userInfo', userInfo);

    const roomInfo = await selectRoomFromDB(supabase, userInfo.room_id);
    console.log('roomInfo', roomInfo);

    const roomUsers = roomInfo.users.map((roomUser) =>
      initUser(roomUser.user_id, roomUser.username)
    );
    const roomChatMessages = roomInfo.messages.map((roomMessage) =>
      initChatMessageFromAuthorId(
        roomMessage.message_id,
        roomMessage.message,
        roomMessage.author,
        roomUsers
      )
    );

    const roomJoined: Room = {
      roomName: roomInfo.room_id,
      roomId: roomInfo.room_id,
      users: roomUsers,
      chatMessages: roomChatMessages,
    };

    dispatch(setRoom(roomJoined));
  };

  const leave = async () => {
    console.log('leave');

    const isRoomEmpty = room.users.length === 1;

    // Delete messages first (foreign key)
    if (isRoomEmpty) {
      await deleteMessagesForRoomFromDB(supabase, room.roomId);
    }

    // Delete user next (foreign key)
    if (user.userId) await deleteUserFromDB(supabase, user.userId);

    // Delete room last
    if (isRoomEmpty) {
      await deleteRoomFromDB(supabase, room.roomId);
    }

    dispatch(resetRoom());
    unsubscribeAllChannels();
  };

  const sendChatMessage = async (message: string) => {
    console.log('sendChatMessage');

    const out = await insertMessageIntoDB(
      supabase,
      message,
      room.roomId,
      user.userId
    );

    console.log('out', out);
  };

  const handleRoomUsersUpdate = useCallback(
    (newUserInfo: UserSchema) => {
      console.log('handleRoomUsersUpdate');
      console.log('newUserInfo', newUserInfo);

      const newUser: User = {
        userId: newUserInfo.user_id,
        username: newUserInfo.username,
      };

      onJoin([newUser]);
    },
    [onJoin]
  );

  const handleRoomUsersDelete = useCallback(
    (deletedUserId: string) => {
      console.log('handleRoomUsersDelete');
      console.log('deletedUserId', deletedUserId);
      onLeave(deletedUserId);
    },
    [onLeave]
  );

  const handleMessagesUpdate = useCallback(
    (newMessageInfo: MessageSchema) => {
      console.log('handleMessagesUpdate');
      console.log('newMessageInfo', newMessageInfo);

      const author = room.users.find(
        (roomUser) => roomUser.userId === newMessageInfo.author
      );

      if (!author)
        throw new Error(
          `Chat message author '${newMessageInfo.author}' not found`
        );

      const newMessage: ChatMessage = {
        messageId: newMessageInfo.message_id,
        message: newMessageInfo.message,
        author: author as User,
      };

      setChatMessages((prevChatMessages) => [...prevChatMessages, newMessage]);
    },
    [room]
  );

  useEffect(() => {
    return () => {
      leave();
    };
  }, []);

  useRoomListener(
    supabase,
    room?.roomName !== undefined,
    room.roomName,
    handleRoomUsersUpdate,
    handleRoomUsersDelete
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
