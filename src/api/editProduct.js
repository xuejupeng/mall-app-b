import axios from '../axios';

export default function editProduct(params) {
  return axios.put('/products/edit', params);
}
