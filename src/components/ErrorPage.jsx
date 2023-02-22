import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorMessage, errorStatus }) => {
  return (
    <Box
      sx={{
        minHeight: '90.5vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {errorStatus === 404 ? (
        <Typography
          variant='h6'
          textAlign='center'
          mb={2}
          sx={{ color: '#fff' }}
        >
          This page is not available.
          <br /> Try looking for something else above in search field.
        </Typography>
      ) : (
        <Typography variant='h4' mb={2} sx={{ color: '#fff' }}>
          {errorMessage}
        </Typography>
      )}
      <Typography variant='h6' sx={{ color: '#fff' }}>
        return to home page:{'  '}
        <Link to='/'>
          <Button
            variant='outlined'
            style={{ color: '#fff', borderColor: 'red' }}
          >
            youtube
          </Button>
        </Link>
      </Typography>
    </Box>
  );
};

export default ErrorPage;
