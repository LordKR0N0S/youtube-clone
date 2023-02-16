import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight='95vh'>
      <Box>
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(63,212,251,1) 22%, rgba(229,70,252,1) 78%)',
            height: '300px',
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Videos videos={videos} justifyContent='center' />
    </Box>
  );
};

export default ChannelDetail;
