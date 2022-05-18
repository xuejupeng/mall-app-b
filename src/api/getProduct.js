import axios from '../axios';

export default function getProduct(params) {
  return axios.get('/products/all', { params });
}
