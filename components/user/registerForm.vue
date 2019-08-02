<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">

            <el-form-item class="form-item" prop="username"> 
                <el-input 
                v-model="form.username"
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input 
                v-model="form.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                v-model="form.nickname"
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                v-model="form.password"
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                v-model="form.checkPassword"
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>
<script>
export default {
    data(){
var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

        return{
            form:{
                username:'',
                nickname:'',
                captcha:'',
                password:'',
                checkPassword:''
            },
            // 表单验证规则
            rules:{
                username:[{required:true,message:'用户名不能为空',trigger:'blur'}],
                captcha:[{required:true,message:'手机验证码不能为空',trigger:'blur'}],
                nickname:[{required:true,message:'昵称 不能为空',trigger:'blur'}],
                password:[{required:true,message:'密码不能为空',trigger:'blur'}],
                checkPass: [{ validator: validatePass2, trigger: 'blur' }]
            }
        }
    },
    methods:{
        handleSendCaptcha(){
            if(!this.form.username){
                this.$message.warning('请输入有效手机号码')
                return
            }
            this.$axios({
                url:'/captchas',
                method:'POST',
                data:{
                    tel:this.form.username
                }
            }).then(res=>{
                console.log(res)
            })
        },
        // 注册
        handleRegSubmit(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    // 解构出特定的属性后，剩余的属性可以用... +变量名访问
                    const{checkPassword,...props}=this.form

                    this.$axios({
                        url:'/accounts/register',
                        method:'POST',
                        data:props
                    }).then(res=>{
                        console.log(res)

                        this.$store.commit('user/setUserInfo',res.data)

                        this.$router.push('/')
                    })


                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
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



