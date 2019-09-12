<template>
    <div class="icontent">
        <div style="margin-top:20px" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @touchstart="onMouseEnter"
             @touchend="onMouseLeave" @click="showPop($event)">
            <div class="swiper-container zm_bannerWrap swiper-container-initialized swiper-container-vertical"
                 v-swiper:swiper="swiperOption" ref="mySwiper">
                <div class="swiper-wrapper">
                    <div class="zm_banner_wrap zm_banner_wrap1 swiper-slide"
                         style="background-image:url(/images/banner/server_01.png);background-repeat:no-repeat;background-position-x:left">
                        <div class="zm_banner_blank hide"></div>
                        <div class="banner_bg"
                             style="background-image:url( /images/banner/server_02.png);background-repeat:no-repeat;background-size:auto 200px;background-position-y:bottom">
                            <div class="banner_word">
                                <h1>发布您自己的服务！</h1>
                                <p>在线O2O交易，52万种交易流程供您选择！</p>
                                <div>点击这里</div>
                            </div>
                        </div>
                        <div class="banner_blank hide"></div>
                    </div>
                    <div class="zm_banner_wrap zm_banner_wrap2 swiper-slide"
                         style="background-image:url(/images/banner/server2_01.png);background-repeat:no-repeat">
                        <div class="zm_banner_blank hide"></div>
                        <div class="banner_bg"
                             style="background-image:url(/images/banner/server2_02.png);background-repeat:no-repeat;background-size:auto 200px;background-position-y:bottom;background-position-x:right">
                            <div class="banner_word">
                                <h1>上族蚂网，推广服务零费用！</h1>
                                <p>发布服务就能推广，全网百万用户共享！</p>
                                <div>点击这里</div>
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
                                module:3,
                                type:'entrep'
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

