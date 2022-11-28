import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';

import { DbContext } from '@/context/dbContext';
import { useAppSelector } from '@/store/hooks';

const Index = () => {
  // Redux states
  const { user, room } = useAppSelector((state) => state);

  const { leaveRoom, chatMessages, sendChatMessage } = useContext(DbContext);

  // Local States
  const [chatMessage, setChatMessage] = useState('');

  const sendMessage = async () => {
    if (chatMessage !== '') await sendChatMessage(chatMessage);
    setChatMessage('');
  };

  return (
    <Stack sx={{ gap: 4 }}>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          p: 1.5,
          px: 2,
          backgroundColor: '#ededed',
          borderRadius: 2,
        }}
      >
        <Button variant="outlined" onClick={leaveRoom}>
          Leave
        </Button>
      </Stack>
      <Typography
        variant="h5"
        sx={{
          p: 1.5,
          px: 2,
          backgroundColor: '#ededed',
          borderRadius: 2,
        }}
      >
        {`Room code: ${room.roomName || 'N/A'}`}
      </Typography>
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
          room.users.map((roomUsers) => (
            <Box
              key={roomUsers.username}
              sx={{
                backgroundColor: 'white',
                p: 1,
                px: 2,
                borderRadius: 2,
                width: 'fit-content',
              }}
            >
              {roomUsers.username}
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
          <TextField
            value={chatMessage}
            onChange={(event) => setChatMessage(event.target.value)}
          />
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
                  p: 1,
                  px: 2,
                  borderRadius: 2,
                  width: 'fit-content',
                  alignSelf:
                    msg.author.userId === user.userId
                      ? 'flex-end'
                      : 'flex-start',
                  backgroundColor:
                    msg.author.userId === user.userId ? '#4589fd' : 'white',
                  color: msg.author.userId === user.userId ? 'white' : 'black',
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
