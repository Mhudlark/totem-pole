import { dbConfig } from '../../dbConfig';
import type { Supabase } from '../../types';
import type { RoomSchema } from '../schemas/types';

/**
 * Insert a new room into the DB
 * @param {Supabase} supabase The Supabase client
 */
export const insertRoomInDB = async (
  supabase: Supabase
): Promise<RoomSchema> => {
  try {
    const { data, error } = await supabase
      .from(dbConfig.channels.rooms.channel)
      .insert({})
      .select();

    if (error)
      throw new Error(
        `${error.message} ============= ${error.hint} ============= ${error.details}`
      );

    return data?.[0] as RoomSchema;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error adding room');
  }
};
