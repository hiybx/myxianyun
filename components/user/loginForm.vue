<template>
    <el-form
    :model='form'
    ref="form"
    :rules="rules"
    class="form">

    <el-form-item class="form-item" prop="username">
            <el-input 
            v-model="form.username"
            placeholder="用户名/手机">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item"  prop="password">
            <el-input 
            v-model="form.password"
            placeholder="密码" 
            type="password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>
<script>
export default {
    data(){
        return{
            // 表单数据
            form:{
                username:'',
                password:''
            },
            // 表单规则
            rules:{
                username:[{required:true,message:'用户名不能为空',trigger:'blur'}],
                password:[{required:true,message:'请输入密码',trigger:'blur'}]
            }
        }
    },
    methods:{
        // 提交登录
        handleLoginSubmit(){
            this.$refs.form.validate(valid=>{
                // console.log(valid)
                // console.log(this.$store)
                if(valid){
                    // 提交登录接口
                    this.$axios({
                        url:'/accounts/login',
                        method:'POST',
                        data:this.form
                    }).then(res=>{
                        console.log(res)
                        // 将登录成功的用户数据存入store的state中
                        // this.$store.state.user.userInfo=res.data
                        // 直接修改会报错
                        // 调用store中mutations方法
                        this.$store.commit('user/setUserInfo',res.data)
                        // 跳转到首页
                        this.$router.push('/')
                    })
                }
            })
        }
    }
}
</script>
<style scoped>
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }

</style>


