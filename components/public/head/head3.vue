<template>
    <div class="head">
        <div>
            <a href="/" class="logo" target="_blank">
                <img src="/images/head3/logo.png" alt="族蚂网logo">
            </a>
            <div class="entrepName" @click="goToEntrep">{{entrepName}}</div>
            <div class="line"></div>
            <div class="websiteName">
                <span>网站管理：</span>
                <div>{{websiteName}}</div>
            </div>
        </div>
        <div>
            <div @click="goToMemberCenter">
                <img :src="userHeadImg" alt="用户头像" @load="handleImg($event,36,36)">
            </div>
            <div class="userName">{{userName}}</div>
        </div>
    </div>
</template>

<script>
    import publicUtil from '~/common/publicUtil';
    export default {
        name: "head3",
        data(){
            return{
                entrepName:null,
                websiteName:null,
                userHeadImg:null,
                userName:null,
                entrepId:null
            }
        },
        mounted(){
            console.log(123);
          this.getUserBasicInfo();
        },
        methods:{
            handleImg(e,maxWidth,maxHeight){
                publicUtil.handleImg(e,maxWidth,maxHeight);
            },
            getUserBasicInfo(){
                $.ajax({
                    url:this.interfaceApi.getUserBasicInfo,
                    data:{fShopId:this.$route.query.fShopId},
                    async:false,
                    success:(res)=>{
                        if(res.status === 0){
                            this.$store.commit("changeUserBasicInfo",res.data);
                            this.entrepName = res.data.currentShop.fCompanyName;
                            this.entrepId = res.data.currentShop.fCompanyId;
                            this.websiteName = res.data.currentShop.fName;
                            this.userHeadImg = res.data.user.userHead;
                            this.userName = res.data.user.userName;
                        }
                    },
                    error:(err)=>{
                        if(JSON.parse(err.responseText).status === -3){
                            window.location.href = '/denglu?url='+encodeURIComponent(window.location.href);
                        }
                    }
                });
            },
            goToEntrep(){
                $.ajax({
                    url: '/authority-sitebackend/userPermission/clearSiteBackendPermission',
                    async: false,
                });
                $.ajax({
                    url: '/changeEntrepInfo',
                    async: false,
                    data: {entrepId: this.entrepId},
                    success: (res) => {
                        if (res.status === 0) {
                            window.open("/shop_web/index?fEntrepId=" + this.entrepId);
                        }
                    }
                });
            },
            goToMemberCenter() {
                window.open("/member/index");
            },
        }
    }
</script>

<style scoped lang="less">
    .head{
        width: 100%;
        min-width: 1260px;
        height:100px;
        background: #3D9BE9;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        &>div:nth-child(1){
            display: flex;
            align-items: center;
            margin-left: 60px;
            .entrepName{
                margin-left: 40px;
                color:#ffffff;
                font-size: 16px;
                margin-right: 25px;
                cursor: pointer;
            }
            .line{
                width: 1px;
                height:20px;
                background: #E4E4E4;
            }
            .websiteName{
                display: flex;
                align-items: center;
                margin-left: 20px;
                color:#ffffff;
                font-size: 16px;
                &>div:nth-child(2){
                    margin-left: 15px;
                }
            }
        }
        &>div:nth-child(2){
            display: flex;
            align-items: center;
            margin-right: 105px;
            &>div:nth-child(1){
                width: 36px;
                height:36px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                border-radius: 50%;
                cursor: pointer;
            }
            .userName{
                margin-left: 10px;
                color:#ffffff;
                font-size: 16px;
            }
        }
    }
</style>