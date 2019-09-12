<template>
    <div class="wrap">
        <div>
            <img src="/images/purchase/xuanzhong.png" alt="禁止取消选中" v-if="isShowChoose">
            <div>购买网站模板</div>
        </div>
        <div>
            <div>
                <img src="/images/purchase/mubankuang.png" alt="模板图片框">
                <div>
                    <img :src="templateInfo.fUrl" alt="模板预览缩略图" @load="handleImg($event,160,90)">
                </div>
            </div>
            <div>
                <div>
                    <div>模板ID：</div>
                    <div>{{templateInfo.fTemplateId}}</div>
                </div>
                <div>
                    <div>模板名：</div>
                    <div>{{templateInfo.fName}}</div>
                </div>
                <div>
                    <div>模板原价：</div>
                    <div>
                        <span>￥</span>
                        <div>{{templateInfo.fAmount | formatPrice}}</div>
                    </div>
                </div>
                <div>
                    <div>分享抵扣：</div>
                    <div>￥{{deduction | formatPrice}}</div>
                    <div>
                        <img src="/images/purchase/wenhao.png" alt="问号图标">
                        <div>
                            <img src="/images/purchase/templateSharePopup.png" alt="模板分享弹窗">
                            <div>
                                <div>收费模板，转发微信好友，可免费使用</div>
                                <div>
                                    <div>
                                        <div id="QRCode"></div>
                                    </div>
                                    <div>
                                        <div>
                                            <div>模板原价：</div>
                                            <div>￥{{templateInfo.fAmount | formatPrice}}</div>
                                        </div>
                                        <div>免费获得需要<span>{{needReadingQuantity}}</span>个转发签到</div>
                                        <div>已获得签到数：<span>{{readingQuantity}}</span></div>
                                        <div>注：每个转发签到可抵扣：￥2.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <loading v-show="isShowLoading" :styleObj="{width:'12px',height:'12px',fill:'#2FB7EC'}" class="loading"></loading>
                    <div @click="updatePrice" v-show="!isShowLoading">刷新</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import publicUtil from '~/common/publicUtil';
    import loading from '~/components/purchase/loading';
    export default {
        props:['pageData'],
        components:{
            loading
        },
        data(){
            return {
                isShowLoading:false,
                isShowChoose:false,
                templateInfo:null,//模板信息
                readingQuantity:null,//签到数量
                type:null,//type为10 指模板单独支付  type为88 组合订单支付，组合订单里面有模板订单
            }
        },
        created(){
            this.templateInfo = this.pageData.templateInfo.mapInfo[0];
            this.readingQuantity = this.pageData.readingQuantity;
            this.type = this.pageData.type;
            if(this.type === 10){
                this.isShowChoose = false;
            }else{
                this.isShowChoose = true;
            }
        },
        mounted(){
          this.$nextTick(()=>{
              this.QRCode();
          })
        },
        methods:{
            updatePrice(){
                this.isShowLoading = true;
                $.ajax({
                    url:this.interfaceApi.getReadingQuantity,
                    data:{
                        fShopId:this.$route.query.fShopId,
                        templateId:this.$route.query.fTemplateId
                    },
                    success:(res)=>{
                        this.isShowLoading = false;
                        if(res.status === 0){
                            this.readingQuantity = res.data;
                            this.$emit("message",res.data);
                        }
                    }
                })
            },
            handleImg(e,width,height){
                publicUtil.handleImg(e,width,height);
            },
            QRCode(){
                let domain = null;
                if(window.location.host.indexOf("dev") !== -1){
                    domain = "http://m.dev-zuma.com";
                }else if(window.location.host.indexOf("pre") !== -1){
                    domain = "https://m.pre-zuma.com";
                }else{
                    domain = "https://m.zuma.com";
                }
                new QRCode('QRCode', {
                    width: 90,
                    height: 90,
                    text: domain+'?zmfrom=MBZF_'+this.$route.query.fShopId+'_'+this.templateInfo.fId, // 二维码地址
                    colorDark: "#000",
                    colorLight: "#fff",
                })
            }
        },
        computed:{
            deduction(){
                if(this.readingQuantity*2 >= this.templateInfo.fAmount){
                    return this.templateInfo.fAmount
                }else{
                    return this.readingQuantity*2;
                }
            },
            needReadingQuantity(){
                return Math.ceil(this.templateInfo.fAmount/2);
            }
        },
        filters:{
            formatPrice(val){
                return val.toFixed(2);
            }
        }
    }
