import { Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { ApplicationStore } from '@/store/sharedHelpers';
import { setUsername } from '@/store/user/actions';
import { useDebounce } from '@/utils/hooks';
import { validateUsername } from '@/utils/validation';

const Index = () => {
  // Hooks
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux states
  const username = useSelector(
    (state: ApplicationStore) => state.user.username
  );

  // Local states
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const updateUsername = (newUsername: string) => {
    dispatch(setUsername(newUsername));
    setIsUsernameValid(validateUsername(newUsername));
  };

  const updateUsernameDebounced = useDebounce(updateUsername, 150);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    // Debounce change updates
    updateUsernameDebounced(newUsername);
  };

  const onStart = () => {
    console.log('start');
    console.log(username);

    // TODO: Get user id from backend
    const userId = '12345';

    console.log('userId:', userId);
    router.push('/lobby');
  };

  return (
    <Stack sx={{ gap: 4 }}>
      <TextField onChange={onUsernameChange} />
      <Button variant="outlined" onClick={onStart} disabled={!isUsernameValid}>
        Get started
      </Button>
    </Stack>
  );
};

export default Index;
