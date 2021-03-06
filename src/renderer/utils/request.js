import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: 'http://lococo.site/proxy/MarketServer/', // api的base_url
  // baseURL:'http://localhost:8081/MarketServer/',
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  
  
  if (store.getters.token) {
    config.headers.Authorization = `token ${store.state.token}`;
    config.headers['gdufe-shop'] = store.getters.token // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  Message({
    message: error,
    type: 'error',
    duration: 5 * 6000
  });
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})


// respone interceptor
service.interceptors.response.use(
  response => {
    
      const res = response.data;
     
      if (!res.status) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        });
        if (res.code == 1009 || res.code == 1007 || res.code == 4001) {

          // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          //   confirmButtonText: '重新登录',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
            store.dispatch('FedLogOut').then(() => {
              location.reload();// 为了重新实例化vue-router对象 避免bug
            // });
          })
        }else if(res.code === 1003){
          store.dispatch('FedLogOut').then(() => {
              location.reload();// 为了重新实例化vue-router对象 避免bug
            });
        }
        return Promise.reject('error');
      } else {
        return Promise.resolve(res)
      }

  },
  
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
