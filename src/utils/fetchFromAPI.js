import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
// const BASE_URL = 'https://youtube-v31.p.rapida.com';

const options = {
  params: { part: 'snippet', videoId: 'M7FIvfx5J10', maxResults: '50' },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  console.log(data);
  return data;
};
// export const fetchFromAPI = async (url) => {
//   try {
//     const { data } = await axios.get(`${BASE_URL}/${url}`, options);
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
