<template>
    <div id="wrap">
        <header>
            <head3></head3>
        </header>
        <main>
            <div>
                <muban :pageData="pageData.templateData" v-if="pageData.templateData" @message="updateTemplateDeduction"></muban>
                <topBar :pageData="pageData.topBarData" v-if="pageData.topBarData" @message="updateTopBarInfo"></topBar>
                <rightBar :pageData="pageData.rightBarData" v-if="pageData.rightBarData" @message="updateRightBarInfo"></rightBar>
                <bottomAd :pageData="pageData.bottomAdvData" v-if="pageData.bottomAdvData" @message="updateBottomAdvInfo"></bottomAd>
                <IP :pageData="pageData.ipData" v-if="pageData.ipData" @message="updateIpInfo"></IP>
                <module :pageData="pageData.componentData" v-if="pageData.componentData" @message="updateComponentInfo"></module>
                <div class="payBox">
                    <div>付款方式：</div>
                    <div>提示：族蚂网为您提供电子发票，您的当前消费，如需要可在您的商家后台> <a :href="invoiceUrl" rel="nofollow" target="_blank">系统消费历史</a>模块中开具发票。</div>
                    <div>
                        <div @click="choosePayWay(1)">
                            <img src="/images/purchase/zhifubao.png" alt="支付宝支付">
                            <div v-if="payType === 1">
                                <img src="/images/purchase/xuanzhongjiaobiao.png" alt="选中的标志">
                            </div>
                        </div>
                        <div @click="choosePayWay(2)">
                            <img src="/images/purchase/weixinzhifu.png" alt="微信支付">
                            <div v-if="payType === 2">
                                <img src="/images/purchase/xuanzhongjiaobiao.png" alt="选中的标志">
                            </div>
                        </div>
                    </div>
                    <div class="couponBox" v-show="false">
                        <div>优惠券：</div>
                    </div>
                    <div :class="{'active':payType !== -1}" @click="goToPay">
                        <span v-if="!isShowLoading">立即支付</span>
                        <loading v-if="isShowLoading" :styleObj="{width:'26px',height:'26px',fill:'#fff'}"></loading>
                    </div>
                </div>
            </div>
            <payOrderContent :payData="payData"  :indexObj="indexObj"></payOrderContent>
        </main>
        <noAuthorityPopup v-if="isShowNoAuthorityPopup"></noAuthorityPopup>
        <weixinPayCodePopup v-if="isShowCodePopup" :codeUrl="codeUrl"></weixinPayCodePopup>
        <ipPopup v-if="isShowIpPopup"></ipPopup>
        <ipPopup1 v-if="isShowIpPopup1" :money="payData.functionOrderBeanList[indexObj.ipIndex].fIpDiscountsPrice" @pay="requestPay"></ipPopup1>
    </div>
</template>

