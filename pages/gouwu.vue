<template>
    <div id="wrap">
        <header>
            <businessFunctionMenu></businessFunctionMenu>
            <head1 :obj="objData"></head1>
        </header>
        <main>
            <product :pageData="pageData"></product>
        </main>
        <footer>
            <foot></foot>
        </footer>
    </div>
</template>
<script>
    import product from '~/components/product/product';
    import requestUtil from '~/common/requestUtil';
    import interfaceApi from '~/common/interfaceApi';
    import BrowserMatch from '~/common/operationLog';
    import businessFunctionMenu from '~/components/public/head/businessFunctionsMenu';
    import head1 from '~/components/public/head/head1';
    import foot from '~/components/public/foot/foot1';
    export default {
        components:{
            product,
            businessFunctionMenu,
            head1,
            foot
        },
        async asyncData(){
            let productObj = {
                pageNow: 1, //当前页
                pageSize: 60, // 每页条数
                keyWord: null, //搜索词
                priceType: null, //价格类型
                productType: null, //产品类型
                productPayMent: null, //付款方式
                placeOrigin: null, //所在地
                fEntrepId: null, //主体id
                categoryId:null//类目id
            };
            let productList = requestUtil.validateData(await requestUtil.getData(interfaceApi.getProductList,productObj));
            return {
                pageData:{
                    productList:productList,
                    obj:productObj
                },
                objData:{
                    module:'gouwu',
                    placeholder:'搜商品',
                    searchWord:null
                }
            }
        },
        head(){
            return{
                'title':'在线购物-支持：服装、家居、数码、母婴等商品交易-族蚂商城zuma.com',
                meta:[
                    {  name: 'description', content: '族蚂商城是一家多行业、综合性的在线商城,为您提供免费上传产品和服务,族蚂商城囊括了服装,美妆,食品、电器、电子,箱包等产品类型的在线交易,支持微信、支付宝、银联的支付方式,提供在线砍价、议价等功能。' },
                    {name:'keywords',content:'族蚂商城,网上购物平台,在线商城,二手交易,交易平台,服装,美妆,家电,数码,电子产品,零食,玩具,器材,电子商务平台,网上购物,'},
                ]
            }
        },
        mounted(){
            BrowserMatch.init("home-产品");
        },
        scrollToTop:true,
    }

</script>
<style lang="less" scoped>
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
            padding-top: 120px;
        }
    }
</style>
