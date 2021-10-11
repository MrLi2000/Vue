import axios from 'axios';
const instance = axios.create({
    baseURL:"https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd",
    timeout:10000
})
export let post;
post = (url,data = {} )=>{
    return new Promise((res,rej)=>{
        instance.post(url,data,{
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            res(response.data)
        },(err)=>{
            rej(err)
        })
    })
};
export let get;
get = (url,params = {} )=>{
    return new Promise((res,rej)=>{
        instance.get(url, { params }).then((response)=>{
            res(response.data)
        },(err)=>{
            rej(err)
        })
    })
};