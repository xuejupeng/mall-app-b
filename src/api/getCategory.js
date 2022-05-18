import axios from '../axios';

export default function getCategory(params) {
  return axios.get('/category/all', { params });
}
