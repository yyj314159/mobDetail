<template>
    <div class="box">
        <div class="content">
            <div>
                <div>微信支付</div>
                <div v-if="!isOutOfDate" class="countDownTip">距离二维码过期还剩{{minute}}分{{second}}秒 , 过期后请刷新页面重新获取二维码。</div>
                <div v-else class="outOfDateTip">二维码已过期 ，<span>刷新</span>页面重新获取</div>
            </div>
            <div>
                <div>
                    <div id="QRCode1"></div>
                    <div>
                        <img src="/images/purchase/pc_icon_icon-red.png" alt="红色背景">
                        <div>
                            <div>请使用微信扫一扫</div>
                            <div>扫描二维码支付</div>
                        </div>
                    </div>
                </div>
                <img src="/images/purchase/pc_icon_phone-bg.png" alt="扫一扫示例">
            </div>
            <div @click="close">
                <img src="/images/purchase/pointLeft.png" alt="后退">
                <span>选择其他支付方式</span>
            </div>
        </div>
        <img @click="close" src="/images/purchase/close2.png" alt="关闭">
    </div>
</template>

<script>
    export default {
        name: "wexinPayCodePopup",
        props:['codeUrl'],
        data(){
            return {
                isOutOfDate:false,
                minute:14,
                second:59,
            }
        },
        mounted(){
            this.countDown();
            this.$nextTick(()=>{
                this.QRCode();
            })
        },
        methods:{
            close(){
                this.$parent.isShowCodePopup = false;
            },
            QRCode() {
               new QRCode('QRCode1', {
                    width: 240,
                    height: 240,
                    text: this.codeUrl, // 二维码地址
                    colorDark: "#000",
                    colorLight: "#fff",
                })
            },
            countDown(){
                window.zmTimer = setInterval(()=>{
                    if(this.second>0){
                        this.second -= 1;
                    }else{
                        this.second = 59;
                        this.minute -= 1;
                    }
                    if(this.minute === 0 && this.second === 0){
                        this.isOutOfDate = true;
                        clearInterval(window.zmTimer);
                    }
                },1000)
            },
        },
        destroyed(){
            clearInterval(window.zmTimer);
        },
    }
</script>

<style scoped lang="less">
    .box{
        width: 100%;
        height:100%;
        background: rgba(18,47,70, 0.6);
        position: fixed;
        top:0;
        left:0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 150;
        &>img{
            position: absolute;
            top:50px;
            right:50px;
            cursor: pointer;
            width: 60px;
            height:60px;
        }
        .content{
            width: 800px;
            height:440px;
            background: #ffffff;
            padding: 30px;
            display: flex;
            flex-direction: column;
            &>div:nth-child(1){
                display: flex;
                align-items: center;
                &>div:nth-child(1){
                    color:#868686;
                    font-size: 14px;
                }
                .countDownTip{
                    font-size: 12px;
                    color:#868686;
                    margin-left: 45px;
                }
                .outOfDateTip{
                    margin-left: 45px;
                    font-size: 12px;
                    color:#DB3E3E;
                    span{
                      color:#017CD9;
                    }
                }
            }
            &>div:nth-child(2){
                margin-top: 10px;
                display: flex;
                align-items: center;
                &>div:nth-child(1){
                    display: flex;
                    flex-direction: column;
                    margin-left: 102px;
                    &>div:nth-child(1){
                        width: 240px;
                        height:240px;
                    }
                    &>div:nth-child(2){
                        width: 240px;
                        height:50px;
                        margin-top: 15px;
                        background: #ff7674;
                        display: flex;
                        align-items: center;
                        &>img{
                            width: 36px;
                            height:36px;
                            margin-left: 40px;
                        }
                        &>div{
                            margin-left: 20px;
                            font-size: 14px;
                            color:#ffffff;
                        }
                    }
                }
                &>img{
                    height:300px;
                    width: 230px;
                    margin-left:37px;
                }
            }
            &>div:nth-child(3){
                margin-top: 40px;
                font-size: 14px;
                color:#017CD9;
                cursor: pointer;
                span{
                    margin-left: 10px;
                }
            }
        }
    }
</style>