<script>
    import head3 from '~/components/public/head/head3';
    import muban from '~/components/purchase/website/template1';
    import payOrderContent from '~/components/purchase/website/payOrderContent';
    import requestUtil from '~/common/requestUtil';
    import interfaceApi from '~/common/interfaceApi';
    import loading from '~/components/purchase/loading';
    import noAuthorityPopup from '~/components/public/dialog/noAuthorityPopup';
    import topBar from '~/components/purchase/website/topBar';
    import weixinPayCodePopup from '~/components/purchase/weixinPayCodePopup';
    import rightBar from '~/components/purchase/website/rightBar';
    import bottomAd from '~/components/purchase/website/pageBottomAd'
    import IP from '~/components/purchase/website/ip';
    import ipPopup from '~/components/purchase/dialog/purchaseIpPopup';
    import ipPopup1 from '~/components/purchase/dialog/purchaseIpPopup1';
    import module from '~/components/purchase/website/module';
    if(process.client){
        var ReconnectingWebSocket = require('reconnectingwebsocket');
    }
    export default {
        components:{
            head3,
            muban,
            payOrderContent,
            loading,
            noAuthorityPopup,
            topBar,
            weixinPayCodePopup,
            rightBar,
            bottomAd,
            IP,
            ipPopup,
            ipPopup1,
            module
        },
        data(){
            return{
                isShowLoading:false,
                payType:-1,
                isCanRequestPay:true,//判断是否可以请求支付
                isShowNoAuthorityPopup:false,
                isCanClick:true,//判断是否可以点击支付
                isShowCodePopup:false,//是否显示微信支付二维码弹窗
                codeUrl:"",//扫描微信二维码访问的地址
                isShowIpPopup:false,//换购低版本IP的弹窗提示
                isShowIpPopup1:false,//换购高版本IP的弹窗提示
            }
        },
        head(){
            return{
                title:'支付-族蚂网',
                script:[{src:'/qrcode.min.js'}],
                meta:[

                ]
            }
        },
        async asyncData({app,query}){
            let templateData = null;
            let topBarData = null;
            let rightBarData = null;
            let bottomAdvData = null;
            let ipData = null;
            let componentData = null;
            let payData = {};
            let templateIndex = null;
            let topBarIndex = null;
            let rightBarIndex = null;
            let bottomAdvIndex = null;
            let componentIndex = null;
            let ipIndex = null;
            //模板单独支付
            if(parseInt(query.type) === 10){
                templateData = {};
                templateData.type = 10;
                templateData.templateInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getTemplateInfo,{fTemplateId:query.fTemplateId}));
                templateData.readingQuantity = requestUtil.validateData(await requestUtil.getData(interfaceApi.getReadingQuantity,{fShopId:query.fShopId,templateId:query.fTemplateId}));
                payData.fShopId = query.fShopId;
                payData.fFunctionId = templateData.templateInfo.mapInfo[0].fTemplateId;
                payData.fFunctionName = templateData.templateInfo.mapInfo[0].fName;
                payData.fFunctionType = 10;
                payData.fPayType = null;
                payData.fPrice = 0;
                payData.fCouponId = null;
                payData.fCouponNumber = null;
                payData.fCouponDiscountsPrice = null;
                payData.fPayEr = null;
                payData.functionOrderBeanList = [];
                templateIndex = 0;
                let templateOrder = {};
                templateOrder.fShopId = query.fShopId;
                templateOrder.fSiteId = query.fWebsiteId?query.fWebsiteId:null;
                templateOrder.fOrderPrice = ((templateData.templateInfo.mapInfo[0].fAmount - templateData.readingQuantity*2)>0?(templateData.templateInfo.mapInfo[0].fAmount - templateData.readingQuantity*2):0).toFixed(2);
                templateOrder.fFunctionId = templateData.templateInfo.mapInfo[0].fTemplateId;
                templateOrder.fFunctionName = templateData.templateInfo.mapInfo[0].fName;
                templateOrder.fFunctionType = 10;
                templateOrder.fPayType = null;
                templateOrder.fOrderBuy = 1;
                templateOrder.fCouponId = null;
                templateOrder.fCouponNumber = null;
                templateOrder.fCouponDiscountsPrice = null;
                templateOrder.fTemplateDiscountsPrice = ((templateData.templateInfo.mapInfo[0].fAmount - templateData.readingQuantity*2)>0?templateData.readingQuantity*2:templateData.templateInfo.mapInfo[0].fAmount).toFixed(2);
                templateOrder.fTemplateLastPrice = templateData.templateInfo.mapInfo[0].fAmount.toFixed(2);
                templateOrder.fPayEr = null;
                templateOrder.fTemplateId = templateData.templateInfo.mapInfo[0].fId;
                payData.functionOrderBeanList.push(templateOrder);
            }
            //顶部会员功能栏单独支付
            if(parseInt(query.type) === 4){
                topBarData = {};
                topBarData.type = 4;
                topBarData.controlInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getControlInfo,{fShopId:query.fShopId,fId:'SD001'}));
                payData.fShopId = query.fShopId;
                payData.fFunctionId = 'SD001';
                payData.fFunctionName = '顶部功能栏';
                payData.fFunctionType = 4;
                payData.fPayType = null;
                payData.fPrice = 0;
                payData.fCouponId = null;
                payData.fCouponNumber = null;
                payData.fCouponDiscountsPrice = null;
                payData.fPayEr = null;
                payData.functionOrderBeanList = [];
                topBarIndex = 0;
                let topBarOrder = {};
                topBarOrder.fShopId = query.fShopId;
                topBarOrder.fSiteId = query.fWebsiteId?query.fWebsiteId:null;
                for(let i = 0; i < topBarData.controlInfo.priceBeanList.length; i++){
                    if(topBarData.controlInfo.priceBeanList[i].fControlHotSale === 1){
                        topBarOrder.fOrderTimeLimit = topBarData.controlInfo.priceBeanList[i].fType;
                        if(topBarData.controlInfo.priceBeanList[i].fIsDiscounts){
                            if(topBarData.controlInfo.priceBeanList[i].fDiscountsPercent){
                                topBarOrder.fOrderPrice = (topBarData.controlInfo.priceBeanList[i].fPrice * topBarData.controlInfo.priceBeanList[i].fDiscountsPercent).toFixed(2);
                                topBarOrder.fDiscountsType = 2;
                                topBarOrder.fDiscountsPercent = topBarData.controlInfo.priceBeanList[i].fDiscountsPercent.toFixed(2);
                            }else{
                                topBarOrder.fOrderPrice = topBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                topBarOrder.fDiscountsType = 1;
                                topBarOrder.fDiscountsPercent = null;
                            }
                        }else{
                            topBarOrder.fOrderPrice = topBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                            topBarOrder.fDiscountsType = null;
                            topBarOrder.fDiscountsPercent = null;
                        }
                    }
                }
                topBarOrder.fFunctionId = 'SD001';
                topBarOrder.fFunctionName = '顶部功能栏';
                topBarOrder.fFunctionType = 4;
                topBarOrder.fPayType = null;
                if(topBarData.controlInfo.fOrderDueTime && topBarData.controlInfo.fIsPurchase !== 2){//是否有到期时间
                    topBarOrder.fOrderBuy = 2;
                }else{
                    topBarOrder.fOrderBuy = 1;
                }
                topBarOrder.fOrderDueTime = topBarData.controlInfo.fOrderDueTime;
                topBarOrder.fCouponId = null;
                topBarOrder.fCouponNumber = null;
                topBarOrder.fCouponDiscountsPrice = null;
                payData.functionOrderBeanList.push(topBarOrder);
            }
            //右侧功能栏单独支付
            if(parseInt(query.type) === 3){
                rightBarData = {};
                rightBarData.type = 3;
                rightBarData.controlInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getControlInfo,{fShopId:query.fShopId,fId:'SD002'}));
                payData.fShopId = query.fShopId;
                payData.fFunctionId = 'SD002';
                payData.fFunctionName = '电子商务栏';
                payData.fFunctionType = 3;
                payData.fPayType = null;
                payData.fPrice = 0;
                payData.fCouponId = null;
                payData.fCouponNumber = null;
                payData.fCouponDiscountsPrice = null;
                payData.fPayEr = null;
                payData.functionOrderBeanList = [];
                rightBarIndex = 0;
                let rightBarOrder = {};
                rightBarOrder.fShopId = query.fShopId;
                rightBarOrder.fSiteId = query.fWebsiteId?query.fWebsiteId:null;
                for(let i = 0; i < rightBarData.controlInfo.priceBeanList.length; i++){
                    if(rightBarData.controlInfo.priceBeanList[i].fControlHotSale === 1){
                        rightBarOrder.fOrderTimeLimit = rightBarData.controlInfo.priceBeanList[i].fType;
                        if(rightBarData.controlInfo.priceBeanList[i].fIsDiscounts){
                            if(rightBarData.controlInfo.priceBeanList[i].fDiscountsPercent){
                                rightBarOrder.fOrderPrice = (rightBarData.controlInfo.priceBeanList[i].fPrice * rightBarData.controlInfo.priceBeanList[i].fDiscountsPercent).toFixed(2);
                                rightBarOrder.fDiscountsType = 2;
                                rightBarOrder.fDiscountsPercent = rightBarData.controlInfo.priceBeanList[i].fDiscountsPercent.toFixed(2);
                            }else{
                                rightBarOrder.fOrderPrice = rightBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                rightBarOrder.fDiscountsType = 1;
                                rightBarOrder.fDiscountsPercent = null;
                            }
                        }else{
                            rightBarOrder.fOrderPrice = rightBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                            rightBarOrder.fDiscountsType = null;
                            rightBarOrder.fDiscountsPercent = null;
                        }
                    }
                }
                rightBarOrder.fFunctionId = 'SD002';
                rightBarOrder.fFunctionName = '电子商务栏';
                rightBarOrder.fFunctionType = 3;
                rightBarOrder.fPayType = null;
                if(rightBarData.controlInfo.fOrderDueTime && rightBarData.controlInfo.fIsPurchase !== 2){//是否有到期时间
                    rightBarOrder.fOrderBuy = 2;
                }else{
                    rightBarOrder.fOrderBuy = 1;
                }
                rightBarOrder.fOrderDueTime = rightBarData.controlInfo.fOrderDueTime;
                rightBarOrder.fCouponId = null;
                rightBarOrder.fCouponNumber = null;
                rightBarOrder.fCouponDiscountsPrice = null
                payData.functionOrderBeanList.push(rightBarOrder);
            }
            //去页底广告单独支付
            if(parseInt(query.type) === 1){
                bottomAdvData = {};
                bottomAdvData.type = 1;
                bottomAdvData.controlInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getControlInfo,{fShopId:query.fShopId,fId:'SD004'}));
                payData.fShopId = query.fShopId;
                payData.fFunctionId = 'SD004';
                payData.fFunctionName = '页底广告';
                payData.fFunctionType = 1;
                payData.fPayType = null;
                payData.fPrice = 0;
                payData.fCouponId = null;
                payData.fCouponNumber = null;
                payData.fCouponDiscountsPrice = null;
                payData.fPayEr = null;
                payData.functionOrderBeanList = [];
                bottomAdvIndex = 0;
                let bottomAdvOrder = {};
                bottomAdvOrder.fShopId = query.fShopId;
                bottomAdvOrder.fSiteId = query.fWebsiteId?query.fWebsiteId:null;
                for(let i = 0; i < bottomAdvData.controlInfo.priceBeanList.length; i++){
                    if(bottomAdvData.controlInfo.priceBeanList[i].fControlHotSale === 1){
                        bottomAdvOrder.fOrderTimeLimit = bottomAdvData.controlInfo.priceBeanList[i].fType;
                        if(bottomAdvData.controlInfo.priceBeanList[i].fIsDiscounts){
                            if(bottomAdvData.controlInfo.priceBeanList[i].fDiscountsPercent){
                                bottomAdvOrder.fOrderPrice = (bottomAdvData.controlInfo.priceBeanList[i].fPrice * bottomAdvData.controlInfo.priceBeanList[i].fDiscountsPercent).toFixed(2);
                                bottomAdvOrder.fDiscountsType = 2;
                                bottomAdvOrder.fDiscountsPercent = bottomAdvData.controlInfo.priceBeanList[i].fDiscountsPercent.toFixed(2);
                            }else{
                                bottomAdvOrder.fOrderPrice = bottomAdvData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                bottomAdvOrder.fDiscountsType = 1;
                                bottomAdvOrder.fDiscountsPercent = null;
                            }
                        }else{
                            bottomAdvOrder.fOrderPrice = bottomAdvData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                            bottomAdvOrder.fDiscountsType = null;
                            bottomAdvOrder.fDiscountsPercent = null;
                        }
                    }
                }
                bottomAdvOrder.fFunctionId = 'SD004';
                bottomAdvOrder.fFunctionName = '页底广告';
                bottomAdvOrder.fFunctionType = 1;
                bottomAdvOrder.fPayType = null;
                if(bottomAdvData.controlInfo.fOrderDueTime && bottomAdvData.controlInfo.fIsPurchase !== 2){//是否有到期时间
                    bottomAdvOrder.fOrderBuy = 2;
                }else{
                    bottomAdvOrder.fOrderBuy = 1;
                }
                bottomAdvOrder.fOrderDueTime = bottomAdvData.controlInfo.fOrderDueTime;
                bottomAdvOrder.fCouponId = null;
                bottomAdvOrder.fCouponNumber = null;
                bottomAdvOrder.fCouponDiscountsPrice = null;
                payData.functionOrderBeanList.push(bottomAdvOrder);
            }
            //IP支付
            if(parseInt(query.type) === 2){
                ipData = {};
                ipData.ipInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getIPData,{fShopId:query.fShopId}));
                payData.fShopId = query.fShopId;
                payData.fFunctionId = ipData.ipInfo.fPriceCode;
                payData.fFunctionType = 2;
                payData.fPayType = null;
                payData.fPrice = null;
                payData.fCouponId = null;
                payData.fCouponNumber = null;
                payData.fCouponDiscountsPrice = null;
                payData.fPayEr = null;
                payData.functionOrderBeanList = [];
                ipIndex = 0;
                let ipOrder = {}
                ipOrder.fShopId = query.fShopId;
                ipOrder.fSiteId = query.fWebsiteId?query.fWebsiteId:null;
                ipOrder.fFunctionId = ipData.ipInfo.fPriceCode;
                ipOrder.fFunctionType = 2;
                ipOrder.fPayType = null;
                if(ipData.ipInfo.fCurrentDueDate){
                    ipOrder.fOrderBuy = 2;
                }else{
                    ipOrder.fOrderBuy = 1;
                }
                ipOrder.fOrderDueTime = ipData.ipInfo.fCurrentDueDate;
                if(ipData.ipInfo.fCurrentIPType && ipData.ipInfo.fCurrentIPType !== 9){//当前已经使用了某种类型IP
                    switch (ipData.ipInfo.fCurrentIPType) {
                        case 1:
                            ipOrder.fIpType = 1;
                            ipOrder.fFunctionName = '网站独享境内静态IP';
                            payData.fFunctionName = '网站独享境内静态IP';
                            for(let i = 0; i < ipData.ipInfo.singleDetailBeanList.length; i++){
                                if(ipData.ipInfo.singleDetailBeanList[i].fIpHotSale === 1){
                                    ipOrder.fOrderTimeLimit = ipData.ipInfo.singleDetailBeanList[i].fPriceType;
                                    if(ipData.ipInfo.singleDetailBeanList[i].fIsDiscounts){
                                        if(ipData.ipInfo.singleDetailBeanList[i].fDiscountsPercent){
                                            ipOrder.fOrderPrice = (ipData.ipInfo.singleDetailBeanList[i].fPrice*ipData.ipInfo.singleDetailBeanList[i].fDiscountsPercent).toFixed(2);
                                            ipOrder.fDiscountsType = 2;
                                            ipOrder.fDiscountsPercent = ipData.ipInfo.singleDetailBeanList[i].fDiscountsPercent.toFixed(2);
                                        }else{
                                            ipOrder.fOrderPrice = ipData.ipInfo.singleDetailBeanList[i].fPrice.toFixed(2);
                                            ipOrder.fDiscountsType = 1;
                                            ipOrder.fDiscountsPercent = null;
                                        }
                                    }else{
                                        ipOrder.fOrderPrice = ipData.ipInfo.singleDetailBeanList[i].fPrice.toFixed(2);
                                        ipOrder.fDiscountsType = null;
                                        ipOrder.fDiscountsPercent = null;
                                    }

                                }
                            }
                            break;
                        case 3:
                            ipOrder.fIpType = 3;
                            ipOrder.fFunctionName = '少量网站共享境内静态IP';
                            payData.fFunctionName = '少量网站共享境内静态IP';
                            for(let i = 0; i < ipData.ipInfo.lessDetailBeanList.length; i++){
                                if(ipData.ipInfo.lessDetailBeanList[i].fIpHotSale === 1){
                                    ipOrder.fOrderTimeLimit = ipData.ipInfo.lessDetailBeanList[i].fPriceType;
                                    if(ipData.ipInfo.lessDetailBeanList[i].fIsDiscounts){
                                        if(ipData.ipInfo.lessDetailBeanList[i].fDiscountsPercent){
                                            ipOrder.fOrderPrice = (ipData.ipInfo.lessDetailBeanList[i].fPrice*ipData.ipInfo.lessDetailBeanList[i].fDiscountsPercent).toFixed(2);
                                            ipOrder.fDiscountsType = 2;
                                            ipOrder.fDiscountsPercent = ipData.ipInfo.lessDetailBeanList[i].fDiscountsPercent.toFixed(2);
                                        }else{
                                            ipOrder.fOrderPrice = ipData.ipInfo.lessDetailBeanList[i].fPrice.toFixed(2);
                                            ipOrder.fDiscountsType = 1;
                                            ipOrder.fDiscountsPercent = null;
                                        }
                                    }else{
                                        ipOrder.fOrderPrice = ipData.ipInfo.lessDetailBeanList[i].fPrice.toFixed(2);
                                        ipOrder.fDiscountsType = null;
                                        ipOrder.fDiscountsPercent = null;
                                    }

                                }
                            }
                            break;
                        case 6:
                            ipOrder.fIpType = 6;
                            ipOrder.fFunctionName = '群站共享境内静态IP';
                            payData.fFunctionName = '群站共享境内静态IP';
                            for(let i = 0; i < ipData.ipInfo.moreDetailBeanList.length; i++){
                                if(ipData.ipInfo.moreDetailBeanList[i].fIpHotSale === 1){
                                    ipOrder.fOrderTimeLimit = ipData.ipInfo.moreDetailBeanList[i].fPriceType;
                                    if(ipData.ipInfo.moreDetailBeanList[i].fIsDiscounts){
                                        if(ipData.ipInfo.moreDetailBeanList[i].fDiscountsPercent){
                                            ipOrder.fOrderPrice = (ipData.ipInfo.moreDetailBeanList[i].fPrice*ipData.ipInfo.moreDetailBeanList[i].fDiscountsPercent).toFixed(2);
                                            ipOrder.fDiscountsType = 2;
                                            ipOrder.fDiscountsPercent = ipData.ipInfo.moreDetailBeanList[i].fDiscountsPercent.toFixed(2);
                                        }else{
                                            ipOrder.fOrderPrice = ipData.ipInfo.moreDetailBeanList[i].fPrice.toFixed(2);
                                            ipOrder.fDiscountsType = 1;
                                            ipOrder.fDiscountsPercent = null;
                                        }
                                    }else{
                                        ipOrder.fOrderPrice = ipData.ipInfo.moreDetailBeanList[i].fPrice.toFixed(2);
                                        ipOrder.fDiscountsType = null;
                                        ipOrder.fDiscountsPercent = null;
                                    }

                                }
                            }
                            break;
                    }
                }else{//当前没有使用某种IP类型
                    switch (ipData.ipInfo.dictionaryBeanList[0].fValue) {//判断当前有的IP类型第一个是什么类型
                        case 1:
                            ipOrder.fIpType = 1;
                            ipOrder.fFunctionName = '网站独享境内静态IP';
                            payData.fFunctionName = '网站独享境内静态IP';
                            for(let i = 0; i < ipData.ipInfo.singleDetailBeanList.length; i++){
                                if(ipData.ipInfo.singleDetailBeanList[i].fIpHotSale === 1){
                                    ipOrder.fOrderTimeLimit = ipData.ipInfo.singleDetailBeanList[i].fPriceType;
                                    if(ipData.ipInfo.singleDetailBeanList[i].fIsDiscounts){
                                        if(ipData.ipInfo.singleDetailBeanList[i].fDiscountsPercent){
                                            ipOrder.fOrderPrice = (ipData.ipInfo.singleDetailBeanList[i].fPrice*ipData.ipInfo.singleDetailBeanList[i].fDiscountsPercent).toFixed(2);
                                            ipOrder.fDiscountsType = 2;
                                            ipOrder.fDiscountsPercent = ipData.ipInfo.singleDetailBeanList[i].fDiscountsPercent.toFixed(2);
                                        }else{
                                            ipOrder.fOrderPrice = ipData.ipInfo.singleDetailBeanList[i].fPrice.toFixed(2);
                                            ipOrder.fDiscountsType = 1;
                                            ipOrder.fDiscountsPercent = null;
                                        }
                                    }else{
                                        ipOrder.fOrderPrice = ipData.ipInfo.singleDetailBeanList[i].fPrice.toFixed(2);
                                        ipOrder.fDiscountsType = null;
                                        ipOrder.fDiscountsPercent = null;
                                    }

                                }
                            }
                            break;
                        case 3:
                            ipOrder.fIpType = 3;
                            ipOrder.fFunctionName = '少量网站共享境内静态IP';
                            payData.fFunctionName = '少量网站共享境内静态IP';
                            for(let i = 0; i < ipData.ipInfo.lessDetailBeanList.length; i++){
                                if(ipData.ipInfo.lessDetailBeanList[i].fIpHotSale === 1){
                                    ipOrder.fOrderTimeLimit = ipData.ipInfo.lessDetailBeanList[i].fPriceType;
                                    if(ipData.ipInfo.lessDetailBeanList[i].fIsDiscounts){
                                        if(ipData.ipInfo.lessDetailBeanList[i].fDiscountsPercent){
                                            ipOrder.fOrderPrice = (ipData.ipInfo.lessDetailBeanList[i].fPrice*ipData.ipInfo.lessDetailBeanList[i].fDiscountsPercent).toFixed(2);
                                            ipOrder.fDiscountsType = 2;
                                            ipOrder.fDiscountsPercent = ipData.ipInfo.lessDetailBeanList[i].fDiscountsPercent.toFixed(2);
                                        }else{
                                            ipOrder.fOrderPrice = ipData.ipInfo.lessDetailBeanList[i].fPrice.toFixed(2);
                                            ipOrder.fDiscountsType = 1;
                                            ipOrder.fDiscountsPercent = null;
                                        }
                                    }else{
                                        ipOrder.fOrderPrice = ipData.ipInfo.lessDetailBeanList[i].fPrice.toFixed(2);
                                        ipOrder.fDiscountsType = null;
                                        ipOrder.fDiscountsPercent = null;
                                    }

                                }
                            }
                            break;
                        case 6:
                            ipOrder.fIpType = 6;
                            ipOrder.fFunctionName = '群站共享境内静态IP';
                            payData.fFunctionName = '群站共享境内静态IP';
                            for(let i = 0; i < ipData.ipInfo.moreDetailBeanList.length; i++){
                                if(ipData.ipInfo.moreDetailBeanList[i].fIpHotSale === 1){
                                    ipOrder.fOrderTimeLimit = ipData.ipInfo.moreDetailBeanList[i].fPriceType;
                                    if(ipData.ipInfo.moreDetailBeanList[i].fIsDiscounts){
                                        if(ipData.ipInfo.moreDetailBeanList[i].fDiscountsPercent){
                                            ipOrder.fOrderPrice = (ipData.ipInfo.moreDetailBeanList[i].fPrice*ipData.ipInfo.moreDetailBeanList[i].fDiscountsPercent).toFixed(2);
                                            ipOrder.fDiscountsType = 2;
                                            ipOrder.fDiscountsPercent = ipData.ipInfo.moreDetailBeanList[i].fDiscountsPercent.toFixed(2);
                                        }else{
                                            ipOrder.fOrderPrice = ipData.ipInfo.moreDetailBeanList[i].fPrice.toFixed(2);
                                            ipOrder.fDiscountsType = 1;
                                            ipOrder.fDiscountsPercent = null;
                                        }
                                    }else{
                                        ipOrder.fOrderPrice = ipData.ipInfo.moreDetailBeanList[i].fPrice.toFixed(2);
                                        ipOrder.fDiscountsType = null;
                                        ipOrder.fDiscountsPercent = null;
                                    }

                                }
                            }
                            break;
                    }
                }
                ipOrder.fCouponId = null;
                ipOrder.fCouponNumber = null;
                ipOrder.fCouponDiscountsPrice = null;
                ipOrder.fIpDiscountsPrice = null;
                ipOrder.fDeductionLaterPrice = null;
                payData.functionOrderBeanList.push(ipOrder);
                console.log(payData);
            }
            //组合支付
            if(parseInt(query.type) === 88){
                let groupInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getGroupPayInfo,{fSiteId:query.fWebsiteId}));
                let num = 0;
                if(groupInfo.templateInfo !== undefined){
                    num += 1;
                }
                if(groupInfo.componentList.length > 0){
                    num += 1;
                }
                switch(parseInt(query.fControlType)){
                    case 1:
                    case 2:
                        num += 1;
                        break;
                    case 3:
                        num += 2;
                        break;
                }
                if(num > 1){//有多个支付项目
                    payData.fShopId = query.fShopId;
                    payData.fFunctionName = '组合订单';
                    payData.fFunctionType = 88;
                    payData.fPrice = 0;
                    payData.fCouponId = null;
                    payData.fCouponNumber = null;
                    payData.fCouponDiscountsPrice = null;
                    payData.fPayEr = null;
                    payData.functionOrderBeanList = [];
                    let index = 0;
                    //模板
                    if(groupInfo.templateInfo !== undefined){
                        templateData = {};
                        templateData.type = 88;
                        templateData.templateInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getTemplateInfo,{fTemplateId:groupInfo.templateInfo.fId}));
                        templateData.readingQuantity = requestUtil.validateData(await requestUtil.getData(interfaceApi.getReadingQuantity,{fShopId:query.fShopId,templateId:groupInfo.templateInfo.fId}));
                        templateIndex = index;
                        index += 1;
                        let templateOrder = {};
                        templateOrder.fShopId = query.fShopId;
                        templateOrder.fSiteId = query.fWebsiteId;
                        templateOrder.fOrderPrice = ((templateData.templateInfo.mapInfo[0].fAmount - templateData.readingQuantity*2)>0?(templateData.templateInfo.mapInfo[0].fAmount - templateData.readingQuantity*2):0).toFixed(2);
                        templateOrder.fFunctionId = templateData.templateInfo.mapInfo[0].fTemplateId;
                        templateOrder.fFunctionName = templateData.templateInfo.mapInfo[0].fName;
                        templateOrder.fFunctionType = 10;
                        templateOrder.fPayType = null;
                        templateOrder.fOrderBuy = 1;
                        templateOrder.fCouponId = null;
                        templateOrder.fCouponNumber = null;
                        templateOrder.fCouponDiscountsPrice = null;
                        templateOrder.fTemplateDiscountsPrice = ((templateData.templateInfo.mapInfo[0].fAmount - templateData.readingQuantity*2)>0?templateData.readingQuantity*2:templateData.templateInfo.mapInfo[0].fAmount).toFixed(2);
                        templateOrder.fTemplateLastPrice = templateData.templateInfo.mapInfo[0].fAmount.toFixed(2);
                        templateOrder.fPayEr = null;
                        templateOrder.fTemplateId = templateData.templateInfo.mapInfo[0].fId;
                        payData.functionOrderBeanList.push(templateOrder);
                    }
                    //顶部功能栏
                    if(parseInt(query.fControlType) === 1 || parseInt(query.fControlType) === 3){
                        topBarData = {};
                        topBarData.type = 88;
                        topBarData.controlInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getControlInfo,{fShopId:query.fShopId,fId:'SD001'}));
                        topBarIndex = index;
                        index += 1;
                        let topBarOrder = {};
                        topBarOrder.fShopId = query.fShopId;
                        topBarOrder.fSiteId = query.fWebsiteId;
                        for(let i = 0; i < topBarData.controlInfo.priceBeanList.length; i++){
                            if(topBarData.controlInfo.priceBeanList[i].fControlHotSale === 1){
                                topBarOrder.fOrderTimeLimit = topBarData.controlInfo.priceBeanList[i].fType;
                                if(topBarData.controlInfo.priceBeanList[i].fIsDiscounts){
                                    if(topBarData.controlInfo.priceBeanList[i].fDiscountsPercent){
                                        topBarOrder.fOrderPrice = (topBarData.controlInfo.priceBeanList[i].fPrice * topBarData.controlInfo.priceBeanList[i].fDiscountsPercent).toFixed(2);
                                        topBarOrder.fDiscountsType = 2;
                                        topBarOrder.fDiscountsPercent = topBarData.controlInfo.priceBeanList[i].fDiscountsPercent.toFixed(2);
                                    }else{
                                        topBarOrder.fOrderPrice = topBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                        topBarOrder.fDiscountsType = 1;
                                        topBarOrder.fDiscountsPercent = null;
                                    }
                                }else{
                                    topBarOrder.fOrderPrice = topBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                    topBarOrder.fDiscountsType = null;
                                    topBarOrder.fDiscountsPercent = null;
                                }
                            }
                        }
                        topBarOrder.fFunctionId = 'SD001';
                        topBarOrder.fFunctionName = '顶部功能栏';
                        topBarOrder.fFunctionType = 4;
                        topBarOrder.fPayType = null;
                        if(topBarData.controlInfo.fOrderDueTime && topBarData.controlInfo.fIsPurchase !== 2){//是否有到期时间
                            topBarOrder.fOrderBuy = 2;
                        }else{
                            topBarOrder.fOrderBuy = 1;
                        }
                        topBarOrder.fOrderDueTime = topBarData.controlInfo.fOrderDueTime;
                        topBarOrder.fCouponId = null;
                        topBarOrder.fCouponNumber = null;
                        topBarOrder.fCouponDiscountsPrice = null;
                        payData.functionOrderBeanList.push(topBarOrder);
                    }
                    //右侧功能栏
                    if(parseInt(query.fControlType) === 2 || parseInt(query.fControlType) === 3){
                        rightBarData = {};
                        rightBarData.type = 88;
                        rightBarData.controlInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getControlInfo,{fShopId:query.fShopId,fId:'SD002'}));
                        rightBarIndex = index;
                        index += 1;
                        let rightBarOrder = {};
                        rightBarOrder.fShopId = query.fShopId;
                        rightBarOrder.fSiteId = query.fWebsiteId;
                        for(let i = 0; i < rightBarData.controlInfo.priceBeanList.length; i++){
                            if(rightBarData.controlInfo.priceBeanList[i].fControlHotSale === 1){
                                rightBarOrder.fOrderTimeLimit = rightBarData.controlInfo.priceBeanList[i].fType;
                                if(rightBarData.controlInfo.priceBeanList[i].fIsDiscounts){
                                    if(rightBarData.controlInfo.priceBeanList[i].fDiscountsPercent){
                                        rightBarOrder.fOrderPrice = (rightBarData.controlInfo.priceBeanList[i].fPrice * rightBarData.controlInfo.priceBeanList[i].fDiscountsPercent).toFixed(2);
                                        rightBarOrder.fDiscountsType = 2;
                                        rightBarOrder.fDiscountsPercent = rightBarData.controlInfo.priceBeanList[i].fDiscountsPercent.toFixed(2);
                                    }else{
                                        rightBarOrder.fOrderPrice = rightBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                        rightBarOrder.fDiscountsType = 1;
                                        rightBarOrder.fDiscountsPercent = null;
                                    }
                                }else{
                                    rightBarOrder.fOrderPrice = rightBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                    rightBarOrder.fDiscountsType = null;
                                    rightBarOrder.fDiscountsPercent = null;
                                }
                            }
                        }
                        rightBarOrder.fFunctionId = 'SD002';
                        rightBarOrder.fFunctionName = '电子商务栏';
                        rightBarOrder.fFunctionType = 3;
                        rightBarOrder.fPayType = null;
                        if(rightBarData.controlInfo.fOrderDueTime && rightBarData.controlInfo.fIsPurchase !== 2){//是否有到期时间
                            rightBarOrder.fOrderBuy = 2;
                        }else{
                            rightBarOrder.fOrderBuy = 1;
                        }
                        rightBarOrder.fOrderDueTime = rightBarData.controlInfo.fOrderDueTime;
                        rightBarOrder.fCouponId = null;
                        rightBarOrder.fCouponNumber = null;
                        rightBarOrder.fCouponDiscountsPrice = null
                        payData.functionOrderBeanList.push(rightBarOrder);
                    }
                    //组件
                    if(groupInfo.componentList.length>0){
                        componentData = {};
                        componentData.componentList = groupInfo.componentList;
                        componentIndex = index;
                        let componentOrder = {};
                        componentOrder.fShopId = query.fShopId;
                        componentOrder.fSiteId = query.fWebsiteId;
                        componentOrder.fFunctionName = '组件使用';
                        componentOrder.fOrderPrice = 0;
                        componentOrder.fFunctionType = 5;
                        componentOrder.fPayType = null;
                        componentOrder.fOrderBuy = 1;
                        componentOrder.fOrderTimeLimit  = 1;
                        componentOrder.fCouponId = null;
                        componentOrder.fCouponNumber = null;
                        componentOrder.fCouponDiscountsPrice = null;
                        componentOrder.componentDetailBeanList = [];
                        for(let i = 0; i < componentData.componentList.length; i++){
                            let smallComponentOrder = {};
                            smallComponentOrder.fShopId = query.fShopId;
                            smallComponentOrder.fSiteId = query.fWebsiteId;
                            smallComponentOrder.fComponentId = componentData.componentList[i].fId;
                            smallComponentOrder.fComponentName = componentData.componentList[i].fName;
                            smallComponentOrder.fOrderTimeLimit = 1;
                            if(componentData.componentList[i].fDiscount){
                                smallComponentOrder.fDiscountsType = 2;
                                smallComponentOrder.fDiscountsPercent = componentData.componentList[i].fDiscount.toFixed(2);
                                smallComponentOrder.fOrderPrice = (parseFloat(componentData.componentList[i].fPrice.split(",")[0])*componentData.componentList[i].fDiscount).toFixed(2);
                            }else{
                                smallComponentOrder.fDiscountsType = null;
                                smallComponentOrder.fDiscountsPercent = null;
                                smallComponentOrder.fOrderPrice = parseFloat(componentData.componentList[i].fPrice.split(",")[0]).toFixed(2);
                            }
                            componentOrder.fOrderPrice += parseFloat(smallComponentOrder.fOrderPrice);
                            smallComponentOrder.fNumber = 1;
                            smallComponentOrder.fOrderAmount = smallComponentOrder.fOrderPrice;
                            componentOrder.componentDetailBeanList.push(smallComponentOrder);
                        }
                        payData.functionOrderBeanList.push(componentOrder);
                    }
                }else{//只有一个支付项目
                    //只需要付费模板
                    if(groupInfo.templateInfo !== undefined){
                        templateData = {};
                        templateData.type = 10;
                        templateData.templateInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getTemplateInfo,{fTemplateId:groupInfo.templateInfo.fId}));
                        templateData.readingQuantity = requestUtil.validateData(await requestUtil.getData(interfaceApi.getReadingQuantity,{fShopId:query.fShopId,templateId:groupInfo.templateInfo.fId}));
                        payData.fShopId = query.fShopId;
                        payData.fFunctionId = templateData.templateInfo.mapInfo[0].fTemplateId;
                        payData.fFunctionName = templateData.templateInfo.mapInfo[0].fName;
                        payData.fFunctionType = 10;
                        payData.fPayType = null;
                        payData.fPrice = 0;
                        payData.fCouponId = null;
                        payData.fCouponNumber = null;
                        payData.fCouponDiscountsPrice = null;
                        payData.fPayEr = null;
                        payData.functionOrderBeanList = [];
                        templateIndex = 0;
                        let templateOrder = {};
                        templateOrder.fShopId = query.fShopId;
                        templateOrder.fSiteId = query.fWebsiteId;
                        templateOrder.fOrderPrice = ((templateData.templateInfo.mapInfo[0].fAmount - templateData.readingQuantity*2)>0?(templateData.templateInfo.mapInfo[0].fAmount - templateData.readingQuantity*2):0).toFixed(2);
                        templateOrder.fFunctionId = templateData.templateInfo.mapInfo[0].fTemplateId;
                        templateOrder.fFunctionName = templateData.templateInfo.mapInfo[0].fName;
                        templateOrder.fFunctionType = 10;
                        templateOrder.fPayType = null;
                        templateOrder.fOrderBuy = 1;
                        templateOrder.fCouponId = null;
                        templateOrder.fCouponNumber = null;
                        templateOrder.fCouponDiscountsPrice = null;
                        templateOrder.fTemplateDiscountsPrice = ((templateData.templateInfo.mapInfo[0].fAmount - templateData.readingQuantity*2)>0?templateData.readingQuantity*2:templateData.templateInfo.mapInfo[0].fAmount).toFixed(2);
                        templateOrder.fTemplateLastPrice = templateData.templateInfo.mapInfo[0].fAmount.toFixed(2);
                        templateOrder.fPayEr = null;
                        templateOrder.fTemplateId = templateData.templateInfo.mapInfo[0].fId;
                        payData.functionOrderBeanList.push(templateOrder);
                    }
                    //只需要付费顶部功能栏
                    if(parseInt(query.fControlType) === 1){
                        topBarData = {};
                        topBarData.type = 4;
                        topBarData.controlInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getControlInfo,{fShopId:query.fShopId,fId:'SD001'}));
                        payData.fShopId = query.fShopId;
                        payData.fFunctionId = 'SD001';
                        payData.fFunctionName = '顶部功能栏';
                        payData.fFunctionType = 4;
                        payData.fPayType = null;
                        payData.fPrice = 0;
                        payData.fCouponId = null;
                        payData.fCouponNumber = null;
                        payData.fCouponDiscountsPrice = null;
                        payData.fPayEr = null;
                        payData.functionOrderBeanList = [];
                        topBarIndex = 0;
                        let topBarOrder = {};
                        topBarOrder.fShopId = query.fShopId;
                        topBarOrder.fSiteId = query.fWebsiteId;
                        for(let i = 0; i < topBarData.controlInfo.priceBeanList.length; i++){
                            if(topBarData.controlInfo.priceBeanList[i].fControlHotSale === 1){
                                topBarOrder.fOrderTimeLimit = topBarData.controlInfo.priceBeanList[i].fType;
                                if(topBarData.controlInfo.priceBeanList[i].fIsDiscounts){
                                    if(topBarData.controlInfo.priceBeanList[i].fDiscountsPercent){
                                        topBarOrder.fOrderPrice = (topBarData.controlInfo.priceBeanList[i].fPrice * topBarData.controlInfo.priceBeanList[i].fDiscountsPercent).toFixed(2);
                                        topBarOrder.fDiscountsType = 2;
                                        topBarOrder.fDiscountsPercent = topBarData.controlInfo.priceBeanList[i].fDiscountsPercent.toFixed(2);
                                    }else{
                                        topBarOrder.fOrderPrice = topBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                        topBarOrder.fDiscountsType = 1;
                                        topBarOrder.fDiscountsPercent = null;
                                    }
                                }else{
                                    topBarOrder.fOrderPrice = topBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                    topBarOrder.fDiscountsType = null;
                                    topBarOrder.fDiscountsPercent = null;
                                }
                            }
                        }
                        topBarOrder.fFunctionId = 'SD001';
                        topBarOrder.fFunctionName = '顶部功能栏';
                        topBarOrder.fFunctionType = 4;
                        topBarOrder.fPayType = null;
                        if(topBarData.controlInfo.fOrderDueTime && topBarData.controlInfo.fIsPurchase !== 2){//是否有到期时间
                            topBarOrder.fOrderBuy = 2;
                        }else{
                            topBarOrder.fOrderBuy = 1;
                        }
                        topBarOrder.fOrderDueTime = topBarData.controlInfo.fOrderDueTime;
                        topBarOrder.fCouponId = null;
                        topBarOrder.fCouponNumber = null;
                        topBarOrder.fCouponDiscountsPrice = null;
                        payData.functionOrderBeanList.push(topBarOrder);
                    }
                    //只需要付费右侧功能栏
                    if(parseInt(query.fControlType) === 2){
                        rightBarData = {};
                        rightBarData.type = 3;
                        rightBarData.controlInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getControlInfo,{fShopId:query.fShopId,fId:'SD002'}));
                        payData.fShopId = query.fShopId;
                        payData.fFunctionId = 'SD002';
                        payData.fFunctionName = '电子商务栏';
                        payData.fFunctionType = 3;
                        payData.fPayType = null;
                        payData.fPrice = 0;
                        payData.fCouponId = null;
                        payData.fCouponNumber = null;
                        payData.fCouponDiscountsPrice = null;
                        payData.fPayEr = null;
                        payData.functionOrderBeanList = [];
                        rightBarIndex = 0;
                        let rightBarOrder = {};
                        rightBarOrder.fShopId = query.fShopId;
                        rightBarOrder.fSiteId = query.fWebsiteId;
                        for(let i = 0; i < rightBarData.controlInfo.priceBeanList.length; i++){
                            if(rightBarData.controlInfo.priceBeanList[i].fControlHotSale === 1){
                                rightBarOrder.fOrderTimeLimit = rightBarData.controlInfo.priceBeanList[i].fType;
                                if(rightBarData.controlInfo.priceBeanList[i].fIsDiscounts){
                                    if(rightBarData.controlInfo.priceBeanList[i].fDiscountsPercent){
                                        rightBarOrder.fOrderPrice = (rightBarData.controlInfo.priceBeanList[i].fPrice * rightBarData.controlInfo.priceBeanList[i].fDiscountsPercent).toFixed(2);
                                        rightBarOrder.fDiscountsType = 2;
                                        rightBarOrder.fDiscountsPercent = rightBarData.controlInfo.priceBeanList[i].fDiscountsPercent.toFixed(2);
                                    }else{
                                        rightBarOrder.fOrderPrice = rightBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                        rightBarOrder.fDiscountsType = 1;
                                        rightBarOrder.fDiscountsPercent = null;
                                    }
                                }else{
                                    rightBarOrder.fOrderPrice = rightBarData.controlInfo.priceBeanList[i].fPrice.toFixed(2);
                                    rightBarOrder.fDiscountsType = null;
                                    rightBarOrder.fDiscountsPercent = null;
                                }
                            }
                        }
                        rightBarOrder.fFunctionId = 'SD002';
                        rightBarOrder.fFunctionName = '电子商务栏';
                        rightBarOrder.fFunctionType = 3;
                        rightBarOrder.fPayType = null;
                        if(rightBarData.controlInfo.fOrderDueTime && rightBarData.controlInfo.fIsPurchase !== 2){//是否有到期时间
                            rightBarOrder.fOrderBuy = 2;
                        }else{
                            rightBarOrder.fOrderBuy = 1;
                        }
                        rightBarOrder.fOrderDueTime = rightBarData.controlInfo.fOrderDueTime;
                        rightBarOrder.fCouponId = null;
                        rightBarOrder.fCouponNumber = null;
                        rightBarOrder.fCouponDiscountsPrice = null
                        payData.functionOrderBeanList.push(rightBarOrder);
                    }
                    //只需要付费组件
                    if(groupInfo.componentList.length > 0){
                        payData.fShopId = query.fShopId;
                        payData.fFunctionName = '组件使用';
                        payData.fFunctionType = 5;
                        payData.fPayType = null;
                        payData.fPrice = 0;
                        payData.fCouponId = null;
                        payData.fCouponNumber = null;
                        payData.fCouponDiscountsPrice = null;
                        payData.fPayEr = null;
                        payData.functionOrderBeanList = [];
                        componentData = {};
                        componentData.imgDomain = groupInfo.domainUrl;
                        componentData.componentList = groupInfo.componentList;
                        componentIndex = 0;
                        let componentOrder = {};
                        componentOrder.fShopId = query.fShopId;
                        componentOrder.fSiteId = query.fWebsiteId;
                        componentOrder.fFunctionName = '组件使用';
                        componentOrder.fOrderPrice = 0;
                        componentOrder.fFunctionType = 5;
                        componentOrder.fPayType = null;
                        componentOrder.fOrderBuy = 1;
                        componentOrder.fOrderTimeLimit  = 1;
                        componentOrder.fCouponId = null;
                        componentOrder.fCouponNumber = null;
                        componentOrder.fCouponDiscountsPrice = null;
                        componentOrder.componentDetailBeanList = [];
                        for(let i = 0; i < componentData.componentList.length; i++){
                            let smallComponentOrder = {};
                            smallComponentOrder.fShopId = query.fShopId;
                            smallComponentOrder.fSiteId = query.fWebsiteId;
                            smallComponentOrder.fComponentId = componentData.componentList[i].fId;
                            smallComponentOrder.fComponentName = componentData.componentList[i].fName;
                            smallComponentOrder.fOrderTimeLimit = 1;
                            if(componentData.componentList[i].fDiscount){
                                smallComponentOrder.fDiscountsType = 2;
                                smallComponentOrder.fDiscountsPercent = componentData.componentList[i].fDiscount.toFixed(2);
                                smallComponentOrder.fOrderPrice = (parseFloat(componentData.componentList[i].fPrice.split(",")[0])*componentData.componentList[i].fDiscount).toFixed(2);
                            }else{
                                smallComponentOrder.fDiscountsType = null;
                                smallComponentOrder.fDiscountsPercent = null;
                                smallComponentOrder.fOrderPrice = parseFloat(componentData.componentList[i].fPrice.split(",")[0]).toFixed(2);
                            }
                            componentOrder.fOrderPrice += parseFloat(smallComponentOrder.fOrderPrice);
                            smallComponentOrder.fNumber = 1;
                            smallComponentOrder.fOrderAmount = smallComponentOrder.fOrderPrice;
                            componentOrder.componentDetailBeanList.push(smallComponentOrder);
                        }
                        payData.functionOrderBeanList.push(componentOrder);
                    }
                }
            }
            return {
                pageData:{
                    templateData:templateData,
                    topBarData:topBarData,
                    rightBarData:rightBarData,
                    bottomAdvData:bottomAdvData,
                    ipData:ipData,
                    componentData:componentData
                },
                payData:payData,
                indexObj:{
                    templateIndex:templateIndex,
                    topBarIndex:topBarIndex,
                    rightBarIndex:rightBarIndex,
                    bottomAdvIndex:bottomAdvIndex,
                    componentIndex:componentIndex,
                    ipIndex:ipIndex
                }
            }
        },
        computed:{
          invoiceUrl(){
              if(this.$store.state.userBasicInfo){
                  return '/shop_web/sysconsumehistory/index?fEntrepId='+this.$store.state.userBasicInfo.currentShop.fCompanyId
              }else{
                  return '';
              }
          }
        },
        methods:{
            choosePayWay(type){
                this.payType = type;
                this.payData.fPayType = type;
                for(let i = 0; i < this.payData.functionOrderBeanList.length; i++){
                    this.payData.functionOrderBeanList[i].fPayType = type;
                }
            },
            updateTemplateDeduction(readingQuantity){
                this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateDiscountsPrice = ((this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateLastPrice - readingQuantity*2)>0?readingQuantity*2:this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateLastPrice).toFixed(2);
                this.payData.functionOrderBeanList[this.indexObj.templateIndex].fOrderPrice = (this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateLastPrice -this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateDiscountsPrice).toFixed(2);
            },
            updateTopBarInfo(obj){
                this.payData.functionOrderBeanList[this.indexObj.topBarIndex].fOrderPrice = obj.fOrderPrice.toFixed(2);
                this.payData.functionOrderBeanList[this.indexObj.topBarIndex].fOrderTimeLimit = obj.fOrderTimeLimit;
                this.payData.functionOrderBeanList[this.indexObj.topBarIndex].fDiscountsType = obj.fDiscountsType;
                this.payData.functionOrderBeanList[this.indexObj.topBarIndex].fDiscountsPercent = obj.fDiscountsPercent?obj.fDiscountsPercent.toFixed(2):obj.fDiscountsPercent;
            },
            updateRightBarInfo(obj){
                this.payData.functionOrderBeanList[this.indexObj.rightBarIndex].fOrderPrice = obj.fOrderPrice.toFixed(2);
                this.payData.functionOrderBeanList[this.indexObj.rightBarIndex].fOrderTimeLimit = obj.fOrderTimeLimit;
                this.payData.functionOrderBeanList[this.indexObj.rightBarIndex].fDiscountsType = obj.fDiscountsType;
                this.payData.functionOrderBeanList[this.indexObj.rightBarIndex].fDiscountsPercent = obj.fDiscountsPercent?obj.fDiscountsPercent.toFixed(2):obj.fDiscountsPercent;
            },
            updateBottomAdvInfo(obj){
                this.payData.functionOrderBeanList[this.indexObj.bottomAdvIndex].fOrderPrice = obj.fOrderPrice.toFixed(2);
                this.payData.functionOrderBeanList[this.indexObj.bottomAdvIndex].fOrderTimeLimit = obj.fOrderTimeLimit;
                this.payData.functionOrderBeanList[this.indexObj.bottomAdvIndex].fDiscountsType = obj.fDiscountsType;
                this.payData.functionOrderBeanList[this.indexObj.bottomAdvIndex].fDiscountsPercent = obj.fDiscountsPercent?obj.fDiscountsPercent.toFixed(2):obj.fDiscountsPercent;
            },
            updateIpInfo(obj){
                this.payData.functionOrderBeanList[this.indexObj.ipIndex].fOrderPrice = obj.fOrderPrice.toFixed(2);
                this.payData.functionOrderBeanList[this.indexObj.ipIndex].fOrderBuy = obj.fOrderBuy;
                this.payData.functionOrderBeanList[this.indexObj.ipIndex].fIpType = obj.fIpType;
                this.payData.functionOrderBeanList[this.indexObj.ipIndex].fOrderTimeLimit = obj.fOrderTimeLimit;
                this.payData.functionOrderBeanList[this.indexObj.ipIndex].fDiscountsType = obj.fDiscountsType;
                this.payData.functionOrderBeanList[this.indexObj.ipIndex].fDiscountsPercent = obj.fDiscountsPercent?obj.fDiscountsPercent.toFixed(2):obj.fDiscountsPercent;
                this.payData.functionOrderBeanList[this.indexObj.ipIndex].fIpDiscountsPrice = obj.fIpDiscountsPrice?obj.fIpDiscountsPrice.toFixed(2):obj.fIpDiscountsPrice;
                this.payData.functionOrderBeanList[this.indexObj.ipIndex].fDeductionLaterPrice = obj.fDeductionLaterPrice?obj.fDeductionLaterPrice.toFixed(2):obj.fDeductionLaterPrice;
                this.payData.fFunctionName = obj.fFunctionName;
                this.payData.functionOrderBeanList[this.indexObj.ipIndex].fFunctionName = obj.fFunctionName;
            },
            updateComponentInfo(obj){
                this.payData.functionOrderBeanList[this.indexObj.componentIndex].fOrderPrice = obj.fOrderPrice.toFixed(2);
                this.payData.functionOrderBeanList[this.indexObj.componentIndex].fOrderTimeLimit = obj.fOrderTimeLimit;
                this.payData.functionOrderBeanList[this.indexObj.componentIndex].componentDetailBeanList = obj.componentDetailBeanList;
            },
            goToPay(){
              if(parseInt(this.$route.query.type) === 2){
                  if(this.pageData.ipData.ipInfo.fCurrentIPType && this.pageData.ipData.ipInfo.fCurrentIPType !== 9){
                      if(this.payData.functionOrderBeanList[this.indexObj.ipIndex].fIpType < this.pageData.ipData.ipInfo.fCurrentIPType){
                          this.isShowIpPopup1 = true;
                      }else if(this.payData.functionOrderBeanList[this.indexObj.ipIndex].fIpType > this.pageData.ipData.ipInfo.fCurrentIPType){
                          this.isShowIpPopup = true;
                      }else{
                          this.requestPay();
                      }
                  }else{
                      this.requestPay();
                  }
              }else{
                  this.requestPay()
              }
            },
            requestPay(){
                if(!this.isCanClick){
                    return;
                }
                if(this.payType !== -1){
                    $.ajax({
                        url:this.interfaceApi.getUserBasicInfo,
                        data:{
                            fShopId:this.$route.query.fShopId
                        },
                        async:false,
                        success:(res)=>{
                            if(res.status === 3){
                                this.isShowNoAuthorityPopup = true;
                                this.isCanRequestPay = false;
                            }
                        },
                        error:(err)=>{
                            if(JSON.parse(err.responseText).status === -3){
                                window.location.href = '/denglu?url='+encodeURIComponent(window.location.href);
                            }
                        }
                    });
                    if(this.isCanRequestPay){
                        this.payData.fPayEr = this.$store.state.userBasicInfo.user.userId;
                        if(this.indexObj.templateIndex !== null){
                            //重新查一下模板分享抵扣金额
                            $.ajax({
                                url:this.interfaceApi.getReadingQuantity,
                                data:{
                                    fShopId:this.$route.query.fShopId,
                                    templateId:this.pageData.templateData.templateInfo.mapInfo[0].fId
                                },
                                type:'post',
                                async:false,
                                success:(res)=>{
                                    if(res.status === 0){
                                        this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateDiscountsPrice = ((this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateLastPrice - res.data*2)>0?res.data*2:this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateLastPrice).toFixed(2);
                                        this.payData.functionOrderBeanList[this.indexObj.templateIndex].fOrderPrice = (this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateLastPrice -this.payData.functionOrderBeanList[this.indexObj.templateIndex].fTemplateDiscountsPrice).toFixed(2);
                                    }
                                }
                            })
                        }
                        this.payData.fPrice = 0;
                        for(let j = 0; j < this.payData.functionOrderBeanList.length; j++){
                            this.payData.fPrice += parseFloat(this.payData.functionOrderBeanList[j].fOrderPrice);
                        }
                        this.payData.fPrice = this.payData.fPrice.toFixed(2);
                        this.isShowLoading = true;
                        this.isCanClick = false;
                        $.ajax({
                            url:this.interfaceApi.requestWebsitePay,
                            data:JSON.stringify(this.payData),
                            type:'post',
                            dataType:'json',
                            contentType:'application/json;charset=utf-8',
                            success:(res)=>{
                                console.log(res);
                                if(res.status === 0){
                                    this.isShowLoading = false;
                                    this.isCanClick = true;
                                    if(this.payType === 1){
                                        let obj = JSON.parse(res.data.result);
                                        $("body").prepend(obj.html);
                                    }
                                    if(this.payType ===2){
                                        let obj = JSON.parse(res.data.result);
                                        this.codeUrl = obj.code_url;
                                        this.handleWebsocket(res.data.ws,obj.out_trade_no,res.data.orderId);
                                        this.isShowCodePopup = true;
                                    }
                                }
                            }
                        })
                    }
                }
            },
            handleWebsocket(ws,outTradeNo,orderId){
                //判断当前浏览器是否支持Websocket
                let zmWebsocket;
                if ('WebSocket' in window) {
                    if(ws.indexOf("www.dev-zuma.com") !== -1){
                        ws=ws.replace("www.dev-zuma.com","192.168.0.32:8080");
                    }
                    zmWebsocket = new ReconnectingWebSocket(ws);
                }
                else {
                    alert('当前浏览器 Not support websocket')
                }
                zmWebsocket.onerror = function () {
                    console.log("WebSocket连接发生错误");
                };
                //连接成功建立的回调方法
                zmWebsocket.onopen = ()=> {
                    console.log("WebSocket连接成功");
                    let msg = {
                        "action":"create",
                        "out_trade_no":outTradeNo
                    };
                    zmWebsocket.send(JSON.stringify(msg));
                    console.log("已经发送信息");
                };
                //接收到消息的回调方法
                zmWebsocket.onmessage = (event)=> {
                    if(JSON.parse(event.data).msg === "success"){
                        zmWebsocket.close();
                        setTimeout(()=>{
                            window.location.href = `/paysuccess?fShopId=${this.$route.query.fShopId}&orderId=${orderId}`;
                        },2000);
                    }
                };
                zmWebsocket.onclose = function(evt) {
                    console.log("Connection closed.");
                }
            },
        },
        filters:{
            formatPrice(val) {
                return val.toFixed(2);
            }
        }
    }
