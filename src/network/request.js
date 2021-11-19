import axios from 'axios'

// export function request(config,success,failure){
//     const install=axios.create({
//         baseURL:'http://123.207.32.32:8000',
//         timeOut:5000
//     });

//     install(config)
//     .then(data=>{
//        success(data);
//     }).
//     catch(err=>{
//         failure(err);
//     })

// }

export function request(config) {
    const install = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeOut: 5000
    });
    //     install(config.url)
    //     .then(data=>{
    //         config.success(data);
    //     }).
    //     catch(err=>{
    //         config.error(err);
    //     })
    // }


    // export function request(config){
    //     return new Promise((resolve,reject)=>{
    //         const install=axios.create({
    //             baseURL:'http://123.207.32.32:8000',
    //             timeOut:5000
    //         });

    //         install(config)
    //         .then(data=>{
    //             resolve(data);
    //         }).
    //         catch(err=>{
    //             reject(err);
    //         })
    //     })
    // }

    // export function request(config) {
    //     const install = axios.create({
    //         // http://152.136.185.210:8000/api/z8
    //         baseURL: '',
    //         timeOut: 5000
    //     });
    // 请求拦截
    install.interceptors.request.use(config => {
        return config;
    }, err => {
        return err;
    });
    // 响应拦截
    install.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);

    })

    return install(config)

}