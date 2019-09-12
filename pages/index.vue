<template>
    <div class="index">
        <zmHeader :changeTheme='changeTheme' :jzDomain="pageData.jzDomain" />
        <main>
            <banner/>
            <scheme ref='scheme' :isShowNum1='isShowNum1'/>
            <func/>
            <info/>
            <model :pageData='pageData'/>
            <about ref='about' :isShowNum2='isShowNum2'/>
            <help :helpList="pageData.helpList"/>
        </main>
        <zmFooter/>
        <websitePopup v-if="popupConfig.isShow && popupConfig.type === 'website'" />
        <entrepPopup v-if="popupConfig.isShow && popupConfig.type === 'entrep'"></entrepPopup>
        <consult></consult>
        <consult2></consult2>
        <upgradeTip v-if="isShowUpgradeTip"></upgradeTip>
    </div>
</template>

<script>
    import requestUtil from '~/common/requestUtil'
    import interfaceApi from '~/common/interfaceApi'
    import zmHeader from '~/components/index/zmHeader'
    import banner from '~/components/index/banner'
    import scheme from '~/components/index/scheme'
    import func from '~/components/index/func'
    import info from '~/components/index/info'
    import model from '~/components/index/model'
    import about from '~/components/index/about'
    import help from '~/components/index/help'
    import zmFooter from '~/components/index/zmFooter'
    import BrowserMatch from '~/common/operationLog';
    import websitePopup from '~/components/public/dialog/websitePopup';
    import entrepPopup from '~/components/public/dialog/entrepPopup';
    import consult from '~/components/public/consult';
    import consult2 from '~/components/public/consult2';
    import upgradeTip from '~/components/public/dialog/upgradeTip';
    import publicUtil from '~/common/publicUtil';

    export default {
        components: {
            zmHeader,
            banner,
            scheme,
            func,
            info,
            about,
            model,
            help,
            zmFooter,
            websitePopup,
            entrepPopup,
            consult,
            consult2,
            upgradeTip
        },
        async asyncData() {
            let list = null;
            let obj = {
                iDisplayStart: 0,
                iDisplayLength: 40,
                fIsTrash: 0,
                fStatus: 5
            };
            list = await requestUtil.getData(interfaceApi.getWebTemplate, obj).then((res) => res.data.data);
            let helpList = requestUtil.validateData(await requestUtil.getData(interfaceApi.getIndexHelpList, null));
            let domain = requestUtil.validateData(await requestUtil.getData('/shop_web/shopInfo/getCurrentDomain', null));
            let jzDomain = null;
            if (domain.rootPath.indexOf(".dev-") !== -1) {
                jzDomain = "http://jz.dev-zuma.com";
            } else if (domain.rootPath.indexOf(".pre-") !== -1) {
                jzDomain = "http://jz.pre-zuma.com";
            } else {
                jzDomain = "https://jz.zuma.com";
            }

            return {
                pageData: {
                    list: list,
                    jzDomain: jzDomain,
                    helpList:helpList
                }
            }
        },
        head() {
            return {
                'title': '族蚂网_世界因你而不同_互联网一站式解决方案',
                meta: [
                    {name: 'keywords', content: '小程序，网站建设，公众号助手，营销工具，微传单，电子名片，全网营销，精美模板，族蚂商城，企业营销，H5网页制作，小程序开发'},
                    {
                        name: 'description',
                        content: '世界因你而不同，专注互联网开发/快速孵化小程序/拥抱微信生态，提供互联网一站式解决方案，搭建响应式网站，公众号外挂H5页面，提供SEO优化工具、在线下单系统、聚合支付、公众号助手工具、电子名片、小程序，完整全网营销多维度传播_用全网营销工具，就上族蚂网！'
                    },
                ]
            }
        },

        data() {
            return {
                //头部菜单主题切换
                changeTheme: false,
                isShowNum1: false,
                isShowNum2: false,
                isShowUpgradeTip:false,//是否显示升级弹窗提示
            }
        },
        computed:{
            //弹窗的配置项
            popupConfig(){
                return this.$store.state.popupConfig;
            },
        },
        methods: {
            handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let h = document.documentElement.clientHeight || document.body.clientHeight;
                if (scrollTop > 98) {
                    this.changeTheme = true;
                } else {
                    this.changeTheme = false;
                }
                if ((h + scrollTop - this.$refs.scheme.topValue) > 0) {
                    this.isShowNum1 = true;
                }

                if ((h + scrollTop - this.$refs.about.topValue) > 0) {
                    this.isShowNum2 = true;
                }
            },
        },
        mounted() {
            if(!publicUtil.getCookie('isShowUpgradeTip')){
                this.isShowUpgradeTip = true;
                publicUtil.setCookie('isShowUpgradeTip',1);
            }
            window.addEventListener('scroll', this.handleScroll)
            if (this.$route.query && this.$route.query.zmfrom) {
                publicUtil.setCookie("zmfrom", this.$route.query.zmfrom,30);
            }
            if (this.$route.query && this.$route.query.bd_vid) {
                publicUtil.setCookie("bd_vid", this.$route.query.bd_vid,30);
            }
            BrowserMatch.init("home-首页");
        },
        scrollToTop: true,
    }
</script>

<style scoped>
    .index {
        background: #ffffff;
        overflow-x: hidden;
    }
</style>