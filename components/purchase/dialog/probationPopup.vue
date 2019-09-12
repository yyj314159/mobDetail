<template>
    <div class="box">
        <div class="content">
            <img @click="close" src="/images/close3.png" alt="">
            <div>
                <img src="/images/success1.png" alt="">
                <div>已领取试用资格！</div>
            </div>
            <div>您已成功领取{{data.fProbationDays}}天{{data.fName}}使用权限！有效期至{{data.fOrderDueTime | formatTime}}，如需继续使用请购买服务！</div>
            <div @click="close">我知道了</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "probationPopup",
        props:['data'],
        filters:{
            formatTime(val){
                if(val){
                    let year = new Date(val).getFullYear();
                    let month = new Date(val).getMonth()+1;
                    let day = new Date(val).getDate();
                    return `${year}年${month}月${day}日`;
                }
            },
        },
        methods:{
            close(){
                this.$parent.isShowProbationPopup = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .box{
        width: 100%;
        height:100%;
        position: fixed;
        top:0;
        left:0;
        background: rgba(18,47,70, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        .content{
            width: 464px;
            height:218px;
            background: #ffffff;
            box-shadow: 0 0 10px #122F46;
            position: relative;
            padding: 40px 50px;
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
                &>div:nth-child(2){
                    font-size: 16px;
                    font-weight: bold;
                    color:#122F46;
                    margin-left: 5px;
                }
            }
            &>div:nth-child(3){
                font-size: 14px;
                color:#122F46;
                line-height: 24px;
                margin-top: 10px;
            }
            &>div:nth-child(4){
                width: 120px;
                height:30px;
                color:#ffffff;
                text-align: center;
                line-height: 30px;
                font-size: 12px;
                margin: 0 auto;
                margin-top: 20px;
                background: #2FB7EC;
                cursor: pointer;
            }
        }
    }
</style>