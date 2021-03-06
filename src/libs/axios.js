import axios from 'axios';

// 创建 axios 实例
const requests = axios.create({
  baseURL: 'http://10.175.2.91:9011/',//正式环境地址
  //baseURL:'https://gps.gjgwhn.com/newAPI/',//正式环境服务器映射到外网的接口 
  //baseURL:'http://192.168.0.189:8088',//本地测试地址
   timeout: 60000 // 请求超时时  
});

// 错误处理函数
const err = (error) => {
  if (error.response) {
    const data = error.response.data;
    if (error.response.status === 403) {
      window.vm.$message({
        type: 'error',
        message: data.message || data.msg,
        showClose: true,                                                                  
        duration: 5000
      });
    }
    if (error.response.status === 401) {
      window.vm.$message({
        type: 'error',
        message: '你没有权限。',
        showClose: true,
        duration: 5000
      });
    }
  }
  return Promise.reject(error);      
};

// request interceptor(请求拦截器)
requests.interceptors.request.use(config => {
  const token = '';
  if (token) {
    config.headers['token'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config;
}, err);

// response interceptor（接收拦截器）
requests.interceptors.response.use((response) => {
  const res = response.data;
  if (res.success != true) {
    window.vm.$message({
      type: 'error',
      message: res.message || res.msg,
      showClose: true,
      duration: 2000
    });
    return Promise.reject('error');
  } else {
    return res;
  }
}, err);

export default requests;


