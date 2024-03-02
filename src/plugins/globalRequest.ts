/**
 * request
 * https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from "antd";



/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'production' ? 'http://49.235.128.21:8080/' : undefined,
  // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`Request URL: ${url}`);
  return {
    url,
    options: {
      ...options,
      headers: {
      },
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if(res.code === 0) {
    return res.data;
  } else {
    message.error(res.description);
  }
  // if(res.code === 40000) {
  //   message.error('Please Login in!');
  //   // history.replace({
  //   //   pathname: stringfy({
  //   //     redirect: location.pathname,
  //   //   })
  //   // });
  // } else {
  //   message.error(res.description);
  // }
  return res.data;
});

export default request;
