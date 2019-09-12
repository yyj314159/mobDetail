<template>
    <div class="func">
        <div class="funcHead">
            <div class="line"></div>
            <div class="funcTitle">
                <h1>专业核心功能，简单易上手</h1>
                <h4>功能类型涵盖了创业公司、企业、工作室、机构组织与个人</h4>
            </div>
        </div>

        <div class="funcon">
            <div class="funconBlock">
                <div class="list" v-for="(item,i) in list" :key='i'>
                    <div class="listInner">
                        <img :src="item.img" :alt="item.title" />
                        <div class="title">{{item.title}}</div>
                        <div class="item">
                            <div class="sub" v-for="(aaa,j) in item.sublist" :key='j'><i></i>{{aaa}}</div>
                            <div class="clear"></div>
                        </div>
                        <a href="javascript:void(0);" @click="goToExperience(i)"><button>立即体验</button></a>
                    </div>
                </div>
                <div class="clear"></div>
            </div>

            <!-- <button class="more">查看更多功能</button> -->

        </div>        
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[{
                img:'/images/index/wzyh.png',
                title:'网站建设',
                sublist:[
                    '三网合一',
                    '专属域名',
                    '产品服务',
                    '公众号关联',
                    'SEO优化',
                    '免费10G空间'
                ]
            },{
                img:'/images/index/wzjs.png',
                title:'电子商务',
                sublist:[
                    '营销工具',
                    '会员管理体系',
                    '在线下单',
                    '线上线下结合',
                    '支付系统',
                    '26万种交易流程'
                ]
            },{
                img:'/images/index/dwcb.png',
                title:'多维传播',
                sublist:[
                    'APP开发',
                    '微传单',
                    '电子名片',
                    '小程序',
                    '公众号助手',
                    '全网营销'
                ]
            },{
                img:'/images/index/aqwd.png',
                title:'安全稳定',
                sublist:[
                    '高防IP',
                    '云安全',
                    '数据备份',
                    'CDN加速',
                    '升级维护',
                    '定时安全检查'
                ]
            }]
        }
    },
    methods:{
        goToExperience(index){
            if(index === 0){
                this.$store.commit('requestLoginInfo', {
                    noLoginCallBack: () => {
                        window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
                    },
                    loginCallBack: () => {
                        this.$store.commit("changePopupConfig",{
                            isShow:true,
                            module:1,//进入编辑器或者进入模板选择页
                            type:'website'
                        })
                    }
                })
            }else{
                this.$store.commit('requestLoginInfo', {
                    noLoginCallBack: () => {
                        window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
                    },
                    loginCallBack: () => {
                        this.$store.commit("changePopupConfig",{
                            isShow:true,
                            module:1,//进入主体后台
                            type:'entrep'
                        })
                    }
                })
            }
        }
    }

}
</script>
<style lang="less" scoped>
.func{
    
    .funcHead{
        position:relative;
        height:86px;
        .line{
            height:2px;
            width:100%;
            background:#adadad;
            position:absolute;
            top:42px;
            
        }
        .funcTitle{
            background:#ffffff;
            width:620px;
            text-align:center;
            position:absolute;
            left:50%;
            margin-left:-310px;
            right:0;
            z-index:1;
            h1{
                font-size:42px;
                color:#333333;
            }
            h4{
                margin-top:7px;
                font-size:16px;
                color:#666666;
            }
        }
    }

    .funcon{
        margin-top:60px;
        min-width:1200px;
        padding-bottom:100px;
        background:url('/images/index/hxgnbg.png') center center;
        text-align:center;
        .funconBlock{
            width:1200px;
            padding-top:80px;
            margin:0 auto;
            .list{
                width:272px;
                height:408px;
                background:#ffffff;
                float:left;
                margin-left:17px;
                margin-right:17px;
                transition: transform 0.5s;
                transform: translateY(0);
                &:hover{
                    transform:translateY(-10px);
                }
                .listInner{
                    width:256px;
                    height:390px;
                    margin:9px auto;
                    border:1px solid #e5e5e5;
                    text-align:center;
                    img{
                        margin:28px auto;
                        width:62px;
                        height:62px;
                    }
                    .title{
                        font-size:24px;
                    }
                    .item{
                        padding-left:24px;
                        margin:50px auto 40px;
                        .sub{
                            float:left;
                            width:115px;
                            height:30px;
                            line-height:30px;                            
                            text-align:left;
                            padding-left:12px;
                            overflow:hidden;
                            position:relative;
                            i{
                                position:absolute;
                                display:inline-block;
                                height:4px;
                                width:4px;
                                left:0px;
                                top:13px;
                                border-radius:50%;
                                background:#555555;
                            }
                        }                        
                    }
                    button{
                        width:132px;
                        height:34px;
                        line-height:34px;
                        text-align:center;
                        color:#00b9f2;
                        background:#ffffff;
                        border:1px solid #00b9f2;
                        border-radius:17px;
                        cursor:pointer;
                    }
                }
            }
            div.list:nth-child(1){
                margin-left:0px;
            }
            div.list:nth-child(4){
                margin-right:0px;
            }
        }

        .more{
            width:360px;
            height:50px;
            line-height:50px;
            background:#00b9f2;
            color:#ffffff;
            font-size:18px;
            border-radius:2px;
            margin:77px auto 0px;
            cursor:pointer;
            outline:none;
        }
        
    }

    


    
}
</style>