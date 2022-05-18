import axios from '../axios';

export default function removeProduct(params) {
  return axios.delete(`/products/${params}`);
}
