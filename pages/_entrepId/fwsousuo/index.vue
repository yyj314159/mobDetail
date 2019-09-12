<template>
    <div id="wrap">
        <header>
            <businessFunctionMenu></businessFunctionMenu>
            <head2 :obj="objData"></head2>
        </header>
        <main>
            <server :pageData="pageData"></server>
        </main>
        <footer>
            <foot></foot>
        </footer>
    </div>
</template>

<script>
    import server from '~/components/server/server';
    import requestUtil from '~/common/requestUtil';
    import interfaceApi from '~/common/interfaceApi';
    import BrowserMatch from '~/common/operationLog';
    import businessFunctionMenu from '~/components/public/head/businessFunctionsMenu';
    import foot from '~/components/public/foot/foot1';
    import head2 from '~/components/public/head/head2';
    export default {
        components:{
            server,
            businessFunctionMenu,
            foot,
            head2
        },
        async asyncData({app,params}){
            let serverObj = {
                pageNow:1,//当前页
                pageSize:60,// 每页条数
                keyword:"",//搜索词
                priceSort:null,//价格排序 1由低到高,2由高到底,3定制价格
                isOpenPrice:null,//是否议价 0:一口价，1:接受议价
                payType:null,//付款方式 0一次性，1分阶段，2分时段
                takeType:null,//1分钟，2小时，3按天，4按月
                serviceType:null,//(服务方式)1上门服务，2到店服务，3线上服务，4电话服务，5代办服务，
                serviceShopAddress:null,//(地址字符串">"隔开)
                fEntrepId: null,
            };
            serverObj.fEntrepId = parseInt(params.entrepId);
            let serverList = requestUtil.validateData(await requestUtil.getData(interfaceApi.getServerList,serverObj));
            return {
                pageData:{
                    serverList:serverList,
                    obj:serverObj
                },
                objData:{
                    module:'fuwu',
                    placeholder:'搜服务',
                    searchWord:" ",
                }
            }
        },
        head(){
            return{
                'title':'全部服务-'+this.$store.state.shopName+'-族蚂商城zuma.com',
                meta:[
                    { hid: 'description', name: 'description', content: '族蚂商城为您提供了餐饮、住宿、保洁、搬家、租房、租车、婚庆、洗车等多种服务类型,支持微信、支付宝、银联的在线支付方式。品类丰富,安全快捷,满足不同用户的各种服务需求。' },
                    {hid:'keywords',name:'keywords',content:'上海生活服务,休闲娱乐,设备租赁,生活服务,保姆,保洁服务,婚庆,房屋装修,家政服务,'},
                    {hid:'viewport',name:'viewport',content: 'width=1260px,user-scalable=no' }
                ]
            }
        },
        mounted(){
            BrowserMatch.init("home-服务");
        },
        scrollToTop:true,
    }
</script>

<style scoped lang="less">
    #wrap{
        min-width: 1260px;
        header{
            position: fixed;
            top:0;
            left:0;
            z-index: 150;
            width: 100%;
        }
        main{
            width: 100%;
            height:100%;
            padding-top: 120px;
        }
    }
</style>