import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [fetchedData, setFetchedData] = useState({
    videos: [],
    errorMessage: '',
  });

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((response) => {
      console.log(response);
      setChannelDetail(response.data?.items[0]);
    });

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (response) => {
        console.log(response);
        setFetchedData({
          videos: response?.data?.items,
          errorMessage: response?.message,
        });
      }
    );
  }, [id]);

  const navigate = useNavigate();
  if (fetchedData.errorMessage) {
    navigate('/errorPage');
    console.log(fetchedData);
  }

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
      <Videos videos={fetchedData.videos} justifyContent='center' />
    </Box>
  );
};

export default ChannelDetail;
