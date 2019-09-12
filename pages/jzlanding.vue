<template>
    <jz :domainObj="domainObj"></jz>
</template>

<script>
    import jz from "~/components/landingPage/jz/jz";
    import publicUtil from "~/common/publicUtil";
    import requestUtil from '~/common/requestUtil'
    export default {
        components:{
            jz
        },
        head(){
            return{
                title:'免费建站,网站模板,自助建站,网页模板,网站建设-族蚂网站建设zuma.com',
                meta:[
                    {
                        name: 'description',
                        content: '族蚂网免费自助建站系统,为个人和中小企业网站建设提供免费建站平台,设计制作优质的网站模板,打造简易的模板建站流程,使用"拖拽式"建站方式,让不懂技术的建站小白也能自助搭建网站。'
                    },
                    {
                        name: 'keywords',
                        content: '免费建站,免费自助建站,网站模板,网站建设,模板建站,网站制作,免费建站系统,网页模板,'
                    }
                ],
                script:[{src:'/qrcode.min.js'}]
            }
        },
        async asyncData(){
            let domain = requestUtil.validateData(await requestUtil.getData('/shop_web/shopInfo/getCurrentDomain', null));
            let domainObj = {};
            if (domain.rootPath.indexOf(".dev-") !== -1) {
                domainObj.jzDomain = "http://jz.dev-zuma.com";
                domainObj.wwwDomain = "http://www.dev-zuma.com";
            } else if (domain.rootPath.indexOf(".pre-") !== -1) {
                domainObj.jzDomain = "https://jz.pre-zuma.com";
                domainObj.wwwDomain = "https://www.pre-zuma.com";
            } else {
                domainObj.jzDomain = "https://jz.zuma.com";
                domainObj.wwwDomain = "https://www.zuma.com";
            }
            return {
                domainObj:domainObj
            }
        },
        mounted(){
            if(this.$route.query && this.$route.query.zmfrom){
                publicUtil.setCookie("zmfrom",this.$route.query.zmfrom,30);
            }
            if(this.$route.query && this.$route.query.bd_vid){
                publicUtil.setCookie("bd_vid",this.$route.query.bd_vid,30);
            }
        },
        scrollToTop:true,
    }
</script>

<style scoped>

</style>