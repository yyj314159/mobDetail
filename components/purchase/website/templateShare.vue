<template>
    <div class="content">
        <h1 class="h1">收费模板，转发微信好友，可免费使用</h1>
        <dl>
            <dt>
                <div class="modelPc">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div>
                        <img :src="templateInfo.fUrl" @load="handleImg($event,265,179)">
                    </div>
                </div>
                <div class="modelMobel">
                    <div>
                        <img :src="templateInfo.fUrl2" @load="handleImg($event,85,144)">
                    </div>
                </div>
            </dt>
            <dd>
                <div>
                    模板ID：
                    <span>{{templateInfo.fTemplateId}}</span>
                </div>
                <div>
                    模板名：
                    <span>{{templateInfo.fName}}</span>
                </div>
                <div>
                    模板原价：
                    <span class="showgfont">￥{{templateInfo.fAmount | formatPrice}}</span>
                </div>
                <div>
                    免费获得需要 <span class="showgfont">{{neededReadingQuantity}}</span> 个转发签到
                </div>
            </dd>
        </dl>
        <div class="p1">
            <p>本模板收费<span class="showgfont">￥{{templateInfo.fAmount | formatPrice}}</span>，您可以通过转发微信好友的方式，免费获取本模板的永久使用权。</p>
            <p>免费获取本模板需要<span class="showgfont"> {{neededReadingQuantity}} </span>个转发签到！打开<span
                    style="font-weight: bold">手机微信扫描</span>图中二维码，分享到朋友圈，微信群或好友，获得<span class="showgfont"> {{neededReadingQuantity}} </span>个签到，即可免费获取本模板。
            </p>
        </div>
        <p class="p2">我们只求转发，不求收费，只要通过扫码微信转发，获得签到量，即可获得金额抵扣，每个转发签到可抵扣：<span class="showgfont">￥2.00</span></p>
        <div class="QRcodeBox">
            <div class="QRcode">
                <div id="qrcode"></div>
            </div>
            <div class="codeR">
                <h1 v-if="isAlreadyBuy">恭喜您的当前网站已获得本模板的永久使用权！</h1>
                <div class="dataBox">
                    <div>已获得签到数<span class="showgfont">{{acquiredReadingQuantity}}</span></div>
                    <div>可抵扣金额<span class="showgfont">{{acquiredReadingQuantity*2 | formatPrice}}</span></div>
                    <div>仍须支付<span class="showgfont">{{templateInfo.fAmount - acquiredReadingQuantity*2 | formatPrice}}</span></div>
                </div>
                <div class="payBtn" @click="goToPay" v-if="!isAlreadyBuy">现在付款</div>
                <div class="useTemplateBtn" @click="useTemplate" v-if="isAlreadyBuy">使用模板</div>
            </div>
        </div>
    </div>
</template>

