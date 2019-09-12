<template>
    <div id="wrap">
        <icpLunbo :style="{top:topValue+'px'}"></icpLunbo>
        <header :style="{top:(0+topValue+26)+'px'}">
            <businessFunctionMenu></businessFunctionMenu>
            <head1 :obj="objData"></head1>
        </header>
        <main :style="{top:(120+topValue+26)+'px'}">
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
    import icpLunbo from '~/components/public/ICPLunBo';

    export default {
        components: {
            website,
            businessFunctionMenu,
            head1,
            foot,
            icpLunbo
        },
        data() {
            return {
                topValue: -26,
            }
        },
        async asyncData() {
            let obj = {
                pageNow: 1, //页码
                pageSize: 60, //页长度
                keyWord: null,
                fLargeCategoryName: null,
                fSmallCategoryName: null,
                fAmount: null,
                hot: null
            };
            let templateBigCategoryId = null;
            let templateSmallCategoryId = null;
            let templateSmallCategory = [];
            let templateList = requestUtil.validateData(await requestUtil.getData(interfaceApi.getTemplateList, obj));
            let templateBigCategory = requestUtil.validateData(await requestUtil.getData(interfaceApi.getTemplateBigCategory, null));
            return {
                pageData: {
                    templateList: templateList,
                    templateBigCategory: templateBigCategory,
                    templateSmallCategory:templateSmallCategory,
                    obj: obj,
                    templateBigCategoryId:templateBigCategoryId,
                    templateSmallCategoryId:templateSmallCategoryId,
                    templateBigCategoryName:templateBigCategoryId?bigCategoryNameObj[templateBigCategoryId]:'模板大类',
                    templateSmallCategoryName:templateSmallCategoryId?smallCategoryNameObj[templateSmallCategoryId]:'模板小类'
                },
                objData: {
                    module: 'muban',
                    placeholder: '搜模板',
                    searchWord:null
                }
            };
        },
        head() {
            return {
                'title': '免费建站  网站建设 自助建站  免费网站  免费模板-族蚂建站zuma.com',
                meta: [
                    {
                        name: 'description',
                        content: '族蚂建站用户无需懂技术代码,无需租用服务器和存储空间,只需要了解和掌握基础的电脑知识,即可以通过简单的拖拽、编辑和设置功能设计属于自己的网站、网页并实现一键式在线发布,并且族蚂网为建站用户提供了大量的免费网站模板供“懒汉”用户使用。'
                    },
                    { name: 'keywords', content: 'zuma建站,模板建站,快速建站,企业建站,免费建站,自助建站,商城网站建设,网站建设,'},
                ]
            };
        },
        mounted() {
            BrowserMatch.init("home-模板");
        },
        scrollToTop: true,
        computed: {
            websiteList() {
                if(this.$store.state.userBasicInfo){
                    return this.$store.state.userBasicInfo.shopList;
                }else{
                    return [];
                }
            }
        },
        watch: {
            websiteList(val){
                this.topValue = -26;
                if(val.length > 0){
                    for(let i = 0; i < val.length; i++){
                        if(val[i].fIcpStatus != undefined){
                            this.topValue = 0;
                            break;
                        }
                    }
                }
            }
        },
    }

</script>
<style lang="less" scoped>
    #wrap {
        min-width: 1260px;
        header {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 150;
            width: 100%;
            transition: top 0.5s;
        }
        main {
            width: 100%;
            padding-top: 120px;
            transition: top 0.5s;
        }
    }
</style>
