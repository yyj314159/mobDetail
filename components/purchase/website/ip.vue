<template>
    <div class="wrap">
        <div>购买国内静态IP及ICP代备案服务</div>
        <div>
            <p>提示：根据相关部门规定，使用大陆境内服务器开办网站，需要对网站进行工信部备案并获取通信管理局下发的ICP备案号。</p>
            <p>由于静态IP资源有限，我们因此向您收取国内静态IP费用，敬请谅解。如您的站点不需要ICP备案，可不必购买。</p>
            <p>
                注意：ICP代备案服务指协助购买了国内静态IP的用户提交备案资料，审核权在各地的通管局，族蚂不承诺一定可以备案成功，对于备案不成功的情况，族蚂可反馈驳回原因并提供重新提交的机会，但不承担任何责任，也不退还国内静态IP的相关费用。</p>
        </div>
        <div class="deadline" v-if="ipInfo.fCurrentDueDate">
            <span>当前类型：{{ipObj[ipInfo.fCurrentIPType].fName}}</span>
            <span>有效期至：{{ipInfo.fCurrentDueDate | formatTime}}</span>
        </div>
        <div class="chooseIpType">
            <div>购买类型</div>
            <div>
                <div :class="{'active':item.fValue === ipType}" v-for="(item,index) in ipInfo.dictionaryBeanList"
                     :key="index" @click="chooseIp(item.fValue)">
                    <div>{{ipObj[item.fValue].fName}}</div>
                    <div v-if="item.fValue === ipType">
                        <img src="/images/purchase/xuanzhongjiaobiao.png" alt="选中的标志">
                    </div>
                </div>
            </div>
            <div>{{ipObj[ipType].fDescription}}</div>
        </div>
        <div class="chooseTime">
            <div>购买期限</div>
            <div>
                <div :class="{'active':chooseTimeType === item.fPriceType}"
                     v-for="(item,index) in priceBeanList"
                     :key="index" @click="chooseTime(item.fPriceType)">
                    <div>{{timeObj[item.fPriceType].fName}}<span v-if="item.fDiscountsType === 1">[送{{timeObj[item.fPriceType].fName}}]</span>
                    </div>
                    <div v-show="item.fIpHotSale === 1">热卖</div>
                    <div v-show="chooseTimeType === item.fPriceType">
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
        <div class="deduction" v-if="fIpDiscountsPrice">
            <span>抵扣：</span>
            <div>￥{{fIpDiscountsPrice | formatPrice}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ip",
        props: ['pageData'],
        data() {
            return {
                ipObj: {
                    1: {
                        fName: '网站独享境内静态IP',
                        fDescription: '备注：网站独享类型IP，该静态IP将仅供本网站使用。'
                    },
                    3: {
                        fName: '少量网站共享境内静态IP',
                        fDescription: '备注：少量网站共享类型IP，该静态IP最大支持50个域名使用。'
                    },
                    6: {
                        fName: '群站共享境内静态IP',
                        fDescription: '备注：群站共享类型IP，该静态IP将与大量网站同时共享一个IP。'
                    }
                },
                ipInfo: null,
                timeObj: {
                    1: {
                        fName: '一年',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    2: {
                        fName: '两年',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    5: {
                        fName: '五年',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    },
                    10: {
                        fName: '十年',
                        fPrice: null,
                        fDiscountsType: null,
                        fIsDiscounts: null,
                        fDiscountsPercent: null,
                    }
                },
                ipType: null,
                chooseTimeType: null,
                priceBeanList: null,
                fOrderBuy:null,
                fIpDiscountsPrice:null,//换购时抵扣金额
                fDeductionLaterPrice:null,//换购时抵扣前订单金额
            }
        },
        created() {
            this.ipInfo = this.pageData.ipInfo;
            if (this.ipInfo.fCurrentIPType && this.ipInfo.fCurrentIPType !== 9) {
                this.updateInfo(this.ipInfo.fCurrentIPType);
                this.fOrderBuy = 2
            } else {
                this.updateInfo(this.ipInfo.dictionaryBeanList[0].fValue);
                this.fOrderBuy = 1
            }
        },
        methods: {
            updateInfo(type) {
                switch (type) {
                    case 1:
                        this.ipType = 1;
                        this.priceBeanList = this.ipInfo.singleDetailBeanList;
                        break;
                    case 3:
                        this.ipType = 3;
                        this.priceBeanList = this.ipInfo.lessDetailBeanList;
                        break;
                    case 6:
                        this.ipType = 6;
                        this.priceBeanList = this.ipInfo.moreDetailBeanList;
                        break;
                }
                for (let i = 0; i < this.priceBeanList.length; i++) {
                    this.timeObj[this.priceBeanList[i].fPriceType].fPrice = this.priceBeanList[i].fPrice;
                    this.timeObj[this.priceBeanList[i].fPriceType].fDiscountsType = this.priceBeanList[i].fDiscountsType;
                    this.timeObj[this.priceBeanList[i].fPriceType].fIsDiscounts = this.priceBeanList[i].fIsDiscounts;
                    this.timeObj[this.priceBeanList[i].fPriceType].fDiscountsPercent = this.priceBeanList[i].fDiscountsPercent;
                    if (this.priceBeanList[i].fIpHotSale === 1) {
                        this.chooseTimeType = this.priceBeanList[i].fPriceType;
                    }
                }
            },
            chooseIp(type) {
                this.ipType = type;
                this.updateInfo(type);
                let obj = {};
                obj.fIpType = type;
                obj.fFunctionName = this.ipObj[type].fName;
                obj.fOrderTimeLimit = this.chooseTimeType;
                obj.fDiscountsType = this.timeObj[this.chooseTimeType].fDiscountsType;
                obj.fDiscountsPercent = this.timeObj[this.chooseTimeType].fDiscountsPercent;
                if(this.ipInfo.fCurrentIPType && this.ipInfo.fCurrentIPType !== 9){
                    if(this.ipInfo.fCurrentIPType>type){
                        this.fOrderBuy = 1;
                        obj.fOrderBuy = this.fOrderBuy;
                        this.fDeductionLaterPrice = this.price;
                        obj.fDeductionLaterPrice = this.fDeductionLaterPrice;
                        this.fIpDiscountsPrice = this.calculateDeduction();
                        obj.fIpDiscountsPrice = this.fIpDiscountsPrice;
                        obj.fOrderPrice = this.fDeductionLaterPrice - this.fIpDiscountsPrice;
                    }else{
                        this.fOrderBuy = 2;
                        obj.fOrderBuy = this.fOrderBuy;
                        this.fDeductionLaterPrice = null;
                        obj.fDeductionLaterPrice = this.fDeductionLaterPrice;
                        this.fIpDiscountsPrice = null;
                        obj.fIpDiscountsPrice = this.fIpDiscountsPrice;
                        obj.fOrderPrice = this.price;
                    }
                }else{
                    this.fOrderBuy = 1;
                    obj.fOrderBuy = this.fOrderBuy;
                    this.fDeductionLaterPrice = null;
                    obj.fDeductionLaterPrice = this.fDeductionLaterPrice;
                    this.fIpDiscountsPrice = null;
                    obj.fIpDiscountsPrice = this.fIpDiscountsPrice;
                    obj.fOrderPrice = this.price;
                }
                this.$emit("message",obj);
            },
            chooseTime(type){
                this.chooseTimeType = type;
                let obj = {};
                obj.fIpType = this.ipType;
                obj.fFunctionName = this.ipObj[this.ipType].fName;
                obj.fOrderTimeLimit = this.chooseTimeType;
                obj.fDiscountsType = this.timeObj[this.chooseTimeType].fDiscountsType;
                obj.fDiscountsPercent = this.timeObj[this.chooseTimeType].fDiscountsPercent;
                if(this.ipInfo.fCurrentIPType && this.ipInfo.fCurrentIPType !== 9){
                    if(this.ipInfo.fCurrentIPType>this.ipType){
                        this.fOrderBuy = 1;
                        obj.fOrderBuy = this.fOrderBuy;
                        this.fDeductionLaterPrice = this.price;
                        obj.fDeductionLaterPrice = this.fDeductionLaterPrice;
                        this.fIpDiscountsPrice = this.calculateDeduction();
                        obj.fIpDiscountsPrice = this.fIpDiscountsPrice;
                        obj.fOrderPrice = this.fDeductionLaterPrice - this.fIpDiscountsPrice;
                    }else{
                        this.fOrderBuy = 2;
                        obj.fOrderBuy = this.fOrderBuy;
                        this.fDeductionLaterPrice = null;
                        obj.fDeductionLaterPrice = this.fDeductionLaterPrice;
                        this.fIpDiscountsPrice = null;
                        obj.fIpDiscountsPrice = this.fIpDiscountsPrice;
                        obj.fOrderPrice = this.price;
                    }
                }else{
                    this.fOrderBuy = 1;
                    obj.fOrderBuy = this.fOrderBuy;
                    this.fDeductionLaterPrice = null;
                    obj.fDeductionLaterPrice = this.fDeductionLaterPrice;
                    this.fIpDiscountsPrice = null;
                    obj.fIpDiscountsPrice = this.fIpDiscountsPrice;
                    obj.fOrderPrice = this.price;
                }
                this.$emit("message",obj);
            },
            calculateDeduction(){
                const oneDay = 24*60*60*1000;
                let alreadyUseDay = Math.ceil((new Date().getTime() - this.ipInfo.fLastOrderStartTime)/oneDay);//已经使用的天数
                console.log("已经使用的天数:",alreadyUseDay)
                let surPlusDay = 365*this.ipInfo.fLastOrderTimeLimit-alreadyUseDay;//剩余的天数
                console.log("剩余的天数",surPlusDay);
                let dayPrice = this.ipInfo.fLastOrderPrice/(365*this.ipInfo.fLastOrderTimeLimit);//一天的价格
                console.log("一天的价格",dayPrice);
                let surPlusMoney = dayPrice * surPlusDay;
                console.log("剩余的钱数",surPlusMoney);
                if(surPlusMoney%1 !== 0){
                    surPlusMoney = parseInt(surPlusMoney.toString().split(".")[0]);
                }
                console.log("剩余的钱数",surPlusMoney);
                console.log("上一次价格的85%",this.ipInfo.fLastOrderPrice*0.85);
                if(surPlusMoney > this.ipInfo.fLastOrderPrice*0.85){
                    surPlusMoney = this.ipInfo.fLastOrderPrice*0.85;
                }
                console.log("剩余的钱数",surPlusMoney);
                if(surPlusMoney > this.price){
                    surPlusMoney = this.price;
                }
                console.log("剩余的钱数",surPlusMoney);
                return surPlusMoney;
            }
        },
        computed:{
          originalPrice(){
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
          price(){
              if(this.timeObj[this.chooseTimeType].fDiscountsType === 2){
                  return this.timeObj[this.chooseTimeType].fPrice * this.timeObj[this.chooseTimeType].fDiscountsPercent
              }else{
                  return this.timeObj[this.chooseTimeType].fPrice
              }
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
        min-height: 720px;
        background: #ffffff;
        padding-left: 30px;
        padding-top: 30px;
        margin-bottom: 10px;
        padding-bottom: 30px;
        & > div:nth-child(1) {
            font-size: 18px;
            color: #202020;
        }
        & > div:nth-child(2) {
            width: 700px;
            font-size: 14px;
            color: #909090;
            line-height: 24px;
            margin-top: 10px;
            & > p:nth-child(3) {
                color: #FF4747;
            }
        }
        .deadline {
            font-size: 14px;
            color: #3E9BE9;
            margin-top: 10px;
            & > span:nth-child(1) {
                margin-right: 10px;
            }
        }
        .chooseIpType {
            margin-top: 25px;
            & > div:nth-child(1) {
                font-size: 16px;
                color: #303030;
            }
            & > div:nth-child(2) {
                width: 630px;
                display: flex;
                align-items: center;
                margin-top: 15px;
                & > div {
                    margin-right: 10px;
                    width: 200px;
                    height: 46px;
                    border: 1px solid #CCCCCC;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    font-size: 16px;
                    color: #909090;
                    cursor: pointer;
                    & > div:nth-child(2) {
                        width: 200px;
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
                    &.active {
                        & > div:nth-child(1) {
                            color: #3D9BE9;
                            font-weight: bold;
                        }
                    }
                }
            }
            & > div:nth-child(3) {
                margin-top: 10px;
                font-size: 14px;
                color: #909090;
            }
        }
        .chooseTime {
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
        .deduction{
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
                font-size: 14px;
                color:#909090;
            }
        }
    }
</style>