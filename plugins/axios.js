import {Message} from 'element-ui'

// axios拦截插件,处理错误返回
export default({$axios})=>{
    // console.log($axios)
    $axios.onError(res=>{
        // console.log(1111,res.response)
        // 解构赋值出res.response.data对象数据
        const {data}=res.response.data
        if(data.statusCode){
            Message.warning(data.message)
        }
    })
}