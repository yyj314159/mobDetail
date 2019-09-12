<template>
    <div id="wrap">
        <header>
            <businessFunctionMenu></businessFunctionMenu>
            <head1 :obj="objData"></head1>
        </header>
        <main>
            <website :pageData="pageData"></website>
        </main>
        <footer>
            <foot></foot>
        </footer>
    </div>
</template>
<script>
    import website from '~/components/template/website';
    import requestUtil from '~/common/requestUtil';
    import interfaceApi from '~/common/interfaceApi';
    import BrowserMatch from '~/common/operationLog';
    import businessFunctionMenu from '~/components/public/head/businessFunctionsMenu';
    import head1 from '~/components/public/head/head1';
    import foot from '~/components/public/foot/foot1';
    export default {
        components:{
            website,
            businessFunctionMenu,
            head1,
            foot
        },
        async asyncData({params}){
            let obj={
                pageNow: 1, //页码
                pageSize: 60, //页长度
                keyWord:null,
                fLargeCategoryName: null,
                fSmallCategoryName: null,
                fAmount:null,
                hot:null,
                fShopId:null
            };
            obj.keyWord = params.param.split("_")[0];
            let templateList = requestUtil.validateData(await requestUtil.getData(interfaceApi.getTemplateList,obj));
            let templateBigCategory = requestUtil.validateData(await requestUtil.getData(interfaceApi.getTemplateBigCategory,null));
            return {
                pageData:{
                    templateList:templateList,
                    templateBigCategory:templateBigCategory,
                    obj:obj
                },
                objData:{
                    module:'muban',
                    placeholder:'搜模板',
                    searchWord:obj.keyWord
                }
            };
        },
        head(){
            return{
                'title':this.pageData.obj.keyWord+'-网站搭建-族蚂建站zuma.com',
                meta:[
                    {  name: 'description', content: '族蚂建站是一家免费建站的平台,在线创建站点,即可免费领取域名和空间。其中一站式建站、拖拽式建站等功能为许多不懂技术的小白、中小型企业提供更方便的操作和更优质服务。自主设计网页布局,各类组件的使用,也可也让网站更具个人特色,搭建属于自己的网站。' },
                    {name:'keywords',content:'zuma建站,模板建站,快速建站,企业建站,免费建站,自助建站,商城网站建设,网站建设,'},
                ]
            }
        },
        mounted(){
            BrowserMatch.init("home-模板");
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
