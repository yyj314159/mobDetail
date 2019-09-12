<template>
    <div class="forgotPas">
        <img class="back" src="/images/login/back.png" alt="回到上一页" @click="back">
        <div class="comName">找回密码</div>
        <div class="content">
            <div  class="mistakeText">
                {{mistakeText}}
            </div>
            <div>
                <div>手机号</div>
                <input type="text" v-model="phoneNumber"  @keydown.enter="next">
                <div class="sendYZM" @click="getPicYZM" v-if="isShowYZM">发送验证码</div>
                <div class="sendYZM1" v-if="isShowYZM1">{{time}}s后重试</div>
                <div class="sendYZM2" @click="getPicYZM" v-if="isShowYZM2">重发验证码</div>
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
                <input type="text" class="venCode" v-model="venCode"  @keydown.enter="next">
            </div>
            <div class="next" @click="next">
                <div v-if="isCanClick">下一步</div>
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
            phoneNumber: '', //手机号
            venCode: '', //用户输入的验证码
            timer: null, //再次发送验证码定时器
            time: 30, //...秒计时器
            mistakeText: '',
            isShowYZM:true,
            isShowYZM1:false,
            isShowYZM2:false,
            isCanClick:true,
            isCanClick1:true,
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
    mounted(){
        this.changeYzmWord();
    },
    methods: {
        back () {
            if(this.$route.query.url){
                this.$router.push("/denglu?url="+encodeURIComponent(this.$route.query.url));
            }else{
                this.$router.push("/denglu")
            }
        },
        next () {
            if(!this.isCanClick){
                return;
            }
            this.mistakeText = '';
            if(this.validate()) {
                this.isCanClick = false;
                $.ajax({
                    url:'/forget/next3',
                    data:{
                        userPhoneOrEmail:this.phoneNumber,
                        userCode:this.venCode
                    },
                    type:'post',
                    success:(res)=> {
                        this.isCanClick = true;
                        if (res.status === 0) {
                            this.$parent.isShow = false;
                        } else {
                            this.mistakeText = res.message;
                        }
                    }
                })
           }
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
        sentCode () {
            if(!this.isCanClick1){
                return;
            }
            this.mistakeText = '';
            if (this.validatePhoneNumber()){
                this.isCanClick1 = false;
                $.ajax({
                    url: '/forget/getNewPhoneCode?_='+new Date().getTime(),
                    data: {
                        userPhoneOrEmail: this.phoneNumber,
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
                        }else if(res.status === 8){
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
        validate(){
            if(!this.validatePhoneNumber()){
                return false;
            }
            if(this.venCode.trim() === ""){
                this.mistakeText = "请输入验证码";
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
                left:-46px;
                height:16px;
                line-height: 16px;
                top:50%;
                margin-top: -8px;
            }
            &>input:nth-child(2){
                width: 180px;
                height:40px;
                border:1px solid #B1C9D3;
                outline: none;
                background: rgba(177,201,211,0.1);
                padding-left: 15px;
                color:#333333;
                font-size: 13px;
            }
            .sendYZM,.sendYZM2{
                width: 90px;
                height:40px;
                display: flex;
                align-items: center;
                justify-content: center;
                color:#ffffff;
                font-size: 12px;
                background: #2FB7EC;
                cursor: pointer;
            }
            .sendYZM1{
                width: 90px;
                height:40px;
                display: flex;
                align-items: center;
                justify-content: center;
                color:#ffffff;
                font-size: 12px;
                background:#B1C9D3;
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
        &>div:nth-child(4){
            display: flex;
            align-items: center;
            position: relative;
            margin-top: 20px;
            &>div:nth-child(1){
                font-size: 12px;
                color:#6292A6;
                position: absolute;
                left:-46px;
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
        .next{
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


