<template>
    <div id="wrap">
        <header>
            <businessFunctionMenu></businessFunctionMenu>
            <head1 :obj="objData"></head1>
        </header>
        <main>
            <information :pageData="pageData"></information>
        </main>
        <footer>
            <foot></foot>
        </footer>
    </div>
</template>
<script>
    import information from '~/components/information/information';
    import requestUtil from '~/common/requestUtil';
    import interfaceApi from '~/common/interfaceApi';
    import BrowserMatch from '~/common/operationLog';
    import businessFunctionMenu from '~/components/public/head/businessFunctionsMenu';
    import head1 from '~/components/public/head/head1';
    import foot from '~/components/public/foot/foot1';
    export default {
        components:{
            information,
            businessFunctionMenu,
            head1,
            foot
        },
        async asyncData(){
            let blogobj = {
                //当前页
                pageNow:1,
                //每页条数
                pageSize:12,
                //搜索词
                keyword:null,
                //博客类型   1文本/18视频/6图片
                fBlogType:null,
                //主体Id
                fEntrepId:null
            };
            let newsobj={
                //当前页
                pageNow:1,
                //每页条数
                pageSize:12,
                //搜索词
                keyword:null,
                //新闻类型
                fNewsType:null,
                //新闻类目id
                fFristZumaItemId:null,
                //主体Id
                fEntrepId:null
            };
            let bolgLabs = await requestUtil.getData(interfaceApi.getBlogCategory,null).then((res)=>{
                if(res.data){
                    return res.data;
                }
            });
            let DataList = requestUtil.validateData(await requestUtil.getData(interfaceApi.getBlogList,blogobj));
            return {
                pageData:{
                    DataList:DataList,
                    bolgLabs:bolgLabs,
                    blogobj:blogobj,
                    newsobj:newsobj,
                    type:1,
                    titleType:1
                },
                objData:{
                    module:'wenzhang',
                    placeholder:'搜文章',
                    searchWord:null
                }
            }
        },
        head(){
            return{
                'title':'博客-网络日志,个人博客-族蚂博客zuma.com',
                meta:[
                    { hid: 'description', name: 'description', content: '来族蚂网创建个人的站点博客,装修自己的博客页面,分享生活,发表态度,制作自己的网络日志,发布体育赛事,热点,科技,娱乐,图文视频,展现自我。' },
                    {hid:'keywords',name:'keywords',content:'个人博客网站,网络日志,时尚资讯,个人博客模板,个人博客,'},
                ]
            }
        },
        mounted(){
            BrowserMatch.init("home-文章");
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