<script>
    import publicUtil from '~/common/publicUtil';
    export default {
        name: "templateShare",
        props:['pageData'],
        data(){
            return{
                isAlreadyBuy:false,
                templateInfo:null,
                acquiredReadingQuantity:0,
                timer:null,
                timer1:null,
                shopId:null
            }

        },
        created(){
            this.templateInfo = this.pageData.templateInfo.mapInfo[0];
            this.acquiredReadingQuantity = this.pageData.readingQuantity;
            this.shopId = this.$route.query.fShopId;
        },
        mounted(){
            this.$nextTick(()=>{
                this.qrcode();
            });
            this.updateInfo();
        },
        computed:{
            neededReadingQuantity(){
                return Math.ceil(this.templateInfo.fAmount / 2);
            },
        },
        methods:{
            handleImg(e,width,height){
                publicUtil.handleImg(e,width,height);
            },
            qrcode() {
                let domain = null;
                if(window.location.host.indexOf("dev") !== -1){
                    domain = "http://m.dev-zuma.com";
                }else if(window.location.host.indexOf("pre") !== -1){
                    domain = "https://m.pre-zuma.com";
                }else{
                    domain = "https://m.zuma.com";
                }
                new QRCode('qrcode', {
                    width: 180,
                    height: 180,
                    text: domain+'?zmfrom=MBZF_'+this.shopId+'_'+this.templateInfo.fId, // 二维码地址
                    colorDark: "#000",
                    colorLight: "#fff",
                })
            },
            updateInfo(){
                this.timer = setInterval(()=>{
                    $.ajax({
                        url:this.interfaceApi.getIsHasTemplateOrder,
                        data:{
                            fShopId:this.shopId,
                            fTemplateId:this.templateInfo.fTemplateId
                        },
                        type:'post',
                        success:(res)=>{
                            if(res.status === 0){
                                if(res.data){
                                    this.isAlreadyBuy = true;
                                    clearInterval(this.timer);
                                }
                            }
                        }
                    })
                },5000);
                this.timer1 = setInterval(()=>{
                    $.ajax({
                        url:this.interfaceApi.getReadingQuantity,
                        data:{
                            fShopId:this.shopId,
                            templateId:this.templateInfo.fId
                        },
                        type:'post',
                        success:(res)=>{
                            if(res.status === 0){
                                this.acquiredReadingQuantity = res.data;
                            }
                        }
                    })
                },5000);
            },
            useTemplate(){
                window.open(`/switchtemplate?fShopId=${this.shopId}&templateId=${this.templateInfo.fId}&userType=${this.$store.state.userBasicInfo.userType}`);
            },
            goToPay(){
                if(this.$route.query.fWebsiteId){
                    window.location.href = `/pay?type=10&fTemplateId=${this.templateInfo.fId}&fShopId=${this.shopId}&fWebsiteId=${this.$route.query.fWebsiteId}`;
                }else{
                    window.location.href = `/pay?type=10&fTemplateId=${this.templateInfo.fId}&fShopId=${this.shopId}`;
                }

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
    .showgfont {
        font-weight: bold;
    }
    .content {
        width: 1200px;
        height: 900px;
        background: #fff;
        margin: 0 auto;
        padding: 60px 60px 0;
        .h1 {
            height: 30px;
            font-size: 24px;
            font-weight: bolder;
            color: #122F46;
        }
        dl {
            margin-top: 30px;
            height: 200px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: flex-end;
            font-size: 14px;
            dt {
                width: 342px;
                height: 200px;
                margin-right: 35px;
                position: relative;
                .modelPc {
                    background: #000;
                    width: 272px;
                    height: 200px;
                    border-radius: 9px 9px 0 0;
                    ul {
                        position: absolute;
                        left: 10px;
                        top: 5px;
                        li {
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            margin-right: 5px;
                            background: #fff;
                            float: left;
                        }
                    }
                    div {
                        width: 265px;
                        height: 177px;
                        position: absolute;
                        left: 3.5px;
                        top: 20px;
                        overflow: hidden;
                    }
                }
                .modelMobel {
                    width: 88px;
                    height: 170px;
                    background: #000;
                    border-radius: 9px;
                    position: absolute;
                    right: 0;
                    bottom: 3px;
                    div {
                        width: 85px;
                        height: 144px;
                        position: absolute;
                        right: 1.5px;
                        top: 20px;
                        overflow: hidden;
                    }
                }
            }
            dd {
                display: flex;
                flex: 1;
                flex-direction: column;
                div {
                    margin-top: 15px;
                    color: #122F46;
                }
                & > div:nth-child(2) {
                    height: 19px;
                    overflow: hidden;
                }
            }
        }
        .p1 {
            margin-top: 40px;
            color: #122F46;
            font-size: 16px;
            line-height: 24px;
            & > span {
                font-size: 14px;
            }
        }
        .p2 {
            margin-top: 10px;
        }
        .QRcodeBox {
            margin-top: 40px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            .QRcode {
                width: 198px;
                height: 198px;
                border: 1px solid #EBF8FD;
                margin-right: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                & > div {
                    width: 180px;
                    height: 180px;
                }
            }
            .codeR {
                display: flex;
                justify-content: flex-end;
                flex-direction: column;
                flex: 1;
                h1 {
                    margin-top: 10px;
                    margin-bottom: 15px;
                    font-size: 20px;
                    font-weight: bolder;
                    color: #FF0000;
                }
                .dataBox {
                    font-size: 18px;
                    color: #122F46;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    & > div {
                        height: 70px;
                        display: flex;
                        align-items: center;
                        width: 243px;
                        font-weight: bold;
                    }
                    span {
                        display: inline-block;
                        width: 110px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 20px;
                        color: #FF6633;
                        font-weight: bolder;
                        border: 1px solid #2FB7EC;
                        background: #EBF8FD;
                        margin: 0 20px 0 5px;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.35) inset;
                    }
                }
                .useTemplateBtn, .payBtn {
                    width: 120px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 14px;
                    color: #fff;
                    background: #2FB7EC;
                    margin-top: 30px;
                    cursor: pointer;
                }
            }
        }
    }
</style>