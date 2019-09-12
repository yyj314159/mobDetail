<template>
    <div class="registerBox">
        <img class="back" src="/images/login/back.png" alt="回到上一页" @click="back">
        <div class="comName">注册账户</div>
        <div class="content">
            <div class="mistakeText">
                {{mistakeText}}
            </div>
            <div>
                <div>手机号</div>
                <input name="phoneNumber1" type="text" v-model="phoneNumber"  @keydown.enter="regAndLogin">
                <div class="sendYZM" @click="getPicYZM" v-if="isShowYZM">发送验证码</div>
                <div class="sendYZM1" v-if="isShowYZM1">{{time}}s后重试</div>
                <div class="sendYZM2" @click="getPicYZM" v-if="isShowYZM2">重发验证码</div>
                <!--下面放两个input防止页面input自动填充密码和账号-->
                <input type="text" style="width: 0;height:0;border:0;">
                <input name="password" type="password" style="width: 0;height:0;border:0;">
            </div>
            <div v-show="isShowPicYZM">
                <div @click="getPosition($event)">
                    <img :src="picYzmUrl" alt="图片验证码" >
                    <img v-if="isShowPositionLogo" src="/images/login/position.png" :style="{left:(xVal-10)+'px',top:(yVal-20)+'px'}" alt="定位图标">
                </div>
                <div>
                    <div v-show="showPicBottom1">
                        <span>请点击</span>
                        <span>“{{yzmWord}}”</span>
                        <span>字完成验证码发送</span>
                    </div>
                    <div v-show="showPicBottom2">
                        <img src="/images/login/dui.png" alt="成功标志">
                        <span>验证成功！</span>
                    </div>
                    <div v-show="showPicBottom3">
                        <img src="/images/login/cuo.png" alt="失败标志">
                        <span>验证失败请重试！</span>
                    </div>
                </div>
            </div>
            <div :style="{marginTop:isShowPicYZM?'10px':'20px'}">
                <div>验证码</div>
                <input type="text" name="yzm1" class="venCode" v-model="venCode"  @keydown.enter="regAndLogin">
            </div>
            <div>
                <div>密码</div>
                <div class="password_td">
                    <input name="password1" :type="isShowPas ? 'text' : 'password'" v-model="password" @input="changePassword($event)"  @keydown.enter="regAndLogin">
                    <span class="showPas" v-show="isShowPas" @click="changePasType(true, false)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 23.56">
                            <defs><style>.cls-1 {
                            fill: none;
                            stroke: #dbdbdb;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                            stroke-width: 2px;
                        }</style></defs>
                            <g id="图层_2" data-name="图层 2">
                                <g id="图层_1-2" data-name="图层 1">
                                    <g id="可见">
                                        <path class="cls-1" d="M1,14.56s6.72-8,15-8,15,8,15,8-6.72,8-15,8-15-8-15-8"/>
                                        <circle class="cls-1" cx="16" cy="14.56" r="3.25"/>
                                    </g>
                                    <line class="cls-1" x1="24.72" y1="7.81" x2="27.28" y2="4.43"/>
                                    <line class="cls-1" x1="4.72" y1="4.43" x2="7.28" y2="7.81"/>
                                    <line class="cls-1" x1="20.74" y1="6.22" x2="21.26" y2="2.02"/>
                                    <line class="cls-1" x1="15.96" y1="5.24" x2="16.04" y2="1"/>
                                    <line class="cls-1" x1="10.74" y1="2.02" x2="11.26" y2="6.22"/>
                                </g>
                            </g>
                        </svg>
                    </span>
                    <span class="hidePas" v-show="!isShowPas" @click="changePasType(true, true)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 13.25">
                            <defs>
                                <style>
                                    .cls-1 {
                                        fill: none;
                                        stroke: #dbdbdb;
                                        stroke-linecap: round;
                                        stroke-linejoin: round;
                                        stroke-width: 2px;
                                    }
                                </style>
                            </defs>
                            <g>
                                <g>
                                    <g>
                                        <path class="cls-1" d="M31,1S24.28,7,16,7,1,1,1,1"/>
                                        <line class="cls-1" x1="7.28" y1="5.44" x2="4.72" y2="8.82"/>
                                        <line class="cls-1" x1="27.28" y1="8.82" x2="24.72" y2="5.44"/>
                                        <line class="cls-1" x1="11.26" y1="7.03" x2="10.74" y2="11.24"/>
                                        <line class="cls-1" x1="16.04" y1="8.01" x2="15.96" y2="12.25"/>
                                        <line class="cls-1" x1="21.26" y1="11.24" x2="20.74" y2="7.03"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                </div>
            </div>
            <div>
                <div>确认密码</div>
                <div class="password_td">
                    <input name="password2" :type="isShowPas2 ? 'text' : 'password'" v-model="surePas" @input="changeSurePass($event)"  @keydown.enter="regAndLogin">
                    <span class="showPas" v-show="isShowPas2" @click="changePasType(false, false)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 23.56">
                            <defs><style>.cls-1 {
                                fill: none;
                                stroke: #dbdbdb;
                                stroke-linecap: round;
                                stroke-linejoin: round;
                                stroke-width: 2px;
                            }</style></defs>
                            <g id="图层_2" data-name="图层 2">
                                <g id="图层_1-2" data-name="图层 1">
                                    <g id="可见">
                                        <path class="cls-1" d="M1,14.56s6.72-8,15-8,15,8,15,8-6.72,8-15,8-15-8-15-8"/>
                                        <circle class="cls-1" cx="16" cy="14.56" r="3.25"/>
                                    </g>
                                    <line class="cls-1" x1="24.72" y1="7.81" x2="27.28" y2="4.43"/>
                                    <line class="cls-1" x1="4.72" y1="4.43" x2="7.28" y2="7.81"/>
                                    <line class="cls-1" x1="20.74" y1="6.22" x2="21.26" y2="2.02"/>
                                    <line class="cls-1" x1="15.96" y1="5.24" x2="16.04" y2="1"/>
                                    <line class="cls-1" x1="10.74" y1="2.02" x2="11.26" y2="6.22"/>
                                </g>
                            </g>
                        </svg>
                    </span>
                    <span class="hidePas" v-show="!isShowPas2" @click="changePasType(false, true)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 13.25">
                            <defs>
                                <style>
                                    .cls-1 {
                                        fill: none;
                                        stroke: #dbdbdb;
                                        stroke-linecap: round;
                                        stroke-linejoin: round;
                                        stroke-width: 2px;
                                    }
                                </style>
                            </defs>
                            <g>
                                <g>
                                    <g>
                                        <path class="cls-1" d="M31,1S24.28,7,16,7,1,1,1,1"/>
                                        <line class="cls-1" x1="7.28" y1="5.44" x2="4.72" y2="8.82"/>
                                        <line class="cls-1" x1="27.28" y1="8.82" x2="24.72" y2="5.44"/>
                                        <line class="cls-1" x1="11.26" y1="7.03" x2="10.74" y2="11.24"/>
                                        <line class="cls-1" x1="16.04" y1="8.01" x2="15.96" y2="12.25"/>
                                        <line class="cls-1" x1="21.26" y1="11.24" x2="20.74" y2="7.03"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="loginBtn" @click="regAndLogin">
                <div v-if="isCanClick">注册并登录</div>
                <loading v-else></loading>
            </div>
            <nuxt-link :to="loginUrl">已有账户？现在登录</nuxt-link>
            <div>
                <div>
                    注册成为族蚂网会员，即代表您已阅读并同意
                </div>
                <a href="/zmfwxy" target="_blank">《Zuma族蚂服务协议》</a>
            </div>
        </div>
    </div>
