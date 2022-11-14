import { Button, Stack } from '@mui/material';

const Lobby = () => {
  const join = () => {
    console.log('join');
  };

  const host = () => {
    console.log('host');
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
