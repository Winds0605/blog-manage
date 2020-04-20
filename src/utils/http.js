import axios from 'axios';
import { message } from 'antd'

// 新创建一个axios实例，并进行基础配置
var instance = axios.create({
    baseURL: 'http://localhost:3030',
    timeout: 5000,
    // headers: {'X-Requested-With': 'XMLHttpRequest'}
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    // 再次设置tkoen或者添加loading等请求前的操作
    const token = localStorage.getItem('token')
    // 添加一个loading
    if (token) {
        //设置统一的request header
        config.headers.Authorization = token
    }
    return config;
})

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 对响应错误做点什么
        if (error.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('state')
            message.warning('身份信息已过期 请重新登录')
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        } else {
            message.error('发生未知错误')
        }
        return Promise.reject(error);
    }
)


/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
var get = function (url, params) {
    return new Promise((resolve, reject) => {
        // {
        //   params: params
        // }
        instance
            .get(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
var post = function (url, data) {
    return new Promise((resolve, reject) => {
        // qs.stringify(data)
        instance
            .post(url, data)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
export {
    get, post
}
