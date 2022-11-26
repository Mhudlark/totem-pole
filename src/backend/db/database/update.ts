import { dbConfig } from '../dbConfig';
import type { Supabase } from '../types';
import { usersSchema } from './schemas/users';

/**
 * Insert a new room into the DB
//  * @param {string} roomName The room name
 */
export const addUserToRoom = async (
  supabase: Supabase,
  userId: string,
  roomId: string
) => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.users.channel)
      .update({ [usersSchema.room_id]: roomId })
      .eq(usersSchema.user_id, userId)
      .select();

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error adding channel');
  }
};
