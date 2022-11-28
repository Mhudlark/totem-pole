import { dbConfig } from '../dbConfig';
import type { Supabase } from '../types';
import { messagesSchema } from './schemas/messages';
import { roomsSchema } from './schemas/rooms';
import type { MessageSchema, RoomSchema, UserSchema } from './schemas/types';

/**
 * Fetch all messages and their authors for a given room
 * @param {Supabase} supabase The Supabase client
 * @param {string} roomId The room id
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (
  supabase: Supabase,
  roomId: string,
  setState: (data: any) => void
): Promise<MessageSchema[]> => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.messages.channel)
      // .select(`*, author:user_id(*)`)
      .select(`*`)
      .eq(messagesSchema.room_id, roomId)
      .order(messagesSchema.created_at, { ascending: true });

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    console.log(data);
    if (setState) setState(data);
    return data as MessageSchema[];
  } catch (error) {
    console.log('error', error);
    throw new Error('Error fetching messages');
  }
};

/**
 * Fetch a room with the given roomId
 * @param {Supabase} supabase The Supabase client
 * @param {string} roomId The room id
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchRoom = async (
  supabase: Supabase,
  roomId: string
): Promise<RoomSchema> => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.rooms.channel)
      .select(`*`)
      .eq(roomsSchema.room_id, roomId);

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    const room = data?.[0];
    return room as RoomSchema;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error fetching users');
  }
};

export type RoomWithUsersSchema = RoomSchema & { users: UserSchema[] };

/**
 * Fetch the users for a given room
 * @param {Supabase} supabase The Supabase client
 * @param {string} roomId The room id
 */
export const fetchUsers = async (
  supabase: Supabase,
  roomId: string
): Promise<RoomWithUsersSchema> => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.rooms.channel)
      .select(
        `
      *,
      ${dbConfig.channels.users.table} (
        *
      )
    `
      )
      .eq(roomsSchema.room_id, roomId);

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    const room = data?.[0];
    return room as unknown as RoomWithUsersSchema;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error fetching users');
  }
};

export type AllRoomSchema = RoomWithUsersSchema & { messages: MessageSchema[] };

/**
 * Fetch a given room
 * @param {Supabase} supabase The Supabase client
 * @param {string} roomId The room id
 */
export const fetchAllRoomFromDB = async (
  supabase: Supabase,
  roomId: string
): Promise<AllRoomSchema> => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.rooms.channel)
      .select(
        `
      *,
      ${dbConfig.channels.users.table} (
        *
      ),
      ${dbConfig.channels.messages.table} (
        *
      )
    `
      )
      .eq(roomsSchema.room_id, roomId);

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    const room = data?.[0];
    return room as unknown as AllRoomSchema;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error fetching users');
  }
};
