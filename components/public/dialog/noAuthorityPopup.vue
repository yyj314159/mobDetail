<template>
    <div class="box">
        <div class="content">
            <img @click="close" src="/images/dialog/close.png" alt="">
            <div>
                <img src="/images/dialog/warn.png" alt="">
                <div>重要提示！</div>
            </div>
            <div>用户信息不匹配，您暂无此操作权限！</div>
            <div @click="close">我知道了</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "noAuthorityPopup",
        methods: {
            close(){
                this.$parent.isShowNoAuthorityPopup = false;
            }
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
                margin-bottom: 10px;
            }
            &>div:nth-child(4){
                width: 120px;
                height:30px;
                text-align: center;
                line-height: 30px;
                font-size: 12px;
                color:#ffffff;
                cursor: pointer;
                margin: 0 auto;
                margin-top: 30px;
                background: #2FB7EC;
            }
        }
    }
</style>
