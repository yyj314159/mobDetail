<template>
    <div class="box">
        <div class="content">
            <img @click="close" src="/images/purchase/close3.png" alt="关闭">
            <div>
                <img src="/images/purchase/warn.png" alt="提示">
                <div>重要提示！</div>
            </div>
            <div>您本次选择的IP类型与当前使用的IP类型不一致！</div>
            <div>如切换IP类型，将为您重新分配IP地址，您需要届时重新进行域名解析！</div>
            <div>
                <div>
                    <span>您的当前套餐可抵扣：</span>
                    <span>{{money}}元</span>
                </div>
                <div>
                    <img src="/images/purchase/wenhao.png" alt="问号">
                    <div>抵扣金额是根据您当前站点生效套餐的剩余价值计算出来的，可在购买升级版本时用于金额抵扣。</div>
                </div>
            </div>
            <div>
                <div @click="close">取消购买</div>
                <div @click="continuePay">继续购买</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "purchaseIpPopup1",
        props:['money'],
        methods:{
            close(){
                this.$parent.isShowIpPopup1 = false;
            },
            continuePay(){
                this.$emit("pay",true);
                this.$parent.isShowIpPopup1 = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .box {
        width: 100%;
        height: 100%;
        background: rgba(18, 47, 70, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        .content {
            width: 464px;
            height: 240px;
            background: #ffffff;
            box-shadow: 0 0 10px #122F46;
            position: relative;
            padding: 40px 50px 0 50px;
            &>img:nth-child(1) {
                position: absolute;
                top: 25px;
                right: 25px;
                width: 14px;
                height: 14px;
                cursor: pointer;
            }
            &>div:nth-child(2) {
                display: flex;
                align-items: center;
                &>img {
                    width: 26px;
                    height: 26px;
                }
                &>div {
                    font-size: 16px;
                    font-weight: bold;
                    color: #FF0099;
                    margin-left: 5px;
                }
            }
            &>div:nth-child(3) {
                font-size: 14px;
                color: #122F46;
                margin-top: 10px;
                line-height: 16px;
            }
            &>div:nth-child(4) {
                font-size: 14px;
                color: #122F46;
                margin-top: 10px;
                line-height: 16px;
            }
            &>div:nth-child(5) {
                font-size: 14px;
                color: #122F46;
                margin-top: 10px;
                display: flex;
                align-items: center;
                &>div:nth-child(1){
                    display: flex;
                    align-items: center;
                    &>span:nth-child(2){
                        font-weight: bold;
                        color:#FF0099;
                        font-size: 16px;
                    }
                }
                &>div:nth-child(2){
                    position: relative;
                    margin-left: 10px;
                    &>div:nth-child(2){
                        position: absolute;
                        width: 250px;
                        height:90px;
                        border:1px solid #2FB7EC;
                        padding: 0 10px;
                        align-items: center;
                        top:-87px;
                        left:13px;
                        background: #ffffff;
                        color:#9FACBC;
                        font-size: 13px;
                        display: none;
                        cursor: pointer;
                    }
                    &:hover>div:nth-child(2){
                        display: flex;
                    }
                }
            }
            &>div:nth-child(6) {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
                &>div:nth-child(1){
                    width: 120px;
                    height: 30px;
                    font-size: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #2FB7EC;
                    color:#2FB7EC;
                }
                &>div:nth-child(2){
                    margin-left: 10px;
                    width: 120px;
                    height: 30px;
                    font-size: 12px;
                    color: #ffffff;
                    cursor: pointer;
                    background: #2FB7EC;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
</style>