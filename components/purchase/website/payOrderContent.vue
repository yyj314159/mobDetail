<template>
    <div class="wrap">
        <div>订单内容</div>
        <div>
            <div>项目名称</div>
            <div>单价</div>
            <div>数量</div>
            <div>金额</div>
        </div>
        <div class="orderContent">
            <div v-if="indexObj.templateIndex !== null" class="templateOrder">
                <div>
                    <div>{{payData.functionOrderBeanList[indexObj.templateIndex].fFunctionName}}</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.templateIndex].fTemplateLastPrice}}</div>
                    <div>1</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.templateIndex].fTemplateLastPrice}}</div>
                </div>
                <div v-if="payData.functionOrderBeanList[indexObj.templateIndex].fTemplateDiscountsPrice !== '0.00'">
                    <div>分享抵扣</div>
                    <div>￥-{{payData.functionOrderBeanList[indexObj.templateIndex].fTemplateDiscountsPrice}}</div>
                    <div>1</div>
                    <div>￥-{{payData.functionOrderBeanList[indexObj.templateIndex].fTemplateDiscountsPrice}}</div>
                </div>
            </div>
            <div v-if="indexObj.topBarIndex !== null" class="topBarOrder">
                <div>
                    <div>顶部商务功能栏</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.topBarIndex].fOrderPrice}}</div>
                    <div>1</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.topBarIndex].fOrderPrice}}</div>
                </div>
            </div>
            <div v-if="indexObj.rightBarIndex !== null" class="rightBarOrder">
                <div>
                    <div>右侧商务功能栏</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.rightBarIndex].fOrderPrice}}</div>
                    <div>1</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.rightBarIndex].fOrderPrice}}</div>
                </div>
            </div>
            <div v-if="indexObj.bottomAdvIndex !== null" class="bottomAdvOrder">
                <div>
                    <div>去除页尾广告服务</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.bottomAdvIndex].fOrderPrice}}</div>
                    <div>1</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.bottomAdvIndex].fOrderPrice}}</div>
                </div>
            </div>
            <div v-if="indexObj.ipIndex !== null" class="ipOrder">
                <div>
                   <div>{{ipObj[payData.functionOrderBeanList[indexObj.ipIndex].fIpType].fName}}</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.ipIndex].fDeductionLaterPrice?payData.functionOrderBeanList[indexObj.ipIndex].fDeductionLaterPrice:payData.functionOrderBeanList[indexObj.ipIndex].fOrderPrice}}</div>
                    <div>1</div>
                    <div>￥{{payData.functionOrderBeanList[indexObj.ipIndex].fDeductionLaterPrice?payData.functionOrderBeanList[indexObj.ipIndex].fDeductionLaterPrice:payData.functionOrderBeanList[indexObj.ipIndex].fOrderPrice}}</div>
                </div>
                <div v-if="payData.functionOrderBeanList[indexObj.ipIndex].fIpDiscountsPrice">
                    <div>历史版本抵扣</div>
                    <div>￥-{{payData.functionOrderBeanList[indexObj.ipIndex].fIpDiscountsPrice}}</div>
                    <div>1</div>
                    <div>￥-{{payData.functionOrderBeanList[indexObj.ipIndex].fIpDiscountsPrice}}</div>
                </div>
            </div>
            <div v-if="indexObj.componentIndex !== null" class="componentOrder">
                <div v-for="(item,index) in payData.functionOrderBeanList[indexObj.componentIndex].componentDetailBeanList" :key="index">
                    <div>{{item.fComponentName}}</div>
                    <div>￥{{item.fOrderPrice}}</div>
                    <div>1</div>
                    <div>￥{{item.fOrderPrice}}</div>
                </div>
            </div>
        </div>
        <div class="timeLimit" v-if="isShowTimeLimit">提示：购买期限为：{{startTime | formatTime}}至{{endTime}}</div>
        <div class="sum">
            <div>
                <span>合计：</span>
                <span>￥{{sum | formatPrice}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['payData','indexObj'],
        data(){
            return{
                isShowTimeLimit:false,
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
        created(){
            if(parseInt(this.$route.query.type) !== 10 && parseInt(this.$route.query.type) !== 88){
                this.isShowTimeLimit = true;
            }
        },
        computed:{
            startTime(){
                let time = null;
                if(this.isShowTimeLimit){//显示时间期限的情况
                    switch(parseInt(this.$route.query.type)){
                        case 1:
                        case 3:
                        case 4:
                           if(this.payData.functionOrderBeanList[0].fOrderBuy === 2){//续费的情况
                               time = this.payData.functionOrderBeanList[0].fOrderDueTime;
                           }else{
                              time =  new Date().getTime();
                           }
                           break;
                        case 2:
                            if(this.payData.functionOrderBeanList[0].fOrderBuy === 2){
                                time = this.payData.functionOrderBeanList[0].fOrderDueTime;
                            }else{
                                time =  new Date().getTime();
                            }
                    }
                }
                return time;
            },
            endTime(){
                let time = null;
                let year = null;
                let month = null;
                let day = null;
                if(this.isShowTimeLimit){
                    time = this.startTime;
                    year = new Date(time).getFullYear();
                    month = new Date(time).getMonth()+1;
                    day = new Date(time).getDate();
                    if(parseInt(this.$route.query.type) === 2){
                        switch(this.payData.functionOrderBeanList[0].fOrderTimeLimit){
                            case 1:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    year += 2;
                                }else{
                                    year += 1;
                                }
                                break;
                            case 2:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    year += 4;
                                }else{
                                    year += 2;
                                }
                                break;
                            case 5:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    year += 10;
                                }else{
                                    year += 5;
                                }
                                break;
                            case 10:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    year += 20;
                                }else{
                                    year += 10;
                                }
                                break;

                        }
                    }else{
                        switch(this.payData.functionOrderBeanList[0].fOrderTimeLimit){
                            case 1:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    time += 14*24*3600*1000;
                                    year = new Date(time).getFullYear();
                                    month = new Date(time).getMonth()+1;
                                    day = new Date(time).getDate();
                                }else{
                                    time += 7*24*3600*1000;
                                    year = new Date(time).getFullYear();
                                    month = new Date(time).getMonth()+1;
                                    day = new Date(time).getDate();
                                }
                                break;
                            case 2:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    month += 2;
                                    if(month > 12){
                                        year += 1;
                                        month -= 12;
                                    }
                                }else{
                                    month += 1;
                                    if(month > 12){
                                        year += 1;
                                        month -= 12;
                                    }
                                }
                                break;
                            case 3:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    month += 6;
                                    if(month > 12){
                                        year += 1;
                                        month -= 12;
                                    }
                                }else{
                                    month += 3;
                                    if(month > 12){
                                        year += 1;
                                        month -= 12;
                                    }
                                }
                                break;
                            case 4:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    month += 12;
                                    if(month > 12){
                                        year += 1;
                                        month -= 12;
                                    }
                                }else{
                                    month += 6;
                                    if(month > 12){
                                        year += 1;
                                        month -= 12;
                                    }
                                }
                                break;
                            case 5:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    year += 2;
                                }else{
                                    year += 1;
                                }
                                break;
                            case 6:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    year += 4;
                                }else{
                                    year += 2;
                                }
                                break;
                            case 7:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    year += 10;
                                }else{
                                    year += 5;
                                }
                                break;
                            case 8:
                                if(this.payData.functionOrderBeanList[0].fDiscountsType === 1){
                                    year += 20;
                                }else{
                                    year += 10;
                                }
                                break;
                        }
                    }

                }
                return `${year}年${month}月${day}日`;
            },
            sum(){
                let sum = 0;
                for(let i = 0; i < this.payData.functionOrderBeanList.length; i++){
                    sum += parseFloat(this.payData.functionOrderBeanList[i].fOrderPrice);
                }
                return sum;
            }
        },
        filters:{
            formatPrice(val){
                return val.toFixed(2);
            },
            formatTime(val) {
                if (val) {
                    let year = new Date(val).getFullYear();
                    let month = new Date(val).getMonth();
                    let day = new Date(val).getDate();
                    return `${year}年${month + 1}月${day}日`;
                }
            },
        }

    }
