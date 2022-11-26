import type { Supabase } from '../types';

/**
 * Delete a channel from the DB
 * @param {number} channel_id
 */
export const deleteChannel = async (supabase: Supabase, channel_id: string) => {
  try {
    const { data } = await supabase
      .from('channels')
      .delete()
      .match({ id: channel_id });
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error deleting channel');
  }
};

/**
 * Delete a message from the DB
 * @param {number} message_id
 */
export const deleteMessage = async (supabase: Supabase, message_id: string) => {
  try {
    const { data } = await supabase
      .from('messages')
      .delete()
      .match({ id: message_id });
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error deleting message');
  }
};
