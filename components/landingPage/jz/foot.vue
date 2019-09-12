<template>
    <div class="zm-foot">
        <div>
            <div>
                <div>
                    <a v-for="(item,index) in linkArr" :href="item.href" target="_blank"><span>{{item.name}}</span><div v-if="index !== linkArr.length-1"></div></a>
                </div>
                <div><span>上海族蚂信息科技有限公司</span><span>Copyright © 2017 zuma.com 版权所有 <a href="http://www.miit.gov.cn/" target="_blank">沪ICP备18007337号-2</a></span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
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

<style scoped lang="less">
    .zm-foot{
        width: 100%;
        position: relative;
        &>div:nth-child(1){
            width: 100%;
            &>div{
                margin: 0 auto;
                text-align: center;
                max-width: 1166px;
                min-width: 768px;
                padding: 20px 0;
                &>div:nth-child(1){
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    &>a{
                        display: inline-block;
                        padding: 0 13px;
                        font-size: 12px;
                        color: #ffffff;
                        margin-bottom: 10px;
                        position: relative;
                        &>span{
                            cursor: pointer;
                        }
                        &>div{
                            width: 1px;
                            height: 12px;
                            background: #ffffff;
                            position: absolute;
                            right:0;
                            top:50%;
                            margin-top: -6px;
                        }
                    }
                    &>div:nth-last-child(1){
                        border: 0;
                    }
                }
                &>div:nth-child(2){
                    font-size: 12px;
                    color: #ffffff;
                    &>span:nth-last-child(1){
                        margin-left: 15px;
                        a{
                            color:#ffffff;
                        }
                    }
                }
            }
        }
    }
</style>
