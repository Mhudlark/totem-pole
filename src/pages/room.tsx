import { Box, Stack, Typography } from '@mui/material';

import { useAppSelector } from '@/store/hooks';

const Index = () => {
  // Redux states
  const room = useAppSelector((state) => state.room);

  return (
    <Stack sx={{ gap: 4 }}>
      <Typography>{room.roomName}</Typography>
      <Stack sx={{ gap: 1 }}>
        {Array.isArray(room?.users) &&
          room.users.map((user) => (
            <Box key={user.username}>{user.username}</Box>
          ))}
      </Stack>
    </Stack>
  );
};

export default Index;
