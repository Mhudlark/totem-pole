import { Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useDebounce } from '@/utils/hooks';
import { paths } from '@/utils/paths';
import { validateRoomName } from '@/utils/validation';

const Index = () => {
  // Hooks
  const router = useRouter();

  // Local states
  const [roomName, setRoomName] = useState('');
  const [isRoomNameValid, setIsRoomNameValid] = useState(false);

  const updateRoomName = (newRoomName: string) => {
    setRoomName(newRoomName);
    setIsRoomNameValid(validateRoomName(newRoomName));
  };

  const updateRoomNameDebounced = useDebounce(updateRoomName, 150);

  const onRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRoomName = event.target.value;
    // Debounce change updates
    updateRoomNameDebounced(newRoomName);
  };

  const onJoin = () => {
    console.log('join');
    console.log(roomName);

    // TODO: Get room info object from backend
    const room = {};

    console.log('room:', room);
    router.push(paths.room);
  };

  return (
    <Stack sx={{ gap: 4 }}>
      <TextField onChange={onRoomNameChange} />
      <Button variant="outlined" onClick={onJoin} disabled={!isRoomNameValid}>
        Join
      </Button>
    </Stack>
  );
};

export default Index;
