import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { useAppDispatch } from '@/store/hooks';
import { createRoom } from '@/store/room/actions';
import { paths } from '@/utils/paths';

const Lobby = () => {
  // Hooks
  const router = useRouter();
  const dispatch = useAppDispatch();

  const join = () => {
    router.push(paths.join);
  };

  const host = async () => {
    try {
      const wasRoomCreated = await dispatch(createRoom());
      if (wasRoomCreated) {
        router.push(paths.room);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack sx={{ gap: 4 }}>
      <Button variant="outlined" onClick={join}>
        Join
      </Button>
      <Button variant="outlined" onClick={host}>
        Host
      </Button>
    </Stack>
  );
};

export default Lobby;
