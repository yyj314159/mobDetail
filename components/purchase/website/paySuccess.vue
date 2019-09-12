<template>
    <div class="wrap">
        <div>
            <div>
                <img src="/images/purchase/paySuccess.png" alt="成功标志">
                <span>您已成功付款！</span>
            </div>
            <div>
                <div></div>
                <div>实付款：</div>
                <div>￥{{orderInfo.fPrice | formatPrice}}</div>
            </div>
        </div>
        <div>
            <div v-for="(item,index) in orderInfo.functionOrderBeanList" :key="index">
                <div>订单{{index+1}}：{{item.fOrderCode}}</div>
                <div>
                    <div>
                        <div>项目名称</div>
                        <div>单价</div>
                        <div>数量</div>
                        <div>金额</div>
                        <div>期限</div>
                    </div>
                    <div class="orderContent">
                        <div class="templateOrder" v-if="item.fFunctionType === 10">
                            <div>
                                <div>{{item.fFunctionName}}</div>
                                <div>￥{{item.fTemplateLastPrice | formatPrice}}</div>
                                <div>1</div>
                                <div>￥{{item.fTemplateLastPrice | formatPrice}}</div>
                                <div>永久</div>
                            </div>
                            <div v-if="item.fTemplateDiscountsPrice">
                                <div>分享抵扣</div>
                                <div>￥-{{item.fTemplateDiscountsPrice | formatPrice}}</div>
                                <div>1</div>
                                <div>￥-{{item.fTemplateDiscountsPrice | formatPrice}}</div>
                                <div>--</div>
                            </div>
                        </div>
                        <div class="topBarOrder" v-if="item.fFunctionType === 4">
                            <div>
                                <div>顶部商务功能栏</div>
                                <div>￥{{item.fOrderPrice | formatPrice}}</div>
                                <div>1</div>
                                <div>￥{{item.fOrderPrice | formatPrice}}</div>
                                <div>{{item.fOrderUpDueTime | formatTime}}至{{item.fOrderDueTime | formatTime}}</div>
                            </div>
                        </div>
                        <div class="rightBarOrder" v-if="item.fFunctionType === 3">
                            <div>
                                <div>右侧商务功能栏</div>
                                <div>￥{{item.fOrderPrice | formatPrice}}</div>
                                <div>1</div>
                                <div>￥{{item.fOrderPrice | formatPrice}}</div>
                                <div>{{item.fOrderUpDueTime | formatTime}}至{{item.fOrderDueTime | formatTime}}</div>
                            </div>
                        </div>
                        <div class="bottomAdvOrder" v-if="item.fFunctionType === 1">
                            <div>
                                <div>去除页尾广告服务</div>
                                <div>￥{{item.fOrderPrice | formatPrice}}</div>
                                <div>1</div>
                                <div>￥{{item.fOrderPrice | formatPrice}}</div>
                                <div>{{item.fOrderUpDueTime | formatTime}}至{{item.fOrderDueTime | formatTime}}</div>
                            </div>
                        </div>
                        <div class="ipOrder" v-if="item.fFunctionType === 2">
                            <div>
                                <div>{{ipObj[item.fIpType].fName}}</div>
                                <div>￥{{item.fDeductionLaterPrice?item.fDeductionLaterPrice:item.fOrderPrice | formatPrice}}</div>
                                <div>1</div>
                                <div>￥{{item.fDeductionLaterPrice?item.fDeductionLaterPrice:item.fOrderPrice | formatPrice}}</div>
                                <div>{{item.fOrderUpDueTime | formatTime}}至{{item.fOrderDueTime | formatTime}}</div>
                            </div>
                            <div v-if="item.fIpDiscountsPrice">
                                <div>历史版本抵扣</div>
                                <div>￥-{{item.fIpDiscountsPrice | formatPrice}}</div>
                                <div>1</div>
                                <div>￥-{{item.fIpDiscountsPrice | formatPrice}}</div>
                                <div>--</div>
                            </div>
                        </div>
                        <div class="componentOrder" v-if="item.fFunctionType === 5">
                            <div v-for="(item1,index) in item.componentDetailBeanList" :key="index">
                                <div>{{item1.fComponentName}}</div>
                                <div>￥{{item1.fOrderPrice | formatPrice}}</div>
                                <div>1</div>
                                <div>￥{{item1.fOrderPrice | formatPrice}}</div>
                                <div v-if="item1.fOrderTimeLimit !== 9">{{item1.fOrderPayTime | formatTime}}至{{item1.fOrderDueTime | formatTime}}</div>
                                <div v-else>永久</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <span>实付款：</span>
                    <span>￥{{item.fOrderPrice | formatPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "paySuccess",
        props: ['orderInfo'],
        data(){
            return{
                ipObj: {
                    1: {
                        fName: '网站独享境内静态IP',
                    },
                    3: {
                        fName: '少量网站共享境内静态IP',
                    },
                    6: {
                        fName: '群站共享境内静态IP',
                    }
                },
            }
        },
        filters: {
            formatTime(val) {
                if (val) {
                    let year = new Date(val).getFullYear();
                    let month = new Date(val).getMonth();
                    let day = new Date(val).getDate();
                    return `${year}年${month + 1}月${day}日`;
                }
            },
            formatPrice(val) {
                return val.toFixed(2);
            }
        }
    }
</script>

<style scoped lang="less">
    .wrap {
        & > div:nth-child(1) {
            width: 1200px;
            height: 150px;
            background: #ffffff;
            margin-bottom: 10px;
            padding-top: 40px;
            padding-left: 30px;
            & > div:nth-child(1) {
                display: flex;
                align-items: center;
                & > img {
                    width: 26px;
                    height: 26px;
                }
                & > span {
                    font-size: 22px;
                    color: #202020;
                    margin-left: 10px;
                }
            }
            & > div:nth-child(2) {
                display: flex;
                align-items: center;
                margin-top: 20px;
                & > div:nth-child(1) {
                    width: 4px;
                    height: 4px;
                    background: #606060;
                    margin-left: 30px;
                    margin-right: 10px;
                }
                & > div:nth-child(2) {
                    font-size: 14px;
                    color: #313131;
                }
                & > div:nth-child(3) {
                    font-size: 20px;
                    color: #FF4747;
                    font-weight: bold;
                }
            }
        }
        & > div:nth-child(2) {
            & > div {
                padding: 30px 30px 40px 30px;
                background: #ffffff;
                margin-bottom: 10px;
                & > div:nth-child(1) {
                    font-size: 20px;
                    color: #202020;
                }
                & > div:nth-child(2) {
                    margin-top: 30px;
                    border-bottom: 1px solid #E4E4E4;
                    border-top: 1px solid #E4E4E4;
                    padding: 30px 0;
                    & > div:nth-child(1) {
                        font-size: 20px;
                        color: #303030;
                        display: flex;
                        align-items: center;
                        & > div:nth-child(1) {
                            display: flex;
                            justify-content: flex-start;
                            width: 250px;
                        }
                        & > div:nth-child(2) {
                            display: flex;
                            width: 180px;
                            justify-content: center;
                        }
                        & > div:nth-child(3) {
                            display: flex;
                            width: 180px;
                            justify-content: center;
                        }
                        & > div:nth-child(4) {
                            display: flex;
                            width: 180px;
                            justify-content: center;
                        }
                        & > div:nth-child(5) {
                            display: flex;
                            flex: 1;
                            justify-content: center;
                        }
                    }
                    .orderContent {
                        & > div {
                            & > div {
                                display: flex;
                                align-items: center;
                                font-size: 16px;
                                color: #606060;
                                margin-top: 40px;
                                & > div:nth-child(1) {
                                    display: flex;
                                    justify-content: flex-start;
                                    width: 250px;
                                }
                                & > div:nth-child(2) {
                                    display: flex;
                                    width: 180px;
                                    justify-content: center;
                                }
                                & > div:nth-child(3) {
                                    display: flex;
                                    width: 180px;
                                    justify-content: center;
                                }
                                & > div:nth-child(4) {
                                    display: flex;
                                    width: 180px;
                                    justify-content: center;
                                }
                                & > div:nth-child(5) {
                                    display: flex;
                                    flex: 1;
                                    justify-content: center;
                                }
                            }
                        }
                    }
                }
                & > div:nth-child(3) {
                    margin-top: 40px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    & > span:nth-child(1) {
                        font-size: 14px;
                        color: #313131;
                    }
                    & > span:nth-child(2) {
                        font-size: 20px;
                        color: #FF4747;
                    }
                }
            }
        }
    }
</style>