import React from 'react';
import { Stack, Box } from '@mui/material';
import { VideoCard, ChannelCard } from './';

const Videos = ({ videos, justifyContent, direction }) => {
  if (!videos?.length) return 'Loading...';

  return (
    <Stack
      direction={direction || 'row'}
      gap={2}
      flexWrap='wrap'
      justifyContent={justifyContent}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
