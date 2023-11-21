import axios from 'axios';

const API_KEY = '40793813-4badbd87472667f43f05f26d6';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (searchQuery, perPage) => {
  const { data } = await axios.get('', {
    params: {
      q: searchQuery,
      key: API_KEY,
      per_page: perPage,
    },
  });

  return data;
};
