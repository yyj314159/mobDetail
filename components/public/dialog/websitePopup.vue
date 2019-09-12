<template>
    <div class="wrap"  @click="close">
        <div class="box" @click.stop>
            <img class="close" @click="close" src="/images/dialog/websitePopupClose.png" alt="关闭">
            <div class="head">
                <div>选择您的网站</div>
                <div class="errorTip" v-if="showError1">您暂无权限！请联系管理员开通权限！</div>
                <div class="errorTip" v-if="showError2">该网站主体被冻结，无法进行相关操作！如有疑问请联系族蚂客服！</div>
            </div>
            <div class="body">
                <vueScroll :ops="ops">
                    <div class="websiteList">
                        <div class="websiteItem" v-for="(item,index) in websiteList" :key="index" @click="chooseWebsite(item)">
                            <div>
                                <img :src="item.fLogo" alt="网站头像" @load="handleImg($event,100,100)">
                            </div>
                            <div>
                                <div>
                                    <div>{{item.fName}}</div>
                                    <img src="/images/dialog/mianfeiban.svg" alt="免费版">
                                </div>
                                <div class="url">{{item.fOutUrl?item.fOutUrl:item.fInUrl}}</div>
                                <div class="btn">
                                    选择网站
                                </div>
                            </div>
                        </div>
                        <div class="addWebsite" @click="addWebsite">
                            <img src="/images/dialog/addwebsite.png" alt="添加网站">
                            <span>添加网站</span>
                        </div>
                    </div>
                </vueScroll>
            </div>
        </div>
    </div>
</template>

