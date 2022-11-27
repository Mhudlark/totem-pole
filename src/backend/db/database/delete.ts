import { dbConfig } from '../dbConfig';
import type { Supabase } from '../types';
import { messagesSchema } from './schemas/messages';
import { roomsSchema } from './schemas/rooms';
import { usersSchema } from './schemas/users';

/**
 * Delete a user from the DB
 * @param {Supabase} supabase The Supabase client
 * @param {string} userId The user id
 */
export const deleteUser = async (supabase: Supabase, userId: string) => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.users.channel)
      .delete()
      .match({ [usersSchema.user_id]: userId });

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error deleting user');
  }
};

/**
 * Delete a room from the DB
 * @param {Supabase} supabase The Supabase client
 * @param {string} roomId The room id
 */
export const deleteRoom = async (supabase: Supabase, roomId: string) => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.rooms.channel)
      .delete()
      .match({ [roomsSchema.room_id]: roomId });

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error deleting room');
  }
};

/**
 * Delete all messages for a given room from the DB
 * @param {Supabase} supabase The Supabase client
 * @param {string} roomId The room id
 */
export const deleteMessagesForRoom = async (
  supabase: Supabase,
  roomId: string
) => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.messages.channel)
      .delete()
      .match({ [messagesSchema.room_id]: roomId });

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error deleting message');
  }
};