</script>

<style scoped lang="less">
    .wrap{
        min-height: 880px;
        width: 420px;
        background: #ffffff;
        padding:30px 30px 50px 30px;
        &>div:nth-child(1){
            font-size: 22px;
            color:#202020;
        }
        &>div:nth-child(2){
            display: flex;
            margin-top: 20px;
            font-size: 18px;
            color:#505050;
            &>div{
                display: flex;
                flex: 1;
                justify-content: center;
            }
            &>div:nth-child(1){
                display: flex;
                flex:2;
                justify-content: flex-start;
            }
        }
        .orderContent{
            margin-top: 15px;
            border-bottom: 1px solid #CCCCCC;
            border-top:1px solid #CCCCCC;
            padding: 25px 0;
            &>div{
                &>div{
                    display: flex;
                    font-size: 14px;
                    color:#909090;
                    margin-top: 20px;
                    &>div{
                        display: flex;
                        flex:1;
                        justify-content: center;
                    }
                    &>div:nth-child(1){
                        display: flex;
                        flex:2;
                        justify-content: flex-start;
                        height:19px;
                        overflow: hidden;
                        word-break: break-all;
                    }
                }
            }
            &>div:nth-child(1){
                &>div:nth-child(1){
                    margin-top: 0;
                }
            }
        }
        .timeLimit{
            font-size: 14px;
            color:#3C9AEA;
            margin-top: 10px;
        }
        .sum{
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
            &>div{
                font-size: 18px;
                &>span:nth-child(1){
                    color:#909090;
                }
                &>span:nth-child(2){
                    color:#FF4747;
                }
            }
        }
    }
</style>