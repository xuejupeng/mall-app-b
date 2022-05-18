import axios from '../axios';

export default function postProduct(params) {
  return axios.post('/products/add', params);
}
