import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { SideBar, Videos, ErrorPage } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [fetchedData, setFetchedData] = useState({
    videos: [],
    errorMessage: '',
    errorStatus: 0,
  });

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then(
      (response) => {
        setFetchedData({
          videos: response?.data?.items,
          errorMessage: response?.message,
          errorStatus: response?.response?.status,
        });
      }
    );
  }, [selectedCategory]);

  if (fetchedData.errorMessage) {
    return (
      <ErrorPage
        errorMessage={fetchedData.errorMessage}
        errorStatus={fetchedData.errorStatus}
      />
    );
  }

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      <Box
        sx={{
          height: { sx: 'auto', md: '87vh' },
          borderRight: '1px solid #3d3d3d',
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className='copyright'
          variant='body2'
          sx={{ mt: 1.5, color: '#fff' }}
        >
          Copyright 2022 JSM Media
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: 'auto', height: '87vh', flex: 2 }}>
        <Typography
          variant='h4'
          fontWeight='bold'
          mb={2}
          sx={{ color: 'white' }}
        >
          {selectedCategory} <span style={{ color: '#F31503' }}>videos</span>
        </Typography>
        <Videos videos={fetchedData.videos} justifyContent='start' />
      </Box>
    </Stack>
  );
};

export default Feed;
