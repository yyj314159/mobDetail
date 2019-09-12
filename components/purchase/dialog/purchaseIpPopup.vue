<template>
    <div class="box">
        <div class="content">
            <img @click="close" src="/images/purchase/close3.png" alt="关闭">
            <div>
                <img src="/images/purchase/warn.png" alt="提示">
                <div>重要提示！</div>
            </div>
            <div>您本次选择的IP类型与当前使用的IP类型不一致！</div>
            <div>当前IP仍在有效期内，无法切换较低版本的IP类型，请等待服务到期后进行降级！</div>
            <div>如切换IP类型，将为您重新分配IP地址，您需要届时重新进行域名解析！</div>
            <div @click="close">我知道了</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "purchaseIpPopup",
        methods:{
            close(){
                this.$parent.isShowIpPopup = false;
            }
        }
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
        z-index: 50;
        .content{
            width: 464px;
            height:240px;
            background: #ffffff;
            box-shadow: 0 0 10px #122F46;
            position: relative;
            padding: 40px 50px 0 50px;
            &>img:nth-child(1){
                position: absolute;
                top:25px;
                right:25px;
                width: 14px;
                height:14px;
                cursor: pointer;
            }
            &>div:nth-child(2){
                display: flex;
                align-items: center;
                &>img{
                    width: 26px;
                    height:26px;
                }
                &>div{
                    font-size: 16px;
                    font-weight: bold;
                    color:#FF0099;
                    margin-left: 5px;
                }
            }
            &>div:nth-child(3){
                font-size: 14px;
                color:#122F46;
                margin-top:10px;
                line-height: 16px;
            }
            &>div:nth-child(4){
                font-size: 14px;
                color:#122F46;
                margin-top:10px;
                line-height: 16px;
            }
            &>div:nth-child(5){
                font-size: 14px;
                color:#122F46;
                margin-top:10px;
                line-height: 16px;
            }
            &>div:nth-child(6){
                width: 120px;
                height:30px;
                text-align: center;
                line-height: 30px;
                font-size: 12px;
                color:#ffffff;
                cursor: pointer;
                margin: 0 auto;
                margin-top: 10px;
                background: #2FB7EC;
            }
        }
    }
</style>