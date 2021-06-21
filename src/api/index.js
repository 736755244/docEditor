import promise from 'es6-promise';
promise.polyfill();
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// axios 配置
axios.defaults.timeout = 60000;
axios.defaults.baseURL = 'http://172.16.10.112:8080/Pmt/';
// axios.defaults.baseURL = 'http://localhost:2326/Pmt/';
axios.defaults.withCredentials = false;

export function axiosData(url, method, data, config) {
    var that = this;
    if (JSON.parse(sessionStorage.getItem("userinfo") != null)) {
        axios.defaults.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "token": JSON.parse(sessionStorage.getItem("userinfo")).token || "",
            "time": new Date().getTime(),
            "timestamp": JSON.parse(sessionStorage.getItem("userinfo")).timestamp || "",
        }
    }
    return new Promise((resolve, reject) => {
        var json;
        if (method === "get") {
            json = {
                params: data,
                // headers: {
                //     'content-type': 'application/json',
                //     "token": '14a1347f412b39f'  //token换成从缓存获取
                // }
            }
        } else if (method === "post") {
            // if (!!localStorage.getItem('userName') && url != 'api/repair/uploadimg') {
            //     json = qs.stringify(_this.$copy(data, { 'username': localStorage.getItem('userName'), 'password': localStorage.getItem('password') }));
            // } else {
            json = qs.stringify(data);
        }
        axios[method](url, json, config)
            .then(res => {
                resolve(res.data);
            }).catch(res => {
                reject(res);
            })
        
        // axios.interceptors.request.use(
        //     config => {
        //         // 判断是否存在token，如果存在的话，则每个http header都加上token
        //         config.headers.token = userInfoS.token;
        //         config.headers.time = new Date().getTime();
        //         config.headers.timestamp = userInfoS.timestamp;
        //         return config;
        //     },

        // );
        // console.error(JSON.parse(sessionStorage.getItem("userinfo")).token)
       
        axios.interceptors.response.use(
            response => {
                return response
            },
            error => {
                if (error.request) {
                    if (error.request.status == 403) {
                        console.error(1)
                        setTimeout(() => {
                        location.reload();
                       localStorage.clear();
                        that.$router.push("/login");
                        }, 600);
                    }
                } else if (error.response) {
                
                }
                if (error && error.response) {
                    switch (error.response.status) {
                        case 403: error.message = "拒绝访问(403)"; break;
                    }
                } else {
                    error.message = "连接服务器失败!"
                }
                return Promise.reject(error)
            }
        )
    })
}

export default {
    //查询
    getList(data) {
        return axiosData('Api/Account/GetArticleList', data.type, data.data)
    },
    //模糊查询
    getByTitle(data) {
        return axiosData('Api/Account/getArticleByTitle', data.type, data.data)
    },
    //精确查询
    getByID(data) {
        return axiosData('Api/Account/getArticleByID', data.type, data.data)
    },
    //保存
    saveArt(data) {
        return axiosData('Api/Account/saveArticle', data.type, data.data)
    },
}