</script>

<style scoped lang="less">
    .wrap{
        width: 770px;
        height:240px;
        background: #ffffff;
        padding-left: 30px;
        padding-top: 30px;
        margin-bottom: 10px;
        &>div:nth-child(1){
            font-size: 18px;
            color:#202020;
            display: flex;
            align-items: center;
            &>img{
               width: 16px;
                height:16px;
                margin-right: 10px;
            }
        }
        &>div:nth-child(2){
            display: flex;
            align-items: center;
            margin-top: 30px;
            &>div:nth-child(1){
                width: 170px;
                height:110px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                &>img:nth-child(1){
                    width: 100%;
                    height:100%;
                }
                &>div:nth-child(2){
                    width: 160px;
                    height:90px;
                    position: absolute;
                    top:15px;
                    left:5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    z-index: 5;
                }
            }
            &>div:nth-child(2){
                margin-left: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height:110px;
                &>div{
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color:#505050;
                }
                &>div:nth-child(3){
                    &>div:nth-child(2){
                        display: flex;
                        color:#FF4747;
                        font-size: 20px;
                        align-items: center;
                        &>span:nth-child(1){
                            font-size: 14px;
                        }
                    }
                }
                &>div:nth-child(4){
                    &>div:nth-child(3){
                        margin-left: 10px;
                        position: relative;
                        cursor: pointer;
                        &>div:nth-child(2){
                            position: absolute;
                            width: 337px;
                            height:182px;
                            display: none;
                            align-items: center;
                            z-index: 10;
                            top:15px;
                            left:-54px;
                            &>img:nth-child(1){
                                width: 337px;
                                height:182px;
                            }
                            &>div:nth-child(2){
                                position: absolute;
                                top:0;
                                left:0;
                                width: 337px;
                                height:182px;
                                padding-top: 30px;
                                padding-left: 25px;
                                display: flex;
                                flex-direction: column;
                                &>div:nth-child(1){
                                    font-size: 15px;
                                    font-weight: bold;
                                    color:#202020;
                                }
                                &>div:nth-child(2){
                                    display: flex;
                                    align-items: center;
                                    margin-top: 10px;
                                    &>div:nth-child(1){
                                        width: 98px;
                                        height:98px;
                                        border: 2px solid #EBF8FD;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        &>div{
                                            width: 90px;
                                            height:90px;
                                        }
                                    }
                                    &>div:nth-child(2){
                                        display: flex;
                                        height:98px;
                                        flex-direction: column;
                                        justify-content: space-between;
                                        margin-left: 10px;
                                        &>div:nth-child(1){
                                            display: flex;
                                            align-items: center;
                                            color:#202020;
                                            font-size: 12px;
                                            &>div:nth-child(2){
                                                font-size: 14px;
                                                font-weight: bold;
                                                color:#FF4747;
                                            }
                                        }
                                        &>div:nth-child(2){
                                            color:#202020;
                                            font-size: 12px;
                                            &>span{
                                                font-size: 14px;
                                                font-weight: bold;
                                                color:#FF4747;
                                                margin:0 10px;
                                            }
                                        }
                                        &>div:nth-child(3){
                                            color:#202020;
                                            font-size: 12px;
                                            &>span{
                                                font-size: 14px;
                                                font-weight: bold;
                                                color:#FF4747;
                                            }
                                        }
                                        &>div:nth-child(4){
                                            font-size: 12px;
                                            color:#909090;
                                        }
                                    }
                                }
                            }
                        }
                        &:hover>div:nth-child(2){
                            display: flex;
                        }
                    }
                    .loading{
                        margin-left: 10px;
                    }
                    &>div:nth-child(5){
                        font-size: 12px;
                        text-decoration: underline;
                        color:#2FB7EC;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>