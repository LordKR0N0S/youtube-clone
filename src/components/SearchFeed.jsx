import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';
import { ErrorPage } from './';

const SearchFeed = () => {
  const [fetchedData, setVideos] = useState({
    videos: [],
    errorMessage: '',
    errorStatus: 0,
  });
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then(
      (response) => {
        setVideos({
          videos: response?.data?.items,
          errorMessage: response?.message,
          errorStatus: response?.response?.status,
        });
      }
    );
  }, [searchTerm]);

  if (fetchedData.errorMessage) {
    return (
      <ErrorPage
        errorMessage={fetchedData.errorMessage}
        errorStatus={fetchedData.errorStatus}
      />
    );
  }

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '86vh', flex: 2 }}>
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color: 'white' }}>
        Search results for:{' '}
        <span style={{ color: '#F31503' }}>{searchTerm}</span>
      </Typography>
      <Videos videos={fetchedData.videos} justifyContent='start' />
    </Box>
  );
};

export default SearchFeed;
