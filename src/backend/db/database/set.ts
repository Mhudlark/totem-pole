import { dbConfig } from '../dbConfig';
import type { Supabase } from '../types';
import type { MessageSchema, RoomSchema, UserSchema } from './schemas/types';

/**
 * Insert a new user into the DB
 * @param {Supabase} supabase The Supabase client
 * @param {string} username The username of the user
 */
export const addUser = async (
  supabase: Supabase,
  username: string
): Promise<UserSchema> => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.users.channel)
      .insert([{ username }])
      .select();

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    return data?.[0] as UserSchema;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error adding user');
  }
};

/**
 * Insert a new message into the DB
 * @param {Supabase} supabase The Supabase client
 * @param {string} message The message text
 * @param {string} roomId The room id
 * @param {string} userId The user id
 */
export const addMessage = async (
  supabase: Supabase,
  message: string,
  roomId: string,
  userId: string
): Promise<MessageSchema[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ room_id: roomId, message, author: userId }])
      .select();

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    return data as MessageSchema[];
  } catch (error) {
    console.log('error', error);
    throw new Error('Error adding message');
  }
};

/**
 * Insert a new room into the DB
 * @param {Supabase} supabase The Supabase client
 */
export const addRoom = async (supabase: Supabase): Promise<RoomSchema[]> => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.rooms.channel)
      .insert({})
      .select();

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    console.log(data);
    return data as RoomSchema[];
  } catch (error) {
    console.log('error', error);
    throw new Error('Error adding room');
  }
};
