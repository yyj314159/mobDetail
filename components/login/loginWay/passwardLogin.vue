<template>
    <div class="passwordLogin">
        <div class="mistakeText">
            {{mistakeText}}
        </div>
        <div>
            <div>手机号</div>
            <input type="text" name="phoneNumber" v-model="phoneNumber"  @keydown.enter="login">
        </div>
        <div>
            <div>密码</div>
            <div class="password_td">
                <input name="passWord" :type="isShowPas ? 'text' : 'password'" v-model="password" @input="changePassword($event)" >
                <span class="showPas" v-show="isShowPas" @click="changePasType(false)" @keydown.enter="login">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 23.56"><defs><style>.cls-1{fill:none;stroke:#dbdbdb;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>资源 5</title><g id="图层_2" data-name="图层 2"><g id="图层_1-2" data-name="图层 1"><g id="可见"><path class="cls-1" d="M1,14.56s6.72-8,15-8,15,8,15,8-6.72,8-15,8-15-8-15-8"/><circle class="cls-1" cx="16" cy="14.56" r="3.25"/></g><line class="cls-1" x1="24.72" y1="7.81" x2="27.28" y2="4.43"/><line class="cls-1" x1="4.72" y1="4.43" x2="7.28" y2="7.81"/><line class="cls-1" x1="20.74" y1="6.22" x2="21.26" y2="2.02"/><line class="cls-1" x1="15.96" y1="5.24" x2="16.04" y2="1"/><line class="cls-1" x1="10.74" y1="2.02" x2="11.26" y2="6.22"/></g></g></svg>
                </span>
                <span class="hidePas" v-show="!isShowPas" @click="changePasType(true)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 13.25"><defs><style>.cls-1{fill:none;stroke:#dbdbdb;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><g><g><g><path class="cls-1" d="M31,1S24.28,7,16,7,1,1,1,1"/><line class="cls-1" x1="7.28" y1="5.44" x2="4.72" y2="8.82"/><line class="cls-1" x1="27.28" y1="8.82" x2="24.72" y2="5.44"/><line class="cls-1" x1="11.26" y1="7.03" x2="10.74" y2="11.24"/><line class="cls-1" x1="16.04" y1="8.01" x2="15.96" y2="12.25"/><line class="cls-1" x1="21.26" y1="11.24" x2="20.74" y2="7.03"/></g></g></g></svg>
                </span>
            </div>
        </div>
        <div>
            <div>验证码</div>
            <div class="yzm_tr">
                <input  type="text" class="YZMinput" v-model="venCode"  @keydown.enter="login">
                <img class="yzm" :src="yzmUrl" alt="验证码"/>
                <div class="changeYZM" @click="changeYZM">
                    <p>看不清？</p>
                    <p style="text-decoration: underline">换一张！</p>
                </div>
            </div>
        </div>
        <div class="loginBtn" @click="login">
            <div v-if="isCanClick">登录</div>
            <loading v-else></loading>
        </div>
        <div class="forget_tr">
            <nuxt-link :to="findPasswordUrl" class="forget" rel="nofollow">忘记密码？</nuxt-link>
        </div>
    </div>
</template>

<script>
    import loading from '~/components/login/loading';
export default {
    name: 'password',
    components:{
        loading
    },
    data () {
        return {
            phoneNumber: '', //账号
            password: '', //密码
            venCode: '', //用户输入的验证码
            mistakeText: '', //错误提示语
            randomVenCode: '', //动态生成的验证码
            isShowPas: false, //是否显示密码
            yzmUrl:'/ImageCode/newCode',
            isCanClick:true,
            findPasswordUrl:'/zhmm',
            fEntrepId:null
        }
    },
    created () {
        if(this.$route.query.url){
            this.findPasswordUrl = '/zhmm?url='+encodeURIComponent(this.$route.query.url);
        }
        if(this.$route.query.url && this.$route.query.url.indexOf("fEntrepId") !== -1){
            let param = this.$route.query.url.split("?")[1];
            let arr = param.split("&");
            for(let i = 0; i < arr.length; i++){
                if(arr[i].split("=")[0] === "fEntrepId"){
                    this.fEntrepId = arr[i].split("=")[1];
                }
            }
        }
    },
    methods: {
        login () {
            if(!this.isCanClick){
                return;
            }
            if (this.validate()) {
                this.mistakeText = '';
                this.isCanClick = false;
                $.ajax({
                    url: '/newLogin',
                    data: {
                        userName: this.phoneNumber,
                        userPassword: window.btoa(this.password),
                        type: 1,
                        zmCode:this.venCode,
                        fEntrepId:this.fEntrepId
                    },
                    type:'post',
                    success: (res)=>{
                        this.isCanClick = true;
                        if (res.status === 0) {
                            //登录成功，跳往首页/之前跳转过来的页面
                            if(this.$route.query.url){
                                window.location.href = this.$route.query.url;
                            }else{
                                window.location.href = "/";
                            }
                        } else {
                            //登录失败 mistakeText => 登录失败原因
                            this.mistakeText = res.message;
                        }
                        this.isLogin = true;
                    },
                })
            }
        },
        //是否显示密码
        changePasType (v) {
            this.isShowPas = v;
        },
        changeYZM () {
            this.yzmUrl = "/ImageCode/newCode?_="+new Date().getTime();
        },
        validate(){
            if(this.phoneNumber.trim() === ""){
                this.mistakeText = "请输入手机号码";
                return false;
            }else if(!(/^1[3456789]\d{9}$/.test(this.phoneNumber)) && !(/^@@[y,Y]/).test(this.phoneNumber)){
                this.mistakeText = "请输入正确的手机号码";
                return false;
            }
            if(this.password === ""){
                this.mistakeText = "请输入密码";
                return false;
            }
            return true;
        },
        changePassword(e){
            this.password = e.target.value.trim();
        }
    },
}
</script>

<style scoped lang="less">
.passwordLogin {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .mistakeText{
        height:40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color:#FF0033;
        font-size: 12px;
        position: absolute;
        top:-40px;
        left:0;
        width: 100%;
    }
    &>div:nth-child(2){
        display: flex;
        align-items: center;
        position: relative;
        &>div:nth-child(1){
            position: absolute;
            left:-46px;
            color:#6292A6;
            font-size: 12px;
            height:16px;
            line-height: 16px;
            top:50%;
            margin-top: -8px;
        }
        &>input:nth-child(2){
            width: 270px;
            height:40px;
            border:1px solid #B1C9D3;
            outline: none;
            background: rgba(177,201,211,0.1);
            padding-left: 15px;
            color:#333333;
            font-size: 13px;
        }
    }
    &>div:nth-child(3){
        display: flex;
        align-items: center;
        margin-top: 20px;
        position: relative;
        &>div:nth-child(1){
            position: absolute;
            left:-34px;
            color:#6292A6;
            font-size: 12px;
            height:16px;
            line-height: 16px;
            top:50%;
            margin-top: -8px;
        }
        .password_td{
            width: 270px;
            height:40px;
            position: relative;
            &>input{
                width: 270px;
                height:40px;
                border:1px solid #B1C9D3;
                outline: none;
                background: rgba(177,201,211,0.1);
                padding-left: 15px;
                color:#333333;
                font-size: 13px;
                padding-right: 30px;
            }
            .showPas,.hidePas{
                position: absolute;
                top:9.5px;
                right:5px;
                z-index: 5;
                cursor: pointer;
                &>svg{
                    width: 21px;
                    height:21px;
                }
            }
        }
    }
    &>div:nth-child(4){
        display: flex;
        align-items: center;
        position: relative;
        margin-top: 20px;
        &>div:nth-child(1){
            position: absolute;
            left:-46px;
            color:#6292A6;
            font-size: 12px;
            height:16px;
            line-height: 16px;
            top:50%;
            margin-top: -8px;
        }
        .yzm_tr{
            width: 270px;
            height:40px;
            display: flex;
            align-items: center;
            .YZMinput{
                width: 150px;
                height:40px;
                border:1px solid #B1C9D3;
                outline: none;
                background: rgba(177,201,211,0.1);
                padding-left: 15px;
                color:#333333;
                font-size: 13px;
            }
            .yzm{
                width: 70px;
                height:40px;
            }
            .changeYZM{
                width: 48px;
                height:32px;
                font-size: 12px;
                color:#6292A6;
                cursor: pointer;
            }
        }
    }
    .loginBtn{
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 270px;
        height:40px;
        background:#2FB7EC;
        color:#ffffff;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }
    .forget_tr{
        width: 270px;
        display: flex;
        align-items: center;
        margin-top: 10px;
        justify-content: flex-end;
        a{
            color:	rgba(18,47,70,0.7);
            font-size: 12px;
            text-decoration: underline;
        }
    }
}
</style>


