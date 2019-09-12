<template>
    <div class="wrap">
        <div>
            <img src="/images/purchase/xuanzhong.png" alt="禁止取消选中">
            <div>购买组件</div>
        </div>
        <div>
            <div></div>
            <div>提示：组件购买后有效期内不限次数拖拽使用；未购买的组件请手动在页面移除或单独购买。</div>
        </div>
        <div class="timeChoose">
            <div>购买期限</div>
            <div>
                <div v-for="(item,index) in timeArr" :key="index" :class="{'active':chooseTimeType === item.fType}" @click="chooseTime(item.fType,index)">
                    <div>{{item.fName}}</div>
                    <div v-show="chooseTimeType === item.fType">
                        <img src="/images/purchase/xuanzhongjiaobiao.png" alt="选中的标志">
                    </div>
                </div>
            </div>
        </div>
        <div class="component">
            <div>组件</div>
            <div>提示：未购买的组件请手动在页面移除或单独购买。</div>
            <div class="componentList">
                <div v-for="(item,index) in componentList" :key="index">
                    <div>
                        <img :src="imgDomain+item.fImgUrl" :alt="item.fName" @load="handleImg($event,100,80)">
                        <div v-if="item.fDiscount">{{item.fDiscount * 100 | formatDiscounts}}折</div>
                    </div>
                    <div>
                        <div class="name">{{item.fName}}</div>
                        <div class="originalPrice" v-if="item.fDiscount">￥{{parseFloat(item.fPrice.split(",")[timeIndex]) | formatPrice}}</div>
                        <div class="price"><span>￥</span>{{item.fDiscount?parseFloat(item.fPrice.split(",")[timeIndex])*item.fDiscount:parseFloat(item.fPrice.split(",")[timeIndex]) | formatPrice}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import publicUtil from '~/common/publicUtil';
    export default {
        name: "module",
        props:['pageData'],
        data(){
            return{
                chooseTimeType:1,
                timeArr:[
                    {
                        fName:'一周',
                        fType:1
                    },
                    {
                        fName:'一个月',
                        fType:2
                    },
                    {
                        fName:'三个月',
                        fType:3
                    },
                    {
                        fName:'六个月',
                        fType:4
                    },
                    {
                        fName:'一年',
                        fType:5
                    },
                    {
                        fName:'两年',
                        fType:6
                    },
                    {
                        fName:'五年',
                        fType:7
                    },
                    {
                        fName:'永久',
                        fType:9
                    },
                ],
                componentList:[],
                imgDomain:null,
                timeIndex:0
            }
        },
        created(){
            this.componentList = this.pageData.componentList;
        },
        mounted(){
            if(window.location.host.indexOf("dev") !== -1){
                this.imgDomain = "http://image.dev-zuma.com";
            }else if(window.location.host.indexOf("pre") !== -1){
                this.imgDomain = "https://image.pre-zuma.com";
            }else{
                this.imgDomain = "https://image.zuma.com";
            }
        },
        methods:{
            handleImg(e,width,height){
                publicUtil.handleImg1(e,width,height);
            },
            chooseTime(type,index){
                this.chooseTimeType = type;
                this.timeIndex = index;
                let obj = {};
                obj.fOrderTimeLimit = type;
                obj.fOrderPrice = 0;
                obj.componentDetailBeanList = [];
                for(let i = 0; i < this.componentList.length;i++){
                    let smallComponentOrder = {};
                    smallComponentOrder.fShopId = this.$route.query.fShopId;
                    smallComponentOrder.fSiteId = this.$route.query.fWebsiteId;
                    smallComponentOrder.fComponentId = this.componentList[i].fId;
                    smallComponentOrder.fComponentName = this.componentList[i].fName;
                    smallComponentOrder.fOrderTimeLimit = type;
                    if(this.componentList[i].fDiscount){
                        smallComponentOrder.fDiscountsType = 2;
                        smallComponentOrder.fDiscountsPercent = this.componentList[i].fDiscount.toFixed(2);
                        smallComponentOrder.fOrderPrice = (parseFloat(this.componentList[i].fPrice.split(",")[index])*this.componentList[i].fDiscount).toFixed(2);
                    }else{
                        smallComponentOrder.fDiscountsType = null;
                        smallComponentOrder.fDiscountsPercent = null;
                        smallComponentOrder.fOrderPrice = parseFloat(this.componentList[i].fPrice.split(",")[index]).toFixed(2);
                    }
                    obj.fOrderPrice += parseFloat(smallComponentOrder.fOrderPrice);
                    smallComponentOrder.fNumber = 1;
                    smallComponentOrder.fOrderAmount = smallComponentOrder.fOrderPrice;
                    obj.componentDetailBeanList.push(smallComponentOrder);
                }
                this.$emit('message',obj);
            }
        },
        filters:{
            formatPrice(val) {
                return val.toFixed(2);
            },
            formatDiscounts(val) {
                let num = parseInt(val);
                if (num % 10 === 0) {
                    return num.toString().substr(0, 1);
                } else {
                    return num;
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .wrap{
        width: 770px;
        background: #ffffff;
        padding-left: 30px;
        padding-top: 30px;
        margin-bottom: 10px;
        padding-bottom: 30px;
        &>div:nth-child(1){
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
        &>div:nth-child(2){
            margin-top: 15px;
            &>div:nth-child(2){
                font-size: 14px;
                color:#909090;
                margin-top: 5px;
            }
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
        .component{
            margin-top: 10px;
            &>div:nth-child(1){
                font-size: 16px;
                color:#303030;
            }
            &>div:nth-child(2){
                font-size: 14px;
                color:#909090;
                margin-top: 10px;
            }
            .componentList{
                width: 720px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                margin-top: 10px;
                &>div{
                    width: 210px;
                    height:80px;
                    display: flex;
                    align-items: center;
                    margin-right: 30px;
                    margin-bottom: 30px;
                    &>div:nth-child(1){
                        width: 100px;
                        height:80px;
                        border:1px solid #CCCCCC;
                        overflow: hidden;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &>div:nth-child(2){
                            width: 60px;
                            height:20px;
                            background:#FF4747;
                            color:#ffffff;
                            font-size: 12px;
                            position: absolute;
                            top:0;
                            right:0;
                            z-index: 5;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                    &>div:nth-child(2){
                        width: 100px;
                        height:80px;
                        margin-left: 10px;
                        padding-top: 10px;
                        .name{
                            font-size: 14px;
                            color:#505050;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            width: 100%;
                            white-space: nowrap;
                        }
                        .originalPrice{
                            font-size: 14px;
                            color:#909090;
                            text-decoration: line-through;
                            margin-top: 5px;
                        }
                        .price{
                            display: flex;
                            align-items: center;
                            margin-top: 5px;
                            font-size: 20px;
                            color:#FF4747;
                            &>span{
                                font-size:14px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>