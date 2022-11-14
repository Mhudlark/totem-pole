import { Button, Stack, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Index = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const updateUsername = (newUsername: string) => {
    console.log(newUsername);
    setUsername(newUsername);

    // Check if username already exists - backend
    // If it does, show error
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    const newUsername = event.target.value;

    // check if username is valid
    // if so, enable the join button
    setIsUsernameValid(newUsername !== '');

    // Debounce whatever change updates
    debounce(() => updateUsername(newUsername), 500);
  };

  const onStart = () => {
    console.log('start');
    console.log(username);
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
