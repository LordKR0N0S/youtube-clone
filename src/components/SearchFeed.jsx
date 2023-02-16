import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { useParams } from 'react-router-dom';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();
  console.log(useParams());

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchTerm]);

  console.log(videos);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '86vh', flex: 2 }}>
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color: 'white' }}>
        Search results for:{' '}
        <span style={{ color: '#F31503' }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} justifyContent='start' />
    </Box>
  );
};

export default SearchFeed;
