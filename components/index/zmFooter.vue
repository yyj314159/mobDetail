<template>
    <footer>
        <div class="zm-foot">
            <div class="zm-logo">
                <a href="/">
                <svg>
                    <use xlink:href="/images/index/icon/zumaIcon.svg#zm-logo"></use>
                </svg>
                </a>
                <div class="slogan">世界因你而不同</div>
            </div>
            <div class="zm-contact">
                <div class="left">
                    <div class="title marginBottom16">服务热线</div>
                    <p>400-820-2178</p>
                    
                    <br>
                    <div class="title marginBottom16">服务时间</div>
                    <p>每周一至周日</p>
                    <p>08:00-22:00</p>
                </div>
                <div class="right">
                    <div class="title">
                        关注二维码
                    </div>
                    <img src="/images/index/code.png" alt="族蚂二维码">
                </div>
            </div>
        </div>
        <div class="zm-link">
            <a :href="item.href" v-for="(item,index) in linkArr">{{item.name}} <span v-if="index < (linkArr.length - 1)"></span></a>
        </div>
        <div class="zm-copyright">
            <span>上海族蚂信息科技有限公司</span>
            <span>地址：上海市金山区亭林镇林盛路136号</span>
            <span>Copyright © 2017 zuma.com 版权所有</span>
            <a href="http://www.miit.gov.cn/" target="_blank">沪ICP备18007337号-2</a>
        </div>
        
    </footer>
</template>
<script>
export default {
    data(){
        return{
            linkArr:[
            {
              name:"帮助中心",
              href:'/bangzhu'
            },
            {
              name:"法律声明",
              href:'/shop_web/about_29.html'
            },
            {
              name:"隐私政策",
              href:'/shop_web/about_30.html'
            },
            {
              name:"购物付款类型",
              href:'/shop_web/about_2.html'
            },
            {
              name:"服务付款类型",
              href:'/shop_web/about_8.html'
            },
            {
              name:"支付方式",
              href:'/shop_web/about_14.html'
            },
            {
              name:"产品售后与申诉",
              href:'/shop_web/about_18.html'
            },
            {
              name:"服务投诉与申诉",
              href:'/shop_web/about_23.html'
            },
            {
              name:"族蚂议价流程",
              href:'/shop_web/about_28.html'
            },
            {
              name:"关于族蚂网",
              href:'/shop_web/about_1.html'
            },
            {
              name:"如何创建网站",
              href:'/shop_web/about_31.html'
            },
            {
              name:"网站举报",
              href:'/shop_web/about_32.html'
            },
            {
              name:"知识产权维权",
              href:'/shop_web/about_35.html'
            },
          ],
        }
    }
}
</script>
<style scoped lang="less" >
footer{
    background:#313131;
    // height:430px;
    padding-top:42px;
    padding-bottom:55px;
    color:#ffffff;
    a{
        color:#ffffff;
    }
    .zm-foot{
        width:1200px;
        margin:0 auto;
        display:flex;
        .zm-logo{
            width:573px;
            height:234px;
            border-right:1px solid #ffffff;
            svg{
                fill:#ffffff;
                width:152px;
                height:55px;
                margin:52px auto 37px 150px;
            }
            .slogan{
                font-size:30px;
                margin-left:118px;
                letter-spacing:7px;
            }
        }
        .zm-contact{
            display:flex;
            flex:1;
            padding-top:30px;
            .left{
                flex:1;
                padding-left:124px;
                p{
                    font-size:16px;
                    height:30px;
                    line-height:30px;
                    letter-spacing:4px;
                }
                .marginBottom16{
                    margin-bottom:16px;
                }
            }
            .right{
                width:230px;
                img{
                    width:112px;
                    height:112px;
                    margin-top:40px;
                }
                
            }
            .title{
                font-size:18px;
                font-weight:700;
            }
        }
    }

    .zm-link{
        display:flex;
        min-width:1200px;
        max-width:1470px;
        margin:0 auto;
        padding-top:40px;
        flex-wrap:wrap;
        justify-content:center;
        a{
            font-size:14px;
            padding-left:14px;
            padding-right:14px;
            margin-top:10px;
            text-align:center;
            position:relative;
            span{
                position:absolute;
                width:1px;
                height:16px;
                background:#ffffff;
                transform:rotate(-4deg);
                bottom:2px;
                right:0px;
            }

        }
    }

    .zm-copyright{
        font-size:14px;
        width:1200px;
        margin:20px auto;
        text-align:center;
        span{
            margin-right:12px;
        }        
    }
}

    
</style>