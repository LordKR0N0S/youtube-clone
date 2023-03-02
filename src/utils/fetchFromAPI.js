import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: { part: 'snippet', videoId: 'M7FIvfx5J10', maxResults: '50' },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error
    } else if (error.request) {
      console.log(error.request);
      return error
    } else {
      console.log('Error', error.message);
    }
    console.log(error);
  }
};
