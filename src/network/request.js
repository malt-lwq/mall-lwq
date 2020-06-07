import axios from 'axios';

export function request(config) {

  //创建一个axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 6000
  });

  //添加请求拦截器
  instance.interceptors.request.use(config => {
    return config;
  }, error => {
    console.log(error);
  });

  //添加相应拦截器
  instance.interceptors.response.use(rs => {
    return rs.data;
  }, error => {
    console.log(error);
  });

  return instance(config);

}
