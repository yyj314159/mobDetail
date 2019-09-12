<template>
    <div class="wrap"  @click="close">
        <div class="box" @click.stop>
            <img class="close" @click="close" src="/images/dialog/websitePopupClose.png" alt="关闭">
            <div class="head">
                <div>选择主体</div>
                <div class="errorTip" v-if="showError1">您暂无权限！请联系管理员开通权限！</div>
                <div class="errorTip" v-if="showError2">该主体被冻结，无法进行相关操作！如有疑问请联系族蚂客服！</div>
                <div class="errorTip" v-if="showError3">该主体{{limitTime}}处于限制发布{{moduleName}}阶段</div>
            </div>
            <div class="body">
                <vueScroll :ops="ops">
                    <div class="entrepList">
                        <div class="entrepItem" v-for="(item,index) in entrepList" :key="index" @click="chooseEntrep(item)">
                            <div>
                                <div>
                                    <img :src="item.fLogo?item.fLogo:'/shop_web/shop/images/zhutiLogo.png'" alt="主体头像" @load="handleImg($event,50,50)">
                                </div>
                                <div>
                                    <div>
                                        <div>{{item.fName}}</div>
                                        <img src="/images/dialog/mianfeiban.svg" alt="免费版">
                                    </div>
                                    <div class="entrepType">主体类型：{{getEntrepType(item.siteType)}}</div>
                                </div>
                            </div>
                            <div class="btn">
                                选择主体
                            </div>
                        </div>
                        <div class="addEntrep" @click="addEntrep">
                            <img src="/images/dialog/addwebsite.png" alt="创建主体">
                            <span>创建主体</span>
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
        name: "entrepPopup",
        data() {
            return {
                showError1: false,
                showError2: false,
                showError3:false,
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
                entrepList:[],
                limitTime:'',//主体限制的时间
                moduleName:'',
            }
        },
        mounted(){
            if(this.$store.state.isLogin){
                $.ajax({
                    url:this.interfaceApi.getUserBasicInfo,
                    success:(res)=>{
                        if(res.status === 0){
                            this.$store.commit("changeUserBasicInfo",res.data);
                            this.entrepList = res.data.entrepList;
                        }
                    }
                })
            }
            this.getModuleName();
        },
        computed:{
            popupConfig(){
                return this.$store.state.popupConfig;
            }
        },
        methods:{
            //获取主体类型
            getEntrepType(type){
                let typeStr = null;
                switch (type) {
                    case "COMPANY":
                        typeStr = '公司/企业';
                        break;
                    case "PARTY_AND_GOVERNMENT":
                        typeStr = '党政机关';
                        break;
                    case "INSTITUTION":
                        typeStr = '事业单位';
                        break;
                    case "SOCIO_GROUP":
                        typeStr = '社会团体';
                        break;
                    case "PEOPLE_RUN_UNITS":
                        typeStr = '民办非企业单位';
                        break;
                    case "FOUNDATION":
                        typeStr = '基金会';
                        break;
                    case "PERSONAL":
                        typeStr = '个人';
                        break;
                }
                return typeStr;
            },
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
            //选择主体
            chooseEntrep(obj){
                this.showError1 = false;
                this.showError2 = false;
                this.showError3 = false;
                if(this.popupConfig.module === 1){
                    $.ajax({
                        url: '/authority-sitebackend/userPermission/clearSiteBackendPermission',
                        async: false,
                    });
                    $.ajax({
                        url: '/changeEntrepInfo',
                        async: false,
                        data: {entrepId: obj.fId},
                        success: (res) => {
                            if (res.status === 0) {
                                this.goToHandle(obj);
                            }
                        }
                    });
                }else{
                    this.getEntrepIsForbidden(obj);
                }
            },
            //获取主体是否是冻结状态
            getEntrepIsForbidden(obj){
                console.log(obj);
                $.ajax({
                    url:this.interfaceApi.getEntrepIsForbidden,
                    data:{
                        fEntrepId:obj.fId
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
                                this.getIsHasAuthority(obj);
                            }
                        }
                    },
                    error:(err)=>{
                        console.log(err);
                    }
                })
            },
            //判断当前登录用户是否有权限做一些操作
            getIsHasAuthority(obj){
                let requestUrl = this.getRequestUrl();
                $.ajax({
                    url:this.interfaceApi.getIsHasAuthority,
                    data:{
                        requestUrl:requestUrl,
                        fEntrepId: obj.fId
                    },
                    type:'post',
                    async:false,
                    success:(res)=>{
                        if(res.status === 0){
                            if(this.popupConfig.module < 10){//需要判断主体限制的
                                this.getEntrepIsLimit(obj);
                            }else{
                                $.ajax({
                                    url: '/authority-sitebackend/userPermission/clearSiteBackendPermission',
                                    async: false,
                                });
                                $.ajax({
                                    url: '/changeEntrepInfo',
                                    async: false,
                                    data: {entrepId: obj.fId},
                                    success: (res) => {
                                        if (res.status === 0) {
                                            this.goToHandle(obj);
                                        }
                                    }
                                });
                            }
                        }else{
                            this.showError1 = true;
                            setTimeout(()=>{
                                this.showError1 = false;
                            },3000);
                        }
                    }
                })
            },
            getRequestUrl(){
                let requestUrl = null;
                switch(this.popupConfig.module){
                    case 2:
                        //发布产品
                        requestUrl = "/product/getProductCategory";
                        break;
                    case 3:
                        //发布服务
                        requestUrl = "/zmService/toAddSysServiceCategory";
                        break;
                    case 4:
                        //发布音频
                        requestUrl = "/music/addView";
                        break;
                    case 5:
                        //发布创作人
                        requestUrl = "/creatorsClaim/creatorsClaim";
                        break;
                    case 6:
                        //发布专辑
                        requestUrl = '/publicAlbum/addview';
                        break;
                    case 7:
                        //发布视频
                        requestUrl = '/shopVideoInfo/categorySelect';
                        break;
                    case 8:
                        //发布资讯
                        requestUrl = '/news/web/addNews';
                        break;
                    case 9:
                        //发布文章
                        requestUrl = '/shopBlog/editView';
                        break;
                    case 10:
                        //添加调查问卷
                        requestUrl = '/shop_web/zmQuestionnaire/addquestionnaire';
                        break;
                    case 11:
                        //文件上传
                        requestUrl = '/shopFile/index';
                        break;
                }
                return requestUrl;
            },
            getEntrepIsLimit(obj){
                let type = this.getType();
                $.ajax({
                    url:this.interfaceApi.getSiteHandleInfo,
                    data:{fEntrepId:obj.fId,type:type},
                    async:false,
                    success:res=>{
                        if(res.status === 0){
                            if(res.data.limited === 1){
                                if(res.data.forever === 1){
                                    this.limitTime = '永久性'
                                }else if(res.data.forever === 0){
                                    this.limitTime = res.data.endTime+'前';
                                }
                                this.showError3 = true;
                                setTimeout(()=>{
                                    this.showError3 = false;
                                },3000);
                            }else{
                                $.ajax({
                                    url: '/authority-sitebackend/userPermission/clearSiteBackendPermission',
                                    async: false,
                                });
                                $.ajax({
                                    url: '/changeEntrepInfo',
                                    async: false,
                                    data: {entrepId: obj.fId},
                                    success: (res) => {
                                        if (res.status === 0) {
                                            this.goToHandle(obj);
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            },
            getType(){
              let type = null;
              switch(this.popupConfig.module){
                  case 2:
                      //产品
                      type = 'product';
                      break;
                  case 3:
                      //服务
                      type = 'service';
                      break;
                  case 4:
                      //音频
                      type = 'audio';
                      break;
                  case 5:
                      //创作人
                      type = 'audio_composer';
                      break;
                  case 6:
                      //专辑
                      type = 'album';
                      break;
                  case 7:
                      //视频
                      type = 'video';
                      break;
                  case 8:
                      //资讯
                      type = 'news';
                      break;
                  case 9:
                      //文章
                      type = 'blog';
                      break;
              }
              return type;
            },
            getModuleName(){
                let moduleName = null;
                switch(this.popupConfig.module){
                    case 2:
                        //产品
                        moduleName = '产品';
                        break;
                    case 3:
                        //服务
                        moduleName = '服务';
                        break;
                    case 4:
                        //音频
                        moduleName = '音频';
                        break;
                    case 5:
                        //创作人
                        moduleName = '创作人';
                        break;
                    case 6:
                        //专辑
                        moduleName = '专辑';
                        break;
                    case 7:
                        //视频
                        moduleName = '视频';
                        break;
                    case 8:
                        //资讯
                        moduleName = '资讯';
                        break;
                    case 9:
                        //文章
                        moduleName = '文章';
                        break;
                }
                this.moduleName = moduleName;
            },
            //根据弹窗设置里面的module的值不一样，做不一样的处理
            //1：进入主体后台； 2：发布产品；3：发布服务；4：发布音频；5：发布创作人；6：发布专辑；7：发布视频；8：发布资讯；9：发布文章；10：添加调查问卷；11：文件上传
            goToHandle(obj){
                switch(this.popupConfig.module){
                    case 1:
                        this.close();
                        setTimeout(()=>{
                            window.open("/shop_web/index?fEntrepId=" + obj.fId);
                        },10);
                        break;
                    case 2:
                        this.close();
                        setTimeout(()=>{
                            window.open("/product_web/product/getProductCategory?fEntrepId=" + obj.fId);
                        },10);
                        break;
                    case 3:
                        this.close();
                        setTimeout(()=>{
                            window.open("/service_web/zmService/toAddSysServiceCategory?fEntrepId=" + obj.fId);
                        },10);
                        break;
                    case 4:
                        this.close();
                        setTimeout(()=>{
                            window.open("/audio_web/music/addView?fEntrepId=" + obj.fId);
                        },10);
                        break;
                    case 5:
                        this.close();
                        setTimeout(()=>{
                            window.open("/audio_web/creatorsClaim/creatorsClaim?fEntrepId=" + obj.fId);
                        },10);
                        break;
                    case 6:
                        this.close();
                        setTimeout(()=>{
                            window.open("/audio_details/publicAlbum/addview?fEntrepId=" + obj.fId+"&operationSource=0");
                        },10);
                        break;
                    case 7:
                        this.close();
                        setTimeout(()=>{
                            window.open("/video_web/shopVideoInfo/categorySelect?fEntrepId=" + obj.fId);
                        },10);
                        break;
                    case 8:
                        this.close();
                        setTimeout(()=>{
                            window.open("/news_detail/newsDetailPage/edit?fEntrepId=" + obj.fId);
                        },10);
                        break;
                    case 9:
                        this.close();
                        setTimeout(()=>{
                            window.open("/blog_web/shopBlog/editView?fEntrepId=" + obj.fId);
                        },10);
                        break;
                    case 10:
                        this.close();
                        setTimeout(()=>{
                            window.open("/shop_web/zmQuestionnaire/addquestionnaire?fEntrepId=" + obj.fId);
                        },10);
                        break;
                    case 11:
                        this.close();
                        setTimeout(()=>{
                            window.open("/shopFile/index?fEntrepId=" + obj.fId);
                        },10);
                        break;
                }
            },
            addEntrep(){
                this.close();
                setTimeout(()=>{
                    window.open("/pcMemberCenter/asOne");
                },10);
            }
        }

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
                .entrepList{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    .entrepItem{
                        width: 340px;
                        height:140px;
                        cursor: pointer;
                        border-radius: 5px;
                        margin:5px;
                        display: flex;
                        flex-direction: column;
                        padding: 0 20px;
                        &:hover{
                            box-shadow: 0 0 10px rgba(0,0,0,0.2);
                        }
                        &>div:nth-child(1){
                            display: flex;
                            align-items: center;
                            margin-top: 20px;
                            &>div:nth-child(1){
                                width: 50px;
                                height:50px;
                                border-radius: 50%;
                                overflow: hidden;
                            }
                            &>div:nth-child(2){
                                display: flex;
                                height:50px;
                                flex-direction: column;
                                margin-left: 10px;
                                &>div:nth-child(1){
                                    display: flex;
                                    align-items: center;
                                    &>div:nth-child(1){
                                        font-size: 14px;
                                        color:#122F46;
                                        width: 167px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    }
                                    &>img:nth-child(2){
                                        width: 67px;
                                        margin-left: 5px;
                                    }
                                }
                            }
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
                    .addEntrep{
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