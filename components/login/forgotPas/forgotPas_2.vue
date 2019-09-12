<template>
    <div class="forgotPas">
        <img class="back" src="/images/login/back.png" alt="回到上一页" @click="back">
        <div class="comName">找回密码</div>
        <div class="content">
            <div  class="mistakeText">
                {{mistakeText}}
            </div>
            <div>
                <div>输入密码</div>
                <div class="password_td">
                    <input :type="isShowPas ? 'text' : 'password'" v-model="password" @input="changePassword($event)"  @keydown.enter="login">
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
                    <input :type="isShowPas2 ? 'text' : 'password'" v-model="surePas" @input="changeSurePass($event)"  @keydown.enter="login">
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
            <div class="loginBtn" @click="login">
                <div v-if="isCanClick">完成并登录</div>
                <loading v-else></loading>
            </div>
        </div>
    </div>
</template>

<script>
    import loading from '~/components/login/loading';
export default {
    name: 'forgotPas',
    components:{
      loading
    },
    data () {
        return {
            surePas: '', //确认密码
            password: '', //密码
            mistakeText: '',
            isShowPas: false, //密码--不显示
            isShowPas2: false, //确认密码--不显示
            phoneNumber: '',//手机号
            isCanClick:true
        }
    },
    methods: {
        back () {
            this.$parent.isShow = true;
        },
         //更改是否显示密码
        changePasType (type, v) {
            type ? this.isShowPas = v : this.isShowPas2 = v;
        },
        login () {
            if(!this.isCanClick){
                return;
            }
            this.mistakeText = '';
            if (this.validate()) {
                this.isCanClick = false;
                $.ajax({
                    url: '/forget/next4',
                    data: {
                        userPassword: this.password,
                        flag:true
                    },
                    type:'post',
                    success: (res) => {
                        this.isCanClick = true;
                        if(res.status === 0){
                            if(this.$route.query.url){
                                window.location.href = this.$route.query.url;
                            }else{
                                window.location.href = "/";
                            }
                        }else{
                            this.mistakeText = res.message;
                        }
                    }
                })
            }
        },
        validate(){
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
        changePassword(e){
            this.password = e.target.value.trim();
        },
        changeSurePass(e){
            this.surePas = e.target.value.trim();
        }
    },
}
</script>

<style scoped lang="less">
.forgotPas {
    width: 520px;
    height: 600px;
    box-shadow: 0 0 20px rgba(61, 155, 233, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    position: relative;
    .back{
        width: 25px;
        height:25px;
        position: absolute;
        top:50px;
        left:50px;
        cursor: pointer;
    }
    .comName{
        margin-top: 60px;
        font-size: 20px;
        font-weight: bold;
        color:#122F46;
    }
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 40px;
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
        &>div:nth-child(3){
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
            width: 270px;
            height:40px;
            background:#2FB7EC;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            color:#ffffff;
            margin-top: 20px;
        }
    }
}
</style>


