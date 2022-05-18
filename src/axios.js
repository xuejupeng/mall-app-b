import axios from 'axios';

const appkey = 'xuejp_1631502225673';

const instance = axios.create({
  baseURL: ' https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((res) => {
  if (!res.url.includes('passport')) {
    return {
      ...res,
      params: {
        ...res.params,
        appkey,
      },
    };
  }
  return res;
});

export default instance;