</script>

<style  lang="less">
    body{
        background: #F5F5F5;
    }
    #wrap{
        display: flex;
        justify-content: center;
        header{
            position: fixed;
            width: 100%;
            top:0;
            left:0;
            z-index: 50;
        }
        main{
            width: 1200px;
            margin-top: 160px;
            display: flex;
            justify-content: space-between;
            padding-bottom: 50px;
            &>div:nth-child(1){
                .payBox{
                    width: 770px;
                    min-height: 485px;
                    padding-bottom: 50px;
                    background: #ffffff;
                    padding-left: 30px;
                    padding-top: 30px;
                    &>div:nth-child(1){
                        font-size: 18px;
                        color:#202020;
                    }
                    &>div:nth-child(2){
                        margin-top: 15px;
                        font-size: 14px;
                        color:#909090;
                        &>a{
                            color:#3C9AEA;
                            text-decoration: underline;
                        }
                    }
                    &>div:nth-child(3){
                        display: flex;
                        align-items: center;
                        margin-top: 15px;
                        &>div:nth-child(1){
                            width: 130px;
                            height:50px;
                            border: 1px solid #CCCCCC;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            cursor: pointer;
                            &>img:nth-child(1){
                                width: 100px;
                                height:37px;
                            }
                            &>div:nth-child(2){
                                position: absolute;
                                width: 130px;
                                height:50px;
                                border: 2px solid #3E9BE9;
                                top:0;
                                left:0;
                                z-index: 5;
                                &>img{
                                    position: absolute;
                                    width:25px;
                                    height:25px;
                                    bottom:0;
                                    right:0;
                                }
                            }
                        }
                        &>div:nth-child(2){
                            width: 130px;
                            height:50px;
                            border: 1px solid #CCCCCC;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            margin-left: 20px;
                            cursor: pointer;
                            &>img:nth-child(1){
                                width: 104px;
                                height:35px;
                            }
                            &>div:nth-child(2){
                                position: absolute;
                                width: 130px;
                                height:50px;
                                border: 2px solid #3E9BE9;
                                top:0;
                                left:0;
                                z-index: 5;
                                &>img{
                                    position: absolute;
                                    width:25px;
                                    height:25px;
                                    bottom:0;
                                    right:0;
                                }
                            }
                        }
                    }
                    .couponBox{
                        margin-top: 28px;
                        width: 710px;
                        &>div:nth-child(1){
                            font-size: 18px;
                            color:#202020;
                        }
                    }
                    &>div:nth-child(5){
                        width:180px;
                        height:50px;
                        position: relative;
                        margin-top: 30px;
                        background:#CCCCCC;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color:#ffffff;
                        font-size: 22px;
                        cursor: not-allowed;
                        &.active{
                            background: #3E9BE9;
                            cursor:pointer;
                        }
                    }
                }
            }
        }
    }
</style>