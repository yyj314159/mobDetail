<template>
    <div class="wxLogin">
        <img class="back" src="/images/login/back.png" alt="回到上一页" @click="back">
        <div class="comName">
            <img src="/images/login/wx.png" alt="族蚂微信登录">
            <div>微信登录</div>
        </div>
        <div class="content">
            <div id="login_container"></div>
            <img src="/images/login/wxsys.png" alt="族蚂微信扫一扫示例">
        </div>
        <div>
            <p>请使用微信手机版扫描二维码</p>
            <p>安全登录，防止盗号。</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                randomNum: '',
                isScanSuccess:false,
                redirectUrl:''
            }
        },
        mounted() {
            this.redirectUrl = location.protocol+"//"+location.host+'/denglu';
            if(this.$route.query.url){
                this.redirectUrl = this.redirectUrl+"?url="+encodeURIComponent(this.$route.query.url);
            }
            this.getCode();
            $("iframe").attr({
                width:'190px',
                height:'190px'
            })
        },
        methods: {
            random() {
                this.randomNum = parseInt(Math.random() * 100000)
            },
            back() {
                this.$parent.isLogin = true;
                this.$parent.isWxLogin = false;
                this.$parent.isBindPhone = false;
            },
            getCode(){
                this.random()
                new WxLogin({
                    id: "login_container",
                    appid: "wx8183ffed462fbc21",
                    scope: "snsapi_login",
                    redirect_uri: encodeURI(this.redirectUrl),
                    state: this.randomNum,//随机数
                    style: "",//这个是二维码样式
                    href: "https://www.pre-zuma.com/wxLogin.css"
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .wxLogin {
        width: 520px;
        height: 600px;
        box-shadow: 0 0 20px rgba(61, 155, 233, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #ffffff;
        position: relative;
        .back {
            width: 25px;
            height: 25px;
            position: absolute;
            top: 50px;
            left: 50px;
            cursor: pointer;
        }
        .comName {
            margin-top: 60px;
            font-size: 20px;
            font-weight: bold;
            color: #122F46;
            display: flex;
            align-items: center;
            justify-content: center;
            &>img{
                width: 30px;
                height:30px;
                margin-right: 10px;
            }
        }
        .content{
            width: 192px;
            height:192px;
            position: relative;
            margin-top: 70px;
            transition: width 0.5s;
            display: flex;
            align-items: center;
            #login_container{
                width: 192px;
                height:192px;
                border: 1px solid #B1C9D3;
            }
            &>img:nth-child(2){
                width: 210px;
                height:188px;
                position: absolute;
                right:0;
                display: none;
            }
            &:hover{
                width: 430px;
                &>img:nth-child(2){
                    display: inline-block;
                }
            }
        }
        &>div:nth-child(4){
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 65px;
            color:#6292A6;
            font-size:14px;
        }
    }
</style>

