<template>
    <div class="info grayBg">
        <div class="infoHead">
            <div class="line"></div>
            <div class="infoTitle">
                <h1>族蚂信息互联网+解决方案</h1>
                <h4>国内领先、最全的互联网+产品，祝您畅享流量红利</h4>
            </div>
        </div>
        <div class="infoContent">
            <div :class="['infoBlock',index%2==0?'grayBg':'whiteBg']" v-for="(item,index) in list">
                <div class="infoInner" v-if="index%2==0">
                    <div class="imgDiv wow fadeInLeft" data-wow-delay="0.3s" data-wow-duration="1.5s">
                        <img :src="item.image" :alt="item.title">
                    </div>
                    <div class="textDiv paddingLeft33 wow fadeInRight" data-wow-delay="0.3s" data-wow-duration="1.5s">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="slogan" v-html="item.slogan">

                        </div>
                        <div class="function">
                            <p v-for="(aaa,i) in item.func" :key="i">{{aaa}}</p>
                        </div>
                        <button class="btn" @click="chooseSiteOrEntrep(index)">{{item.btnName}}</button>
                    </div>
                </div>

                <div class="infoInner" v-else>
                    <div class="textDiv paddingLeft110  wow fadeInLeft" data-wow-delay="0.3s" data-wow-duration="1.5s">
                         <div class="title">
                            {{item.title}}
                        </div>
                        <div class="slogan" v-html="item.slogan">
                            {{item.slogan}}
                        </div>
                        <div class="function">
                            <p v-for="(bbb,j) in item.func" :key="j">{{bbb}}</p>
                        </div>
                        <button class="btn" @click="chooseSiteOrEntrep(index)">{{item.btnName}}</button>
                    </div>
                    <div class="imgDiv flushRight wow fadeInRight" data-wow-delay="0.3s" data-wow-duration="1.5s">
                        <img :src="item.image" :alt="item.title">                       
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[{
                image:'/images/index/jianzhan.png',
                title:'族蚂建站',
                slogan:'建网站不求人,自助搭建在线交易网站！',
                func:[
                    '千套精美模板，PC + 手机 + 微信网站三网合一',
                    '可视化网页编辑器，自由拖拽、拼接、组合',
                    '内置完善的SEO搜索引擎优化机制，快速有效提升排名',
                    '免费IP地址，域名解析，免费10G存储空间'
                ],
                btnName:'立即建站',
                btnHref:'/'
            },{
                image:'/images/index/shangcheng.png',
                title:'族蚂商城',
                slogan:'一站式在线交易平台,无限商机尽在族蚂网！',
                func:[
                    '全行业涵盖式电子商务交易平台',
                    '免费在线发布新品、二手、定制商品',
                    '无需支付交易佣金，享26万种交易流程组合',
                    '支付分阶段及分时段付款，支付议价交易',
                    '商城链接到公众号锁定更多用户'
                ],
                btnName:'上传产品',
                btnHref:'/'
            },{
                image:'/images/index/fuwu.png',
                title:'族蚂服务',
                slogan:'全行业整合，免费发布服务！',
                func:[
                    '在线O2O交易',
                    '支持各种服务在线发布',
                    '52万种交易流程组合',
                    '提供预约时间工具',
                    '提供分时段付款流程'
                ],
                btnName:'发布服务',
                btnHref:'/'
            },{
                image:'/images/index/boke.png',
                title:'族蚂文章',
                slogan:'快速发布文章，展现自我风采',
                func:[
                    '24小时最新文章轮播',
                    '发布企业及行业动态',
                    '发布社会、娱乐、文化、体育等资讯',
                    '记录你自己的网络日志、展现个人文章',
                    '文章分享，展现自我'
                ],
                btnName:'发布文章',
                btnHref:'/'
            },{
                image:'/images/index/shipin.png',
                title:'族蚂资讯',
                slogan:'中小企业免费信息资讯发布平台！',
                func:[
                    '在线软文推广',
                    '免费信息发布平台',
                    '手机端资讯发布工具',
                    '海量热门资讯模板一键套用',
                    '公众号、小程序引流入口助力企业自媒体推广'
                ],
                btnName:'发布资讯',
                btnHref:'/'
            }]
        }
    },
    methods:{
        chooseSiteOrEntrep(i){
            this.$store.commit('requestLoginInfo', {
                noLoginCallBack: () => {
                    window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
                },
                loginCallBack: () => {
                    switch(i){
                        case 0:                   
                            this.$store.commit("changePopupConfig",{
                                isShow:true,
                                module:1,//进入编辑器或者进入模板选择页
                                type:'website'
                            });
                            break;
                        case 1:
                            this.$store.commit("changePopupConfig",{
                                isShow:true,
                                module:2,//上传产品
                                type:'entrep'
                            });
                            break;
                        case 2:
                            this.$store.commit("changePopupConfig",{
                                isShow:true,
                                module:3,//上传服务
                                type:'entrep'
                            });
                            break;
                        case 3:
                            this.$store.commit("changePopupConfig",{
                                isShow:true,
                                module:9,//发布文章
                                type:'entrep'
                            });
                            break;
                        case 4:
                            this.$store.commit("changePopupConfig",{
                                isShow:true,
                                module:8,//发布资讯
                                type:'entrep'
                            });
                            break;
                    }
                }
            })
        },
        
    },
    mounted(){
        new this.WOWJS.WOW().init()
    }
}
</script>
<style lang="less" scoped>
.info{
    padding-top:75px;
    .infoHead{
        position:relative;
        height:86px;
        .line{
            height:2px;
            width:100%;
            background:#adadad;
            position:absolute;
            top:32px;
            
        }
        .infoTitle{
            background:#fcfcfc;
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
                margin-top:15px;
                font-size:16px;
                color:#666666;
            }
        }
    }

    .infoContent{

        .infoBlock{
            height:565px;
        }
        .infoInner{
            height:565px;
            width:1200px;
            margin:0 auto;
            display:flex;
            align-items:center;

            .textDiv{
                width:490px;
            }

            .imgDiv{
                flex:1;
                text-align:center;
            }

            .paddingLeft33{
                padding-left:33px;
            }
            
            .paddingLeft110{
                padding-left:110px;
            }
            .flushRight{
                text-align:right;
            }

            .title{
                font-size:30px;
                letter-spacing:4px;
                color:#333333;
                font-weight:700;
                img{
                    width:12px;
                    height:12px;
                    margin-right:8px;
                    margin-left:8px;
                }
            }
            .slogan{
                margin-top:15px;
                font-size:18px;
                color:#404040;
                font-weight:700;                
            }
            .function{
                margin-top:24px;
                p{
                    font-size:14px;
                    color:#404040;
                    height:30px;
                    line-height:30px;
                }
            }
            button{
                width:260px;
                height:46px;
                line-height:46px;
                border-radius:2px;
                color:#ffffff;
                background:#00afec;
                cursor:pointer;
                font-size:18px;
                margin-top:48px;
                outline:none;
                &:hover{
                    background:#009bec;
                }
            }
        }
    }
}

.grayBg{
    background:#fcfcfc
}
.whiteBg{
    background:#ffffff;
}
</style>