</template>

<script>
    import loading from '~/components/login/loading';
    import publicUtil from '~/common/publicUtil';
    export default {
        name: 'forgotPas',
        components:{
            loading
        },
        data() {
            return {
                mistakeText: '', //报错提示语
                phoneNumber: '', //手机号
                venCode: '', //验证码
                password: '', //密码
                surePas: '', //确认密码
                time: 30, //再次发送验证码时长
                isShowPas: false, //密码--不显示
                isShowPas2: false, //确定密码--不显示
                isCanClick:true,
                isCanClick1:true,
                isShowYZM:true,//是否显示发送验证码
                isShowYZM1:false,//是否显示30秒重试
                isShowYZM2:false,//是否显示重发验证码
                timer:null,
                loginUrl:'/denglu',
                isShowPicYZM:false,//是否显示图片验证
                picYzmUrl:'/ImageCode/textCode',//图片验证码地址
                yzmWord:'',//验证码文字
                xVal:null,//点击图片验证码的横坐标定位
                yVal:null,//点击图片验证码的纵坐标定位
                showPicBottom1:true,
                showPicBottom2:false,//图片验证码验证成功标志
                showPicBottom3:false,//图片验证码验证失败标志
                isShowPositionLogo:false,//是否显示图片验证码的定位图标
            }
        },
        created(){
            if(this.$route.query.url){
                this.loginUrl = "/denglu?url="+encodeURIComponent(this.$route.query.url);
            }
        },
        mounted(){
            this.changeYzmWord();
        },
        methods: {
            regAndLogin() {
                if(!this.isCanClick){
                    return;
                }
                this.mistakeText = '';
                if (this.validate()) {
                    this.isCanClick = false;
                    let zmfrom = "族蚂网-PC端";
                    let bd_vid = null;
                    if(publicUtil.getCookie("zmfrom")){
                        zmfrom = publicUtil.getCookie("zmfrom")+'-PC端';
                    }
                    if(publicUtil.getCookie("bd_vid")){
                        bd_vid = publicUtil.getCookie("bd_vid");
                    }
                    $.ajax({
                        url: '/register/submitRegister',
                        data: {
                            fUserPhone: this.phoneNumber,
                            fUserPassword: this.password,
                            fPhoneCode: this.venCode,
                            fResource:zmfrom
                        },
                        type:'post',
                        success: (res) => {
                            this.isCanClick = true;
                            if(res.status === 0){
                                if(bd_vid){
                                    $.ajax({
                                        url:'/user/baiduApi',
                                        data:{
                                            bdVid:bd_vid
                                        },
                                        type:'post',
                                    })
                                }
                                if(this.$route.query.url){
                                    window.location.href = this.$route.query.url;
                                }else{
                                    window.location.href = "/"
                                }
                            }else{
                                this.mistakeText = res.message;
                            }
                        }
                    })
                }
            },
            //更改是否显示密码
            changePasType(type, v) {
                type ? this.isShowPas = v : this.isShowPas2 = v;
            },
            //获取并显示图片验证码
            getPicYZM(){
                this.mistakeText = "";
                this.isShowPositionLogo = false;
                this.showPicBottom1 = true;
                this.showPicBottom2 = false;
                this.showPicBottom3 = false;
                if(this.validatePhoneNumber()){
                    this.changePicYzm();
                    setTimeout(()=>{
                        this.changeYzmWord();
                    },500);
                    this.isShowPicYZM  = true;
                }
            },
            //发送验证码
            sentCode() {
                if(!this.isCanClick1){
                    return;
                }
                this.mistakeText = "";
                if(this.validatePhoneNumber()){
                    this.isCanClick1 = false;
                    $.ajax({
                        url: '/register/getRegisterCode',
                        data: {
                            fUserPhone: this.phoneNumber,
                            x:this.xVal,
                            y:this.yVal
                        },
                        type:'post',
                        success: (res) => {
                            if (res.status === 0) {
                                this.showPicBottom1 = false;
                                this.showPicBottom2 = true;
                                this.showPicBottom3 = false;
                                setTimeout(()=>{
                                    this.isShowPicYZM = false;
                                    this.isCanClick1 = true;
                                },1000);
                                clearInterval(this.timer);
                                this.time = 60;
                                this.isShowYZM1 = true;
                                this.isShowYZM = false;
                                this.isShowYZM2 = false;
                                this.timer = setInterval(() => {
                                    this.isShowYZM1 = true;
                                    this.isShowYZM = false;
                                    this.isShowYZM2 = false;
                                    if(this.time <= 1){
                                        clearInterval(this.timer);
                                        this.isShowYZM2 = true;
                                        this.isShowYZM = false;
                                        this.isShowYZM1 = false;
                                    }else{
                                        this.time -= 1;
                                    }
                                },1000);
                            } else if(res.status === 8){
                                this.showPicBottom1 = false;
                                this.showPicBottom2 = false;
                                this.showPicBottom3 = true;
                                setTimeout(()=>{
                                    this.isShowPositionLogo = false;
                                    this.changePicYzm();
                                    this.showPicBottom1 = true;
                                    this.showPicBottom2 = false;
                                    this.showPicBottom3 = false;
                                    this.isCanClick1 = true;
                                    setTimeout(()=>{
                                        this.changeYzmWord();
                                    },500);
                                },1000);
                            } else{
                                this.showPicBottom1 = false;
                                this.showPicBottom2 = true;
                                this.showPicBottom3 = false;
                                setTimeout(()=>{
                                    this.isShowPicYZM = false;
                                },1000);
                                this.isCanClick1 = true;
                                this.mistakeText = res.message;
                            }
                        }
                    })
                }
            },
            back(){
                this.$router.push(this.loginUrl);
            },
            validate(){
                if(!this.validatePhoneNumber()){
                   return false;
                }
                if(this.venCode.trim() === ""){
                    this.mistakeText = "请输入验证码";
                    return false;
                }
                if(this.password.length<6|| this.password.length > 20){
                    this.mistakeText = "请输入6-20位字符组成的密码";
                    return false;
                }
                if(this.surePas === ""){
                    this.mistakeText = "请确认密码";
                    return false;
                }
                if(this.password !== this.surePas){
                    this.mistakeText = "两次密码输入不一致";
                    return false;
                }
                return true;
            },
            validatePhoneNumber(){
               if(this.phoneNumber.trim() === ""){
                   this.mistakeText = "请输入手机号码";
                   return false;
               }else if(!(/^1[3456789]\d{9}$/.test(this.phoneNumber))){
                   this.mistakeText = "请输入正确的手机号码";
                   return false;
               }
               return true;
            },
            changePassword(e){
                this.password = e.target.value.trim();
            },
            changeSurePass(e){
                this.surePas = e.target.value.trim();
            },
            changePicYzm(){
                this.picYzmUrl = "/ImageCode/textCode?_="+new Date().getTime();
            },
            changeYzmWord(){
                $.ajax({
                    url:'/ImageCode/getTextCode',
                    success:(res)=>{
                        this.yzmWord = res;
                    }
                })
            },
            getPosition(e){
                this.xVal = e.offsetX;
                this.yVal = e.offsetY;
                this.isShowPositionLogo = true;
                this.sentCode();
            },

        },
    }
