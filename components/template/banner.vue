<template>
    <div class="icontent">
        <div style="margin-top:20px" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @touchstart="onMouseEnter"
             @touchend="onMouseLeave" @click="showPop($event)">
            <div class="swiper-container zm_bannerWrap swiper-container-initialized swiper-container-vertical"
                 v-swiper:swiper="swiperOption" ref="mySwiper">
                <div class="swiper-wrapper">
                    <div class="zm_banner_wrap zm_banner_wrap1 swiper-slide"
                         style="background-image:url(/images/banner/homePage1_01.png);background-repeat:no-repeat;background-position-x:left">
                        <div class="zm_banner_blank hide"></div>
                        <div class="banner_bg"
                             style="background-image:url(/images/banner/homePage1_02.png);background-repeat:no-repeat;background-size:auto 200px;background-position-y:bottom">
                            <div class="banner_word">
                                <h1>海量免费网站模板任你选！</h1>
                                <p>用族蚂网建设你自己的互联网交易平台，万余种行业类目，数十万种交易流程搭配，千余种精美组件任您选择！</p>
                                <div>入驻建站</div>
                            </div>
                        </div>
                        <div class="banner_blank hide"></div>
                    </div>
                    <div class="zm_banner_wrap zm_banner_wrap2 swiper-slide"
                         style="background-image:url(/images/banner/homePage2_01.png);background-repeat:no-repeat">
                        <div class="zm_banner_blank hide"></div>
                        <div class="banner_bg"
                             style="background-image:url(/images/banner/homePage2_02.png);background-repeat:no-repeat;background-size:auto 200px;background-position-y:bottom;background-position-x:right">
                            <div class="banner_word">
                                <h1>全行业覆盖式电子商务交易平台！</h1>
                                <p>强大的商品发布功能，丰富的线上、线下交易流程，全平台用户共享，迅速获得百万注册用户！</p>
                                <div>入驻建站</div>
                            </div>
                        </div>
                        <div class="banner_blank hide"></div>
                    </div>
                    <div class="zm_banner_wrap zm_banner_wrap3 swiper-slide"
                         style="background-image:url(/images/banner/homePage3_01.png);background-repeat:no-repeat">
                        <div class="zm_banner_blank hide"></div>
                        <div class="banner_bg"
                             style="background-image:url(/images/banner/homePage3_02.png);background-repeat:no-repeat;background-size:auto 200px;background-position-y:bottom;background-position-x:right">
                            <div class="banner_word">
                                <h1>您的网站还不能在线交易？</h1>
                                <p>族蚂网支持产品、服务万余种类目在线交易及打赏功能，一次建站，打通交付闭环！</p>
                                <div>入驻建站</div>
                            </div>
                        </div>
                        <div class="banner_blank hide"></div>
                    </div>
                </div>
                <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"
                     slot="pagination"></div>
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
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: true,//是否禁止autoplay。默认为true：停止。
                    },
                    initialSlide: 0,
                    observeParents: true,//在父组件或者自身发生变化的时候，swiper组件自动会刷新一次。
                    observer: true,
                    speed: 500,
                    direction: 'vertical',
                    spaceBetween: 0,//每个滑块距之间的距离
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,// 设置点击可切换
                    },
                },
            }
        },
        methods: {
            showPop(e) {
                if ($(e.target).closest(".swiper-pagination-bullet").length === 0) {
                    this.$store.commit('requestLoginInfo', {
                        noLoginCallBack: () => {
                            window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
                        },
                        loginCallBack: () => {
                            this.$store.commit("changePopupConfig",{
                                isShow:true,
                                module:1,//进入编辑器或者进入模板选择页
                                type:'website'
                            })
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
            mySwiper() {
                // mySwiper 是要绑定到标签中的ref属性
                return this.$refs.mySwiper.swiper;
            },
        },
    };
</script>
<style lang="less" scoped>
    @import '../../assets/css/banner';
</style>

