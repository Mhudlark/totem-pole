import type { RealtimeChannel } from '@supabase/realtime-js';
import { useEffect, useState } from 'react';

import { dbConfig } from '../../dbConfig';
import type { Supabase } from '../../types';
import { usersSchema } from '../schemas/users';
import { PostGresEventType } from '../types';

export const useRoomListener = (
  supabase: Supabase,
  isInRoom: boolean,
  roomId?: string,
  onSync?: (payload: any) => void
) => {
  const [usersChannel, setUsersChannel] = useState<RealtimeChannel | null>(
    null
  );

  useEffect(() => {
    if (isInRoom && roomId) {
      const usersConfig = dbConfig.channels.users;

      const channel = supabase
        .channel(usersConfig.channel)
        .on(
          'postgres_changes',
          {
            event: PostGresEventType.UPDATE,
            schema: usersConfig.schema,
            table: usersConfig.table,
            filter: `${usersSchema.room_id}=eq.${roomId}`,
          },
          (payload) => onSync?.(payload)
        )
        .subscribe();

      setUsersChannel(channel);
    }

    return () => {
      if (usersChannel !== null) {
        usersChannel.unsubscribe();
      }
    };
  }, []);
};
