import type { RealtimeChannel } from '@supabase/realtime-js';
import { useEffect, useState } from 'react';

import { dbConfig } from '../../dbConfig';
import type { Supabase } from '../../types';
import type { UserSchema } from '../schemas/types';
import { usersSchema } from '../schemas/users';
import { PostGresEventType } from '../types';

export const useRoomListener = (
  supabase: Supabase,
  isInRoom: boolean,
  roomId?: string,
  onSync?: (newUser: UserSchema) => void
) => {
  const [usersChannel, setUsersChannel] = useState<RealtimeChannel | null>(
    null
  );

  useEffect(() => {
    if (isInRoom && roomId) {
      const usersConfig = dbConfig.channels.users;

      console.log(
        usersConfig.channel,
        'filter:',
        `${usersSchema.room_id}=eq.${roomId}`
      );

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
          (payload) => onSync?.(payload.new as UserSchema)
        )
        .subscribe((subscriptionStatus: string) =>
          console.log(
            usersConfig.channel,
            'subscriptionStatus:',
            subscriptionStatus
          )
        );

      setUsersChannel(channel);
    }

    return () => {
      if (usersChannel !== null) {
        usersChannel.unsubscribe();
      }
    };
  }, [isInRoom, roomId]);
};
