import type { RealtimeChannel } from '@supabase/realtime-js';
import { useEffect, useState } from 'react';

import { dbConfig } from '../../dbConfig';
import type { Supabase } from '../../types';
import { messagesSchema } from '../schemas/messages';
import { PostGresEventType } from '../types';

export const useMessagesListener = (
  supabase: Supabase,
  isInRoom: boolean,
  roomId?: string,
  onSync?: (payload: any) => void
) => {
  const [messagesChannel, setMessagesChannel] =
    useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (isInRoom && roomId) {
      const messagesConfig = dbConfig.channels.messages;

      const channel = supabase
        .channel(messagesConfig.channel)
        .on(
          'postgres_changes',
          {
            event: PostGresEventType.INSERT,
            schema: messagesConfig.schema,
            table: messagesConfig.table,
            filter: `${messagesSchema.room_id}=eq.${roomId}`,
          },
          (payload) => onSync?.(payload)
        )
        .subscribe();

      setMessagesChannel(channel);
    }

    return () => {
      if (messagesChannel !== null) {
        messagesChannel.unsubscribe();
      }
    };
  }, []);
};
