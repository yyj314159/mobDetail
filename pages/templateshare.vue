<template>
    <div id="wrap">
        <header>
            <head3></head3>
        </header>
        <main>
            <templateShare :pageData="pageData"></templateShare>
        </main>
        <footer>
            <foot2></foot2>
        </footer>
    </div>
</template>

<script>
    import head3 from '~/components/public/head/head3';
    import foot2 from '~/components/public/foot/foot2';
    import requestUtil from '~/common/requestUtil';
    import interfaceApi from '~/common/interfaceApi';
    import templateShare from '~/components/purchase/website/templateShare';
    export default {
        components:{
            head3,
            foot2,
            templateShare
        },
        async asyncData({app,query}){
            let templateInfo = requestUtil.validateData(await requestUtil.getData(interfaceApi.getTemplateInfo,{fTemplateId:query.fTemplateId}));
            let readingQuantity = requestUtil.validateData(await requestUtil.getData(interfaceApi.getReadingQuantity,{fShopId:query.fShopId,templateId:query.fTemplateId}));
            return{
                pageData:{
                    templateInfo:templateInfo,
                    readingQuantity:readingQuantity
                }
            }
        },
        head(){
            return{
                title:'精美模板分享-族蚂网',
                script:[{src:'/qrcode.min.js'}],
                meta:[

                    ]
            }
        },
        scrollTop:true
    }
</script>

<style  lang="less">
    body{
        background: rgba(61,155,233,0.05);
    }
    #wrap{
        header{
            position: fixed;
            width: 100%;
            top:0;
            left:0;
            z-index: 50;
        }
        main{
            padding-top:100px;
        }
        footer{
            margin-top: 30px;
        }
    }
</style>