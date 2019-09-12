<template>
    <div id="wrap">
        <header>
            <head3></head3>
        </header>
        <main>
            <paySuccess :orderInfo="orderInfo"></paySuccess>
        </main>
    </div>
</template>

<script>
    import paySuccess from '~/components/purchase/website/paySuccess';
    import head3 from '~/components/public/head/head3';
    import requestUtil from '~/common/requestUtil';
    import interfaceApi from '~/common/interfaceApi';
    export default {
        components:{
            paySuccess,
            head3
        },
        head(){
            return{
                title:'支付成功-族蚂网',
                meta:[

                ]
            }
        },
        async asyncData({app,query}){
            let orderInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getOrderInfo,{fId:query.orderId}));
            console.log(orderInfo.functionOrderBeanList[0]);
            return{
                orderInfo:orderInfo
            }
        }
    }
</script>

<style lang="less">
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
        }
    }
</style>