<template>
    <div class="icontent">
        <div style="margin-top:20px" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @touchstart="onMouseEnter" @touchend="onMouseLeave" @click="showPop($event)">
            <div  class="swiper-container zm_bannerWrap swiper-container-initialized swiper-container-vertical"
                  v-swiper:swiper="swiperOption"  ref="mySwiper">
                <div class="swiper-wrapper">
                    <div class="zm_banner_wrap zm_banner_wrap1 swiper-slide"
                         style="background-image:url(/images/banner/blog1_01.png);background-repeat:no-repeat;background-position-x:left">
                        <div class="zm_banner_blank hide"></div>
                        <div class="banner_bg"
                             style="background-image:url( /images/banner/blog1_02.png);background-repeat:no-repeat;background-size:auto 200px;background-position-y:bottom">
                            <div class="banner_word">
                                <h1>快速发布文章，展现您的文采！</h1>
                                <p>记录你自己的网络日志，展示个人文集，分享文章，展现自我！</p>
                                <div>发布文章</div>
                            </div>
                        </div>
                        <div class="banner_blank hide"></div>
                    </div>
                    <div class="zm_banner_wrap zm_banner_wrap2 swiper-slide"
                         style="background-image:url(/images/banner/blog2_01.png);background-repeat:no-repeat">
                        <div class="zm_banner_blank hide"></div>
                        <div class="banner_bg"
                             style="background-image:url(/images/banner/blog2_02.png);background-repeat:no-repeat;background-size:auto 200px;background-position-y:bottom;background-position-x:right">
                            <div class="banner_word">
                                <h1>强大的流量入口助力自媒体推广</h1>
                                <p>24小时最新资讯轮播， 支持企业及行业动态、娱乐报道、文化播报、健康知识、体育快讯的发布</p>
                                <div>发布资讯</div>
                            </div>
                        </div>
                        <div class="banner_blank hide"></div>
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" slot="pagination"></div>
                <span class="swiper-notification"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                swiperOption: {
                    loop:true,
                    autoplay:{
                        delay:3000,
                        disableOnInteraction: true,//是否禁止autoplay。默认为true：停止。
                    },
                    initialSlide: 0,
                    observeParents: true,//在父组件或者自身发生变化的时候，swiper组件自动会刷新一次。
                    observer: true,
                    speed:500,
                    direction: 'vertical',
                    spaceBetween : 0,//每个滑块距之间的距离
                    pagination: {
                        el:'.swiper-pagination',
                        clickable :true,// 设置点击可切换
                    },
                },
            }
        },
        methods: {
            showPop(e){
                if($(e.target).closest(".swiper-pagination-bullet").length === 0){
                    this.$store.commit('requestLoginInfo',{
                        noLoginCallBack:()=>{
                            window.location.href = '/denglu?url='+encodeURIComponent(window.location.href);
                        },
                        loginCallBack:()=>{
                            if($(e.target).closest(".swiper-slide").attr("data-swiper-slide-index") === '0'){
                                this.$store.commit("changePopupConfig",{
                                    isShow:true,
                                    module:9,
                                    type:'entrep'
                                })
                            }else if($(e.target).closest(".swiper-slide").attr("data-swiper-slide-index") === '1'){
                                this.$store.commit("changePopupConfig",{
                                    isShow:true,
                                    module:8,
                                    type:'entrep'
                                })
                            }
                        }
                    })
                }
            },
            //通过获得的swiper对象来暂停自动播放
            onMouseEnter() {
                this.mySwiper.autoplay.stop();
            },
            onMouseLeave() {
                this.mySwiper.autoplay.start();
            }
        },
        computed: {
            mySwiper(){
                // mySwiper 是要绑定到标签中的ref属性
                return this.$refs.mySwiper.swiper;
            },
        },
    };
</script>
<style  lang="less" scoped>
    @import '../../assets/css/banner';
</style>

