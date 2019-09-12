<template>
    <div class="box">
        <img class="back" src="/images/login/back.png" alt="回到上一页" @click="back">
        <div>账户登录</div>
        <div>您的账号已被冻结，无法登录</div>
        <div @click="back">登录其他账号</div>
    </div>
</template>

<script>
    export default {
        name: "notCanLogin",
        methods:{
            back(){
                this.$parent.isLogin = true;
                this.$parent.isWxLogin = false;
                this.$parent.isBindPhone = false;
                this.$parent.isNotCanLogin = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .box{
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
        &>div:nth-child(2) {
            margin-top: 60px;
            font-size: 20px;
            font-weight: bold;
            color: #122F46;
        }
        &>div:nth-child(3){
            height:40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color:#FF0033;
        }
        &>div:nth-child(4){
            width: 270px;
            height:40px;
            font-size: 14px;
            font-weight: bold;
            color:#ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            background:#2FB7EC ;
            cursor: pointer;
        }
    }
</style>