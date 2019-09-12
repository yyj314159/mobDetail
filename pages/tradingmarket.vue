<template>
    <div id="wrap">
        <header>
            <head3></head3>
        </header>
        <main>
            <controlMarket :pageData="pageData"></controlMarket>
        </main>
        <footer>
            <div>
                <div>
                    <div>按需购买，让您的网站性能更强大！</div>
                    <div>
                        <div>请通过族蚂建站平台购买、完成组件及服务续费。</div>
                        <div>组件、族蚂服务提供不同时长周期套餐，满足您的建站需求！</div>
                    </div>
                </div>
            </div>
            <foot></foot>
        </footer>
    </div>
</template>

<script>
    import head3 from '~/components/public/head/head3';
    import foot from '~/components/public/foot/foot2';
    import controlMarket from '~/components/purchase/controlMarket';
    import requestUtil from '~/common/requestUtil';
    import interfaceApi from '~/common/interfaceApi';
    export default {
        components:{
            head3,
            foot,
            controlMarket
        },
        async asyncData({app,query}){
            let controlList = requestUtil.validateData(await requestUtil.getData(interfaceApi.getControlList,{fShopId:query.fShopId}));
            let ipData = requestUtil.validateData(await requestUtil.getData(interfaceApi.getIPData,{fShopId:query.fShopId}));
            return{
                pageData:{
                    controlList:controlList,
                    fShopId:query.fShopId,
                    ipData:ipData
                }
            }
        },
        scrollToTop:true,
        head(){
            return{
                title:'控件及增值服务交易市场-族蚂网',
                meta:[

                ]
            }
        },
    }
</script>

<style scoped lang="less">
    #wrap{
        background: #ffffff;
        header{
            position: fixed;
            width: 100%;
            top:0;
            left:0;
            z-index: 50;
        }
        main{
            padding-top: 100px;
        }
        footer{
            &>div:nth-child(1){
                margin-top: 80px;
                background: #3D9BE9;
                width: 100%;
                height:300px;
                &>div{
                    width: 100%;
                    max-width: 1200px;
                    min-width: 768px;
                    margin: 0 auto;
                    &>div:nth-child(1){
                        font-size: 40px;
                        font-weight: bold;
                        color:#ffffff;
                        padding: 60px 0;
                    }
                    &>div:nth-child(2){
                        font-size: 16px;
                        color:#ffffff;
                        line-height: 28px;
                    }
                }
            }
        }
    }
</style>