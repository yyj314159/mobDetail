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
                keyword:"",
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
                keyword:"",
                //新闻类型
                fNewsType:null,
                //新闻类目id
                fFristZumaItemId:null,
                //主体Id
                fEntrepId:null
            };
            let newsBigCategory = await requestUtil.getData(interfaceApi.getNewsCategory,null).then((res)=>{
                if(res.data){
                    return res.data;
                }
            });
            let DataList = requestUtil.validateData(await requestUtil.getData(interfaceApi.getNewsList,newsobj));
            return {
                pageData:{
                    DataList:DataList,
                    newsBigCategory:newsBigCategory,
                    blogobj:blogobj,
                    newsobj:newsobj,
                    type:2,
                    titleType:2
                },
                objData:{
                    module:'zixun',
                    placeholder:'搜资讯',
                    searchWord:" "
                }
            }
        },
        head(){
            return{
                'title':'资讯-找资讯-族蚂资讯zuma.com',
                meta:[
                    {  name: 'description', content: '族蚂资讯,汇集生活、时尚、育儿、旅游、娱乐八卦、体育赛事、资讯等各大类型新闻资讯,关注社会生活。创建个人的站点博客,搭建自己的博客页面,分享生活,发表态度,制作自己的网络日志,发布图文视频,展现自我。' },
                    {name:'keywords',content:'生活资讯,时尚资讯,网络日志,行业资讯,个人博客,新闻资讯,新闻热点,'},
                ]
            }
        },
        mounted(){
            BrowserMatch.init("home-资讯");
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
