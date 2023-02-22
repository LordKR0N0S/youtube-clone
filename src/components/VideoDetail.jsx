import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Videos, ErrorPage } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import ReactPlayer from 'react-player';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState({
    detail: {},
    errorMessage: '',
    errorStatus: 0,
  });
  const [fetchedVideos, setFetchedVideos] = useState({
    videos: [],
    errorMessage: '',
    errorStatus: 0,
  });

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((response) =>
      setVideoDetail({
        detail: response?.data?.items[0],
        errorMessage: response?.message,
        errorStatus: response?.response?.status,
      })
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (response) =>
        setFetchedVideos({
          videos: response?.data?.items,
          errorMessage: response?.message,
          errorStatus: response?.response?.status,
        })
    );
  }, [id]);

  if (videoDetail.errorMessage) {
    return (
      <ErrorPage
        errorMessage={videoDetail.errorMessage}
        errorStatus={videoDetail.errorStatus}
      />
    );
  }

  if (!videoDetail?.detail?.snippet) return 'Loading...';

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail.detail;

  return (
    <Box minHeight='91vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%' }}>
            <div className='player-wrapper'>
              <ReactPlayer
                className='react-player'
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width='100%'
                height='100%'
                playbackRate={1}
              />
            </div>
            {/* <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              playbackRate
              width='100%'
              height='100%'
            /> */}
            <Typography color='#FFF' variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ color: '#fff' }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: 'subtitle1', md: 'h6' }}
                  color='#fff'
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
                  />
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent='center'
          alignItems='center'
        >
          {fetchedVideos.errorMessage ? (
            <Typography variant='body1' sx={{ color: 'red' }}>
              Server error. Cant fetch list of videos from the server
            </Typography>
          ) : (
            <Videos videos={fetchedVideos.videos} direction='column' />
          )}{' '}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
