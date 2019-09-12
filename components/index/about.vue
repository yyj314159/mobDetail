<template>
    <div>
        <div class="partner">
            <h1>互联网时代&nbsp;&nbsp;助你全国营销</h1>
            <div class="list">
                <img src="/images/index/baidu.png" alt="baidu">
                <img src="/images/index/360.png" alt="360">
                <img src="/images/index/sougou.png" alt="sougou">
                <img src="/images/index/toutiao.png" alt="toutiao">
                <img src="/images/index/douyin.png" alt="douyin">
                <img src="/images/index/unionpay.png" alt="unionpay">
                <img src="/images/index/alipay.png" alt="alipay">
                <img src="/images/index/wxpay.png" alt="wxpay">
            </div>
        </div>
        <div class="zm-ad">
            <div>
                <p>族蚂护航让商家经营有保障消费者购物放心</p>
                <a href="/shop_web/about_18.html" target="_blank"><button>查看更多</button></a>
            </div>            
        </div>
        <div class="about">
            <div class="infoHead">
                <div class="line"></div>
                <div class="infoTitle">
                    <h1>关于族蚂网</h1>
                    <h4>中国领先的互联网解决方案提供商</h4>
                </div>
            </div>
            
            <div class="content">
                <div class="container" ref="aboutNum">
                    <div class="list" v-for="(item,index) in list" :key='index'>
                        <animateNum1 :item='item' v-if="isShowNum2"/>
                        <div class="name">{{item.name}}</div>
                        <div class="enName">{{item.enName}}</div>
                    </div>
                </div>
                
                <p>上海族蚂信息科技有限公司（以下简称"族蚂网"）成立于2016年11月，注册资金2000万元。族蚂网是一家致力为中小微企业提供一站式互联网解决方案和服务的创新型企业，助力企业营销，促进企业发展。</p>
                <p>族蚂网专注于互联网的研究与开发，是集高端网站建设、H5网页制作、小程序发布、电子名片、微传单、公众号助手、电子商城、O2O在线交易、音频、视频、资讯、电子书为一体的全品类互联网平台。</p>
                <a href="/shop_web/about_1.html" target="_blank"><button>查看更多</button></a>
            </div>
        </div>
    </div>
</template>
<script>
import animateNum1 from '@/components/index/animateNum1'
export default {
    components:{
        animateNum1
    },
    props:['isShowNum2'],
    data(){
        return{
            list:[{
                num:10,
                norms:'+',
                name:'品牌战略合作伙伴',
                enName:'Brand strategic partner'
            },{
                num:100,
                norms:'+',
                name:'自主知识产权',
                enName:'Independent intellectual property rights'
            },{
                num:80,
                norms:'+',
                name:'技术开发人员',
                enName:'Technical developer'
            },{
                num:10,
                norms:'万',
                name:'产品用户',
                enName:'The product user'
            }],
            topValue:null,
        }
        
    },
    methods:{
        offset(elem){
            let obj = {
                left:elem.offsetLeft,
                top:elem.offsetTop,
                width:elem.offsetWidth,
                height:elem.offsetHeight,
            }
            while(elem != document.body){
                elem = elem.offsetParent;
                console.log(elem);
                obj.left += elem.offsetLeft;
                obj.top += elem.offsetTop;
            }
            return obj;
        }
    },
    created(){
    },

    mounted(){        
        this.topValue = this.offset(this.$refs.aboutNum).top;
    }
}
</script>
<style lang="less" scoped>
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
                letter-spacing:10px;
            }
            h4{
                margin-top:20px;
                font-size:16px;
                color:#666666;
                letter-spacing:5px;
            }
        }
    }


.partner{    
    width:1200px;
    margin:0 auto;
    padding-top:84px;
    padding-bottom:106px;
    h1{
        text-align:center;
        margin-bottom:30px;
        font-size:30px;
        color:#333333;
        font-weight:700;
        letter-spacing:9px;
    }
    .list{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        img{
            margin-top:40px;
        }
    }    
}

.zm-ad{
    height:504px;
    min-width:1200px;
    background: url('/images/index/banner.png') center center no-repeat;
    div{
        width:1200px;
        margin:0 auto;
        color:#ffffff;
        padding-left:56px;
        padding-top:130px;
        p{
            margin-bottom:74px;
            font-size:40px;
            width:635px;
            line-height:60px;
            letter-spacing:4px;
            text-shadow:4px 5px 6px #010c23;
        }
        button{
            width:230px;
            height:46px;
            line-height:44px;
            text-align:center;
            border:1px solid #ffffff;
            color:#ffffff;
            background:rgba(255,255,255,0);
            font-size:18px;
            outline:none;
            cursor:pointer;
            &:hover{
                background:rgba(255,255,255,.15);
            }
        }
    }
}

.about{
    padding-top:95px;
    .content{
        padding-top:85px;
        width:1200px;
        margin:0 auto;
        text-align:center;
        .container{            
            display:flex;
            flex-wrap:wrap;
            justify-content: space-between;
            .list{
                text-align:center;
                width:300px;
                
                .name{
                    font-size:16px;
                    color:#333333;                    
                }
                .enName{
                    margin-top:5px;
                    margin-bottom:70px;
                    font-size:14px;
                    color:#999999;
                }
            }
        }
        p{
            text-align:center;
            font-size:20px;
            color:#333333;
            line-height:42px;
            padding-left:96px;
            padding-right:96px;
        }

        button{
            width: 260px;
            height:46px;
            border-radius:2px;
            background:#00afec;
            color:#ffffff;
            line-height:46px;
            font-size:18px;
            cursor:pointer;
            margin:84px auto 100px;
            &:hover{
                background:#009bec;
            }
        }
        
        
    }
}
</style>