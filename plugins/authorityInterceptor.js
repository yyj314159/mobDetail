import axios from 'axios';
import publicUtil from '~/common/publicUtil.js';
import jQuery from "jquery"
axios.interceptors.request.use(
    config => {
        let Authorization =publicUtil.getcookie('token');
        if (Authorization) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.Authorization = Authorization;
        }
        return config;
    },

    err => {
        return Promise.reject(err);
    }
);
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                // case 401:
                //     // 这里写清除token的代码
                //     router.replace({
                //         path: 'login',
                //         query: {
                //             redirect: router.currentRoute.fullPath
                //         } //登录成功后跳入浏览的当前页面
                //     })
            }
            return Promise.reject(error.response.data)
        } else {
            return Promise.reject(error)
        }
    }
);
export default {
    install(Vue, options) {
        if(jQuery){
            //ajax预处理 后置处理
            jQuery(document).bind("ajaxSend", function(event, request, settings){
                var token = publicUtil.getcookie("token");
                if(token){
                    var headers = settings.headers || {};
                    headers["Authorization"] = token;
                    request.setRequestHeader("Authorization", token);
                    settings.headers = headers;
                }
                request.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
                settings.headers = headers;
            }).bind("ajaxComplete", function(event, xhr, settings){
                if(xhr.status == 401 && xhr.responseText){
                    console.log("未登录！");
                }
            });
        }
    }
}