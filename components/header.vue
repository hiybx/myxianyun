<template>
    <div class="header">
        <div class="main">
            <el-row type="flex" justify="space-between">
                <!-- logo部分 -->
                <div class="logo">
                         <nuxt-link to="/">
                            <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
                            <h1>闲云旅游</h1>
                        </nuxt-link>
                </div>
            <el-row type="flex" class="navs">
                <nuxt-link to="/">首页</nuxt-link>
                <nuxt-link to="/post">旅游攻略</nuxt-link>
                <nuxt-link to="/hotel">酒店</nuxt-link>
                <nuxt-link to="/air">国内机票</nuxt-link>
            </el-row>    
                <!-- 登录状态部分 未登录 -->
                <div>
                    <nuxt-link to='/user/login'>登录注册</nuxt-link>
                </div>

                <!-- 登录后的布局 -->
                <div>
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
                        咸鱼旅游<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>

            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.main{
    width: 1000px;
    margin: 0 auto;
}
.header{
    height:60px;
    line-height: 60px;
    border-bottom: 1px #ccc solid;
    box-shadow: 0 3px 3px #eee;
}
.logo{
    width:156px;
    height: 60px;
    img{
        margin-top: 4px;
        display:block;
        width: 100%;
    }
    h1{
        text-indent: -9999px;
        height: 0px;
    }
}
.el-dropdown-link{
    img{
        width:36px;
        height:36px;
        border-radius: 50%;
        vertical-align: middle;
    }
}
.navs{
    flex:1;
    margin-left: 20px;
    padding: 0 50px;
    align-items: center;
    justify-content: center;
    a{
        flex: 3;
        display:block;
        height:60px;
        text-align: center;
        box-sizing: border-box;

        &:hover{
            color:#409eff;
            border-bottom: 5px #409eff solid;
            font-size: 20px;
        }

    }
                /deep/ .nuxt-link-exact-active{
                background:#409eff;
                color:#fff;
                font-size: 20px;
            }
}


</style>

