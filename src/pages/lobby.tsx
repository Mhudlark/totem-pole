import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { paths } from '@/utils/paths';

const Lobby = () => {
  // Hooks
  const router = useRouter();

  const join = () => {
    router.push(paths.join);
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
