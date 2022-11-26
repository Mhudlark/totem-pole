import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';

import { DbContext } from '@/context/dbContext';
import { useAppSelector } from '@/store/hooks';

const Index = () => {
  // Redux states
  const room = useAppSelector((state) => state.room);

  const { chatMessages, sendChatMessage } = useContext(DbContext);

  // Local States
  const [chatMessage, setChatMessage] = useState('');

  const sendMessage = async () => {
    if (chatMessage !== '') await sendChatMessage(chatMessage);
    setChatMessage('');
  };

  return (
    <Stack sx={{ gap: 4 }}>
      <Typography>{room.roomName}</Typography>
      <Stack
        sx={{
          gap: 1,
          backgroundColor: '#ededed',
          p: 2,

          borderRadius: 2,
          minHeight: '128px',
        }}
      >
        {Array.isArray(room?.users) &&
          room.users.map((user) => (
            <Box
              key={user.username}
              sx={{
                backgroundColor: 'white',
                p: 1,
                px: 2,
                borderRadius: 2,
                width: 'fit-content',
              }}
            >
              {user.username}
            </Box>
          ))}
      </Stack>
      <Stack sx={{ gap: 1 }} direction="row">
        <Stack
          sx={{
            gap: 1,
            width: '50%',
            backgroundColor: '#ededed',
            p: 2,
            borderRadius: 2,
          }}
        >
          <TextField onChange={(event) => setChatMessage(event.target.value)} />
          <Button variant="outlined" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
        <Stack
          id="chat-messages-container"
          sx={{
            gap: 1,
            width: '50%',
            backgroundColor: '#ededed',
            p: 2,
            borderRadius: 2,
          }}
        >
          {Array.isArray(chatMessages) &&
            chatMessages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: 'white',
                  p: 1,
                  px: 2,
                  borderRadius: 2,
                  width: 'fit-content',
                }}
              >
                {msg.message}
              </Box>
            ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Index;
