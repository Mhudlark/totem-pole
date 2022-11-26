import { dbConfig } from '../dbConfig';
import type { Supabase } from '../types';
import { messagesSchema } from './schemas/messages';
import { roomsSchema } from './schemas/rooms';
import type { MessageSchema, RoomSchema } from './schemas/types';

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
  roomId: string,
  setState: (data: any) => void
): Promise<RoomSchema[]> => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.rooms.channel)
      .select(`*`)
      .eq(roomsSchema.room_id, roomId);

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    console.log(data);
    const room = data?.[0];
    if (setState) setState(room);
    return room as RoomSchema[];
  } catch (error) {
    console.log('error', error);
    throw new Error('Error fetching users');
  }
};

/**
 * Fetch the users for a given room
 * @param {Supabase} supabase The Supabase client
 * @param {number} roomId The room id
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUsers = async (
  supabase: Supabase,
  roomId: string,
  setState: (data: any) => void
): Promise<any[]> => {
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

    console.log(data);
    const room = data?.[0];
    if (setState) setState(room);
    // return room;
    return [{}];
  } catch (error) {
    console.log('error', error);
    throw new Error('Error fetching users');
  }
};
