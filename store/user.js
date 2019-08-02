// 保存数据属性
export const state=()=>{
    return {
        userInfo:{
            token:'',
            user:{
                nickname:'曾小贤'
            }
        }
    }
}

// 同步修改数据
export const mutations={
    // state参数是固定默认写法,data是调用该方法时传入的数据
    setUserInfo(state,data){
        state.userInfo=data
    }
}

// 异步修改数据
export const actions={}