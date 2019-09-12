<template>
    <div class="loginBox">
        <img v-if="!isUser" src="/images/login/zhmmdl.png" alt="账号密码登录">
        <img v-else src="/images/login/mmkjdl.png" alt="免密快捷登录">
        <div class="changeLogin" @click="changeLogin"></div>
        <div class="loginWayName">
            账户登录
        </div>
        <loginCom class="loginCom" :is="loginCom"></loginCom>
        <div class="loginWay" >
            <div class="line">
                <div></div>
                <div>或</div>
                <div></div>
            </div>
            <div class="TXlogin">
                <img src="/images/login/wx.png" @click="wxlogin" alt="微信登录">
                <img src="/images/login/qq.png" @click="loginQQ" alt="QQ登录">
            </div>
        </div>
        <nuxt-link class="register" :to="registerUrl" >注册</nuxt-link>
    </div>
</template>

<script>

export default {
    name: 'login',
    data () {
        return {

            loginCom: '',
            isUser: true,
            isBindPhone: false,
            userName: '',
            userImg: '',
            registerUrl:'/zhuce',
            qqRedirectUrl:''
        }
    },
    created () {
        this.loginCom = () => import("./passwardLogin");
        if(this.$route.query.url){
            this.registerUrl = '/zhuce?url='+encodeURIComponent(this.$route.query.url);
        }
    },
    mounted () {
        if(this.$route.query.url){
            this.qqRedirectUrl = location.protocol+"//"+location.host+'/denglu?url='+encodeURIComponent(this.$route.query.url);
        }else{
            this.qqRedirectUrl = location.protocol+"//"+location.host+'/denglu';
        }
    },
    methods: {
        loginQQ () {
            window.location.href = `https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101712499&redirect_uri=${encodeURI(this.qqRedirectUrl)}&scope=get_user_info`;
        },
        //切换微信登录
        wxlogin () {
            this.$parent.isWxLogin = true;
            this.$parent.isLogin = false;
            this.$parent.isBindPhone = false;
        },
        changeLogin () {
            if (this.isUser) {
                this.loginCom = () => import("./phoneLogin");
                this.isUser = false;
            } else {
                this.loginCom = () => import("./passwardLogin");
                this.isUser = true;
            }
        }
    },
}
</script>

<style scoped lang="less">
.loginBox {
    width: 520px;
    height: 600px;
    box-shadow: 0 0 20px rgba(61,155,233,0.2);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    &>img:nth-child(1){
        position: absolute;
        top:0;
        right:0;
    }
    .loginWayName {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-top: 60px;
        font-size: 20px;
        font-weight: bold;
        color:#122F46;
    }
    .loginCom{
        margin-top: 40px;
    }
    .loginWay{
        .line{
            margin-top: 25px;
            display: flex;
            align-items: center;
            &>div:nth-child(1),&>div:nth-child(3){
                width: 110px;
                height:1px;
                background: #B1C9D3;
            }
            &>div:nth-child(2){
                font-size: 14px;
                color:rgba(18,47,70,0.7);
                margin: 0 15px;
            }
        }
        .TXlogin{
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            &>img{
                width: 30px;
                height:30px;
                cursor: pointer;
            }
            &>img:nth-child(1){
                margin-right: 30px;
            }
        }
    }
    .register {
        width: 268px;
        height: 40px;
        color: #2FB7EC;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border:1px solid #2FB7EC;
        margin-top: 20px;
    }
    .changeLogin {
        width: 100px;
        height: 100px;
        position: absolute;
        top: -50px;
        right: -50px;
        transform: rotate(-45deg);
        z-index: 5;
        cursor: pointer;
    }
}
</style>


