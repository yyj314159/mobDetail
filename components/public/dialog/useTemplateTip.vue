<template>
    <div class="wrap" v-if="useTemplateTipConfig.isShow">
        <div class="content" v-if="useTemplateTipConfig.type === 1">
            <img src="/images/dialog/useTemplateTip1.png" alt="使用收费模板并没有历史数据提示">
            <div class="close" @click="close"></div>
            <div class="btn" @click="useTemplate"></div>
        </div>
        <div class="content" v-if="useTemplateTipConfig.type === 2">
            <img src="/images/dialog/useTemplateTip2.png" alt="使用免费模板并没有历史数据提示">
            <div class="close" @click="close"></div>
            <div class="btn" @click="useTemplate"></div>
        </div>
        <div class="content" v-if="useTemplateTipConfig.type === 3">
            <img src="/images/dialog/useTemplateTip3.png" alt="使用收费模板并有历史数据提示">
            <div class="close" @click="close"></div>
            <div class="btn1" @click="close"></div>
            <div class="btn2" @click="useTemplate"></div>
        </div>
        <div class="content" v-if="useTemplateTipConfig.type === 4">
            <img src="/images/dialog/useTemplateTip4.png" alt="使用免费模板并有历史数据提示">
            <div class="close" @click="close"></div>
            <div class="btn1" @click="close"></div>
            <div class="btn2" @click="useTemplate"></div>
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
           useTemplateTipConfig(){
               return this.$store.state.useTemplateTipConfig
           }
        },
        methods:{
            close(){
                this.$store.commit("changeTipConfig",{
                    isShow:false,
                    type:null
                });
                this.$store.commit("changeTemplateInfo",null);
            },
            useTemplate(){
                let fShopId = this.useTemplateTipConfig.props.fShopId;
                let templateId = this.useTemplateTipConfig.props.templateId;
                let userType = this.useTemplateTipConfig.props.userType;
                this.close();
                setTimeout(()=>{
                    window.open(`/switchtemplate?fShopId=${fShopId}&templateId=${templateId}&userType=${userType}`)
                },10);
            }
        }
    }
</script>

<style scoped lang="less">
    .wrap{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height:100%;
        z-index: 1000;
        background: rgba(18, 47, 70, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        .content{
            position: relative;
            width: 600px;
            height:340px;
            .close{
                position: absolute;
                width: 20px;
                height:20px;
                top:22px;
                right:24px;
                cursor: pointer;
            }
            .btn{
                width: 160px;
                height:46px;
                position: absolute;
                left:60px;
                bottom:62px;
                cursor: pointer;
            }
            .btn1{
                width: 160px;
                height:46px;
                position: absolute;
                left:60px;
                bottom:42px;
                cursor: pointer;
            }
            .btn2{
                width: 160px;
                height:46px;
                position: absolute;
                left:240px;
                bottom:42px;
                cursor: pointer;
            }
        }
    }
</style>