<script>
    import publicUtil from '~/common/publicUtil';
    export default {
        name: "websitePopup",
        data() {
            return {
                showError1: false,
                showError2: false,
                ops:{
                    vuescroll: {},
                    scrollPanel: {},
                    rail: {//轨迹
                        keepShow: true
                    },
                    bar: {//滚动条
                        hoverStyle: false,
                        onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                        background: "rgb(98,146,166)",
                        opacity:0.3,
                        minSize: 0.3,
                        keepShow:true,
                    }
                },
                websiteList:[]
            }
        },
        mounted(){
            if(this.$store.state.isLogin){
                $.ajax({
                    url:this.interfaceApi.getUserBasicInfo,
                    success:(res)=>{
                        if(res.status === 0){
                            this.$store.commit("changeUserBasicInfo",res.data);
                            this.websiteList = res.data.shopList;
                        }
                    }
                })
            }
        },
        computed:{
            //弹窗的配置项
            popupConfig(){
                return this.$store.state.popupConfig;
            },
            //当前选择模板的信息
            templateInfo(){
                return this.$store.state.templateInfo;
            },
            //登录用户的基本信息
            userBasicInfo(){
                return this.$store.state.userBasicInfo;
            }
        },
        methods:{
            //关闭弹窗
            close(){
                this.$store.commit("changePopupConfig",{
                    isShow:false,
                    module:null,
                    type:null
                })
            },
            //处理网站图片
            handleImg(e,maxWidth,maxHeight){
                publicUtil.handleImg(e,maxWidth,maxHeight);
            },
            //选择网站
            chooseWebsite(obj){
                this.showError1 = false;
                this.showError2 = false;
                this.getEntrepIsForbidden(obj);
            },
            //获取主体是否是冻结状态
            getEntrepIsForbidden(obj){
                $.ajax({
                    url:this.interfaceApi.getEntrepIsForbidden,
                    data:{
                        fEntrepId:obj.fCompanyId
                    },
                    type:'post',
                    async:false,
                    success:(res)=>{
                        if(res.status === 0){
                            if(res.data){//冻结
                                this.showError2 = true;
                                setTimeout(()=>{
                                    this.showError2 = false
                                },3000);
                            }else{
                                if(this.popupConfig.module === 4){//进入网站后台不用判断权限
                                    this. goToHandle(obj);
                                }else{
                                    this.getIsHasAuthority(obj);
                                }

                            }
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                })
            },
            //判断当前登录用户是否有权限编辑当前选择的网站
            getIsHasAuthority(obj){
                $.ajax({
                    url:this.interfaceApi.getIsHasAuthority,
                    data:{
                        requestUrl:'/website/site/editWeb',
                        fEntrepId: obj.fCompanyId
                    },
                    type:'post',
                    async:false,
                    success:(res)=>{
                       if(res.status === 0){//有权限
                            this.goToHandle(obj);
                       }else{
                           this.showError1 = true;
                           setTimeout(()=>{
                              this.showError1 = false;
                           },3000);
                       }
                    }
                })
            },
            //根据弹窗设置里面的module的值不一样，做不一样的处理
            //1：已经进入过编辑器的直接进入编辑器或没有进入过编辑器的去模板页；2：使用模板；3：收费模板进入分享页；4：进入网站后台
            goToHandle(obj){
                switch (this.popupConfig.module) {
                    case 1:
                        $.ajax({
                            url:this.interfaceApi.getSiteIdByShopId,
                            data:{
                                fShopId:obj.fId
                            },
                            type:'post',
                            async:false,
                            success:(res)=>{
                                this.close();
                                setTimeout(()=>{
                                    if(res.status === 0){
                                        if(res.data){
                                            window.open(this.$store.state.domainObj.editorDomain+'/?type=website&fWebsiteId='+res.data+'&fShopId='+obj.fId);
                                        }else{
                                            window.open(this.$store.state.domainObj.jzDomain+'/moban?fShopId='+obj.fId);
                                        }
                                    }
                                },10);
                            }
                        });
                        break;
                    case 2:
                        $.ajax({
                            url:this.interfaceApi.getSiteIdByShopId,
                            data:{
                                fShopId:obj.fId
                            },
                            async:false,
                            type:'post',
                            success:(res)=>{
                                if(res.status === 0){
                                    this.close();
                                    if(res.data){//有历史数据
                                        if(this.templateInfo.fIsFree){//收费模板
                                            this.$store.commit("changeTipConfig",{
                                                isShow:true,
                                                type:3,//收费模板且网站有历史编辑数据
                                                props:{
                                                    fShopId:obj.fId,
                                                    templateId:this.templateInfo.fId,
                                                    userType:this.userBasicInfo.userType
                                                }
                                            })
                                        }else{
                                            this.$store.commit("changeTipConfig",{
                                                isShow:true,
                                                type:4,//免费模板且网站有历史编辑数据
                                                props:{
                                                    fShopId:obj.fId,
                                                    templateId:this.templateInfo.fId,
                                                    userType:this.userBasicInfo.userType
                                                }
                                            });
                                        }
                                    }else{
                                        if(this.templateInfo.fIsFree){
                                            this.$store.commit("changeTipConfig",{
                                                isShow:true,
                                                type:1,//收费模板且网站没有历史编辑数据
                                                props:{
                                                    fShopId:obj.fId,
                                                    templateId:this.templateInfo.fId,
                                                    userType:this.userBasicInfo.userType
                                                }
                                            })
                                        }else{
                                            this.$store.commit("changeTipConfig",{
                                                isShow:true,
                                                type:2,//免费模板且网站没有历史编辑数据
                                                props:{
                                                    fShopId:obj.fId,
                                                    templateId:this.templateInfo.fId,
                                                    userType:this.userBasicInfo.userType
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        });
                        break;
                    case 3:
                        this.close();
                        setTimeout(()=>{
                            window.open(`/templateshare?fShopId=${obj.fId}&fTemplateId=${this.templateInfo.fId}`);
                        },10);
                        break;
                    case 4:
                        $.ajax({
                            url: '/authority-sitebackend/userPermission/clearSiteBackendPermission',
                            async: false,
                        });
                        $.ajax({
                            url: '/changeEntrepInfo',
                            async: false,
                            data: {entrepId: obj.fCompanyId},
                            success: (res) => {
                                if (res.status === 0) {
                                    this.close();
                                    setTimeout(() => {
                                        window.open(`/shop_web/webSiteSet/index?fShopId=${obj.fId}&fEntrepId=${obj.fCompanyId}`);
                                    }, 10);
                                }
                            }
                        });
                        break;
                }
            },
            addWebsite(){
                this.close();
                setTimeout(()=>{
                    window.open("/pcMemberCenter/asOne");
                },10);
            }
        },

    }
</script>

<style scoped lang="less">
    .wrap {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        background: rgba(18, 47, 70, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        .box {
            width: 750px;
            height: 545px;
            background: #ffffff;
            position: relative;
            .close {
                width: 15px;
                height: 15px;
                position: absolute;
                top: 30px;
                right: 40px;
                cursor: pointer;
            }
            .head {
                margin-top: 30px;
                margin-left: 30px;
                display: flex;
                align-items: center;
                &>div:nth-child(1){
                    font-size: 24px;
                    font-weight: bold;
                    color:#122F46;
                }
                .errorTip{
                    font-size: 14px;
                    color:#FF0000;
                    margin-left: 20px;
                }
            }
            .body{
                width: 100%;
                padding-left: 30px;
                height:450px;
                margin-top: 15px;
                .websiteList{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    .websiteItem{
                        width: 340px;
                        height:140px;
                        cursor: pointer;
                        border-radius: 5px;
                        margin:5px;
                        display: flex;
                        align-items: center;
                        padding: 0 20px;
                        &:hover{
                            box-shadow: 0 0 10px rgba(0,0,0,0.2);
                        }
                        &>div:nth-child(1){
                            width: 100px;
                            height:100px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            overflow: hidden;
                        }
                        &>div:nth-child(2){
                            margin-left: 20px;
                            width: 180px;
                            &>div:nth-child(1){
                                width: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                &>div:nth-child(1){
                                    height:20px;
                                    line-height: 20px;
                                    font-size: 14px;
                                    max-width: 100px;
                                    overflow: hidden;
                                    word-break: break-all;
                                }
                                &>img:nth-child(2){
                                    width: 70px;
                                }
                            }
                            .url{
                                height:20px;
                                font-size: 14px;
                                line-height: 20px;
                                color:#6292A6;
                                word-break: break-all;
                                margin-top:10px;
                                overflow: hidden;
                            }
                            .btn{
                                width: 100px;
                                height:30px;
                                border: 1px solid #2FB7EC;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 13px;
                                color:#2FB7EC;
                                margin-top: 20px;
                            }
                        }
                    }
                    .addWebsite{
                        width: 340px;
                        height:140px;
                        cursor: pointer;
                        border-radius: 5px;
                        margin:5px;
                        display: flex;
                        align-items: center;
                        padding: 0 20px;
                        cursor: pointer;
                        &:hover{
                            box-shadow: 0 0 10px rgba(0,0,0,0.2);
                        }
                        &>img:nth-child(1){
                            width: 100px;
                            height:100px;
                        }
                        &>span:nth-child(2){
                            font-size: 14px;
                            color:#122F46;
                            margin-left: 20px;
                        }
                    }
                }
            }
        }
    }
</style>