</script>

<style scoped lang="less">
    .registerBox {
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
        }
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
            position: relative;
            .mistakeText {
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #FF0033;
                font-size: 12px;
                position: absolute;
                top: -40px;
                left:0;
                width: 100%;
            }
            & > div:nth-child(2) {
                display: flex;
                align-items: center;
                position: relative;
                & > div:nth-child(1) {
                    font-size: 12px;
                    color: #6292A6;
                    position: absolute;
                    left: -46px;
                    height:16px;
                    line-height: 16px;
                    top:50%;
                    margin-top: -8px;
                }
                & > input:nth-child(2) {
                    width: 180px;
                    height: 40px;
                    border: 1px solid #B1C9D3;
                    outline: none;
                    background: rgba(177, 201, 211, 0.1);
                    padding-left: 15px;
                    color: #333333;
                    font-size: 13px;
                }
                .sendYZM, .sendYZM2 {
                    width: 90px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    font-size: 12px;
                    background: #2FB7EC;
                    cursor: pointer;
                }
                .sendYZM1 {
                    width: 90px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    font-size: 12px;
                    background: #B1C9D3;
                    cursor: not-allowed;
                }

            }
            & >div:nth-child(3){
                width: 272px;
                height:94px;
                margin-top: 10px;
                &>div:nth-child(1){
                    width: 272px;
                    height:54px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    &>img:nth-child(1){
                        width: 272px;
                        height:54px;
                    }
                    &>img:nth-child(2){
                        width: 20px;
                        height:20px;
                        position: absolute;
                        z-index: 5;
                    }
                }
                &>div:nth-child(2){
                    width: 272px;
                    height:40px;
                    background:#F7FAFB;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &>div:nth-child(1){
                        font-size: 13px;
                        color:rgba(18,47,70,0.7);
                        &>span:nth-child(2){
                            color:#FF0000;
                        }
                    }
                    &>div:nth-child(2){
                        img{
                            width: 14px;
                            height:12px;
                        }
                        span{
                            font-size: 13px;
                            color:#2FB7EC;
                        }
                    }
                    &>div:nth-child(3){
                        img{
                            width: 13px;
                            height:12px;
                        }
                        span{
                            color:#FF0000;
                            font-size: 13px;
                        }
                    }
                }
            }
            & > div:nth-child(4) {
                display: flex;
                align-items: center;
                position: relative;
                & > div:nth-child(1) {
                    font-size: 12px;
                    color: #6292A6;
                    position: absolute;
                    left: -46px;
                    height:16px;
                    line-height: 16px;
                    top:50%;
                    margin-top: -8px;
                }
                & > input:nth-child(2) {
                    width: 270px;
                    height: 40px;
                    border: 1px solid #B1C9D3;
                    outline: none;
                    background: rgba(177, 201, 211, 0.1);
                    padding-left: 15px;
                    color: #333333;
                    font-size: 13px;
                }
            }
            &>div:nth-child(5){
                display: flex;
                align-items: center;
                position: relative;
                margin-top: 20px;
                &>div:nth-child(1){
                    font-size: 12px;
                    color:#6292A6;
                    position: absolute;
                    left:-34px;
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
            &>div:nth-child(6){
                display: flex;
                align-items: center;
                position: relative;
                margin-top: 20px;
                &>div:nth-child(1){
                    font-size: 12px;
                    color:#6292A6;
                    position: absolute;
                    left:-58px;
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
            &>a:nth-child(8){
                margin-top: 20px;
                font-size: 12px;
                text-decoration: underline;
                color:#122F46;
            }
            &>div:nth-child(9){
                margin-top: 20px;
                display: flex;
                align-items: center;
                flex-direction: column;
                color:#797979;
                font-size: 12px;
                a{
                    color:#2FB7EC;
                }
            }
        }
    }

</style>


