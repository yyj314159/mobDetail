<template>
    <div class="wrap">
        <div>
            <img src="/images/purchase/xuanzhong.png" alt="禁止取消选中" v-if="isShowChoose">
            <div>去除页尾广告服务</div>
        </div>
        <div>
            <p>页尾广告有利于用户了解交易流程和网站规则，有利于让更多用户了解和使用族蚂网的免费建站功能，如果您执意</p>
            <p>要使用去除页尾广告功能，您需要支付一定的费用！</p>
            <p>购买后，请进入网站编辑器，右键点击页尾处，打开隐藏页脚广告选项，即可去除页尾广告。</p>
        </div>
        <div v-if="bottomAdvInfo.fOrderDueTime && bottomAdvInfo.fIsPurchase !== 2" class="deadline">
            当前服务已付费至{{bottomAdvInfo.fOrderDueTime | formatTime}}
        </div>
        <div class="timeChoose">
            <div>购买期限</div>
            <div>
                <div :class="{'active':chooseTimeType === item.fType}" v-for="(item,index) in bottomAdvInfo.priceBeanList"
                     :key="index" @click="chooseTime(item.fType)">
                    <div>{{timeObj[item.fType].fName}}<span v-if="item.fDiscountsType === 1">[送{{timeObj[item.fType].fName}}]</span>
                    </div>
                    <div v-show="item.fControlHotSale === 1">热卖</div>
                    <div v-show="chooseTimeType === item.fType">
                        <img src="/images/purchase/xuanzhongjiaobiao.png" alt="选中的标志">
                    </div>
                </div>
            </div>
        </div>
        <div class="originalPrice" v-if="originalPrice">
            <span>原价：</span>
            <span>￥{{originalPrice | formatPrice}}</span>
        </div>
        <div class="discounts" v-if="timeObj[chooseTimeType].fIsDiscounts">
            <span>优惠：</span>
            <span v-if="timeObj[chooseTimeType].fDiscountsType === 1">买{{timeObj[chooseTimeType].fName}}送{{timeObj[chooseTimeType].fName}}</span>
            <span v-if="timeObj[chooseTimeType].fDiscountsType === 2">{{timeObj[chooseTimeType].fDiscountsPercent * 100 | formatDiscounts}}折</span>
        </div>
        <div class="price">
            <span>价格：</span>
            <div>
                <span>￥</span>
                <span>{{price | formatPrice}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "topBar",
        props: ['pageData'],
        data() {
            return {
                isShowChoose: false,
                bottomAdvInfo: null,
                timeObj: {
                    1: {
                        fName: '一周',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    2: {
                        fName: '一个月',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    3: {
                        fName: '三个月',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    4: {
                        fName: '六个月',
                        fPrice: null,
                        fDiscountType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    5: {
                        fName: '一年',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    6: {
                        fName: '两年',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    7: {
                        fName: '五年',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    8: {
                        fName: '十年',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                },
                chooseTimeType: null
            }
        },
        created() {
            this.bottomAdvInfo = this.pageData.controlInfo;
            if (this.pageData.type === 1) {
                this.isShowChoose = false;
            } else {
                this.isShowChoose = true;
            }
            for (let i = 0; i < this.bottomAdvInfo.priceBeanList.length; i++) {
                this.timeObj[this.bottomAdvInfo.priceBeanList[i].fType].fPrice = this.bottomAdvInfo.priceBeanList[i].fPrice;
                this.timeObj[this.bottomAdvInfo.priceBeanList[i].fType].fDiscountsType = this.bottomAdvInfo.priceBeanList[i].fDiscountsType;
                this.timeObj[this.bottomAdvInfo.priceBeanList[i].fType].fIsDiscounts = this.bottomAdvInfo.priceBeanList[i].fIsDiscounts;
                this.timeObj[this.bottomAdvInfo.priceBeanList[i].fType].fDiscountsPercent = this.bottomAdvInfo.priceBeanList[i].fDiscountsPercent;
                if (this.bottomAdvInfo.priceBeanList[i].fControlHotSale === 1) {
                    this.chooseTimeType = this.bottomAdvInfo.priceBeanList[i].fType;
                }
            }
        },
        computed: {
            originalPrice() {
                if (this.timeObj[this.chooseTimeType].fIsDiscounts) {
                    if (this.timeObj[this.chooseTimeType].fDiscountsType === 1) {
                        return this.timeObj[this.chooseTimeType].fPrice * 2;
                    }
                    if (this.timeObj[this.chooseTimeType].fDiscountsType === 2) {
                        return this.timeObj[this.chooseTimeType].fPrice
                    }
                } else {
                    return null;
                }
            },
            price() {
                if(this.timeObj[this.chooseTimeType].fDiscountsType === 2){
                    return this.timeObj[this.chooseTimeType].fPrice * this.timeObj[this.chooseTimeType].fDiscountsPercent
                }else{
                    return this.timeObj[this.chooseTimeType].fPrice
                }
            }
        },
        methods:{
            chooseTime(type){
                this.chooseTimeType = type;
                let obj = {};
                obj.fOrderTimeLimit = type;
                obj.fOrderPrice = this.price;
                obj.fDiscountsType = this.timeObj[this.chooseTimeType].fDiscountsType;
                obj.fDiscountsPercent = this.timeObj[this.chooseTimeType].fDiscountsPercent;
                this.$emit("message",obj);
            }
        },
        filters: {
            formatDiscounts(val) {
                let num = parseInt(val);
                if (num % 10 === 0) {
                    return num.toString().substr(0, 1);
                } else {
                    return num;
                }
            },
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
        width: 770px;
        min-height: 400px;
        background: #ffffff;
        padding-left: 30px;
        padding-top: 30px;
        margin-bottom: 10px;
        padding-bottom: 30px;
        & > div:nth-child(1) {
            font-size: 18px;
            color: #202020;
            display: flex;
            align-items: center;
            & > img {
                width: 16px;
                height: 16px;
                margin-right: 10px;
            }
        }
        & > div:nth-child(2) {
            font-size: 14px;
            color: #909090;
            line-height: 24px;
            margin-top: 15px;
            &>p:nth-child(3){
                margin-top: 5px;
            }
        }
        .deadline{
            margin-top: 15px;
            font-size: 14px;
            color:#3E9BE9;
        }
        .timeChoose {
            margin-top: 20px;
            & > div:nth-child(1) {
                font-size: 16px;
                color: #303030;
            }
            & > div:nth-child(2) {
                width: 680px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin-top: 15px;
                & > div {
                    width: 160px;
                    height: 46px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    color: #909090;
                    border: 1px solid #CCCCCC;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    cursor: pointer;
                    &.active {
                        & > div:nth-child(1) {
                            font-weight: bold;
                            color: #3D9BE9;
                        }
                    }
                    & > div:nth-child(2) {
                        width: 40px;
                        height: 20px;
                        background: #3D9BE9;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        color: #ffffff;
                        position: absolute;
                        top: -7px;
                        right: -6px;
                        z-index: 10;
                        border-radius: 2px;
                    }
                    & > div:nth-child(3) {
                        width: 160px;
                        height: 46px;
                        border: 2px solid #3D9BE9;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 5;
                        & > img {
                            position: absolute;
                            width: 25px;
                            height: 25px;
                            bottom: 0;
                            right: 0;
                        }
                    }
                }
            }
        }
        .originalPrice {
            display: flex;
            align-items: center;
            margin-top: 10px;
            & > span:nth-child(1) {
                font-size: 14px;
                color: #505050;
            }
            & > span:nth-child(2) {
                font-size: 14px;
                color: #909090;
                text-decoration: line-through;
                margin-left: 5px;
            }
        }
        .discounts {
            display: flex;
            align-items: center;
            margin-top: 20px;
            & > span:nth-child(1) {
                font-size: 14px;
                color: #505050;
            }
            & > span:nth-child(2) {
                height: 20px;
                background: #FF4747;
                font-size: 12px;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 5px;
                padding: 0 7px;
            }
        }
        .price {
            display: flex;
            align-items: center;
            margin-top: 20px;
            & > span:nth-child(1) {
                font-size: 14px;
                color: #505050;
            }
            & > div:nth-child(2) {
                display: flex;
                align-items: center;
                margin-left: 5px;
                & > span:nth-child(1) {
                    font-size: 14px;
                    color: #FF4747;
                }
                & > span:nth-child(2) {
                    font-size: 20px;
                    color: #FF4747;
                }
            }
        }
    }
</style>