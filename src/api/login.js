import axios from '../axios';

export default function login(params) {
  return axios.post('/passport/login', params);
}
