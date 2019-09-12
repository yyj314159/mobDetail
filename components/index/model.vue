<template>
    <div class="model">
        <h1>千套精美模板&nbsp;任你选择</h1>
        <div class="container" @mouseenter="on_bot_enter" @mouseleave="on_bot_leave">
            <div class="btn">
                <img src="/images/index/btnLeft.png" alt="btnLeft" @click.stop.prevent="preClick">
            </div>
            <div class="inner" ref="mySwiper" v-swiper:mySwiper="swiperOption" v-if="imgList.length > 1">
  
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in imgList" :key="index">
                        <div class="row">
                            <div class="list" v-for="(aaa,i) in item" :key="i">
                                <div class="point"><i></i><i></i><i></i></div>
                                <div class="pc">
                                    <img :src="aaa.fUrl?aaa.fUrl:'/images/index/pcjmmb.png'" alt="精美模板"  @load="handleImg($event,184,118)">
                                </div>
                                <div class="phone">
                                    <div>
                                        <img :src="aaa.fUrl2?aaa.fUrl2:'/images/index/mobilemb.png'" alt="手机精美模板"  @load="handleImg($event,60,96)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="swiper-button-prev" ref="rightBut" style="width:0px"></div>
                <div class="swiper-button-next" ref="leftBut" style="width:0px"></div>

            </div>
            <div class="btn">
                <img src="/images/index/btnRight.png" alt="btnRight"  @click.stop.prevent="nextClick">
            </div>
        </div>
        <a :href="pageData.jzDomain+'/moban'" target="_blank"><button>查看更多</button></a>
    </div>
</template>
<script>
    import publicUtil from '~/common/publicUtil';
export default {
    props:['pageData'],
    data(){
        return{
            imgList:[],
            mySwiper:null,
            swiperOption:{
                loop:true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                },
                navigation:{
                    nextEl:".swiper-button-next",
                    prevEl:".swiper-button-prev"
                },
            }
        }
    },
    methods:{
        //通过获得的swiper对象来暂停自动播放
        on_bot_enter() {
            this.mySwiper.autoplay.stop()
        },
        on_bot_leave() {
            this.mySwiper.autoplay.start()
        },
        // 右箭头点击事件
        nextClick() {
            this.$refs.rightBut.click();
        },
        // 左箭头点击事件
        preClick() {
            this.$refs.leftBut.click();
        },
        handleImg(e,width,height){
            publicUtil.handleImg(e,width,height);
        },
    },
    computed:{
        
    },
    created(){
        // let data = new Array(40).fill(1);
        let data = (this.pageData.list && this.pageData.list.length > 0) ? this.pageData.list : new Array(40).fill({fUrl:null,fUrl2:null})
        let n = 8;
        let num = Math.ceil(data.length/n);

        for(let i = 0;i < num;i++){
            let temp = data.slice(n*i,n*(i+1));
            this.imgList.push(temp)
        }
    },
    mounted(){
        this.mySwiper = this.$refs.mySwiper.swiper;
        $(".pc").each(function () {
            $(this).find("img").each(function () {
                $(this).on("load",function (e) {
                    publicUtil.handleImg(e,184,118);
                })
            })
        });
        $(".phone").each(function () {
            $(this).find("img").each(function () {
                $(this).on("load",function (e) {
                    publicUtil.handleImg(e,60,96);
                })
            })
        });
    }
}
</script>
<style lang="less" scoped>
.model{
    height:770px;    
    background:#f8f8f8;
    padding-top:90px;
    text-align:center;
    h1{        
        font-size:30px;
        color:#333333;
        font-weight:700;
        letter-spacing:10px;
        margin-bottom:95px;       
    }

    .container{
        width:1200px;
        margin:0 auto;
        display:flex;
        .btn{
            flex:1;
            text-align:center;
            margin-top:142px;            
            img{
                width:18px;
                height:27px;
                cursor:pointer;
            }
        }
        .inner{
            width:1066px;
            height:330px;
            margin:0 auto;
            // display:flex;
            // flex-wrap:wrap;
            // justify-content:space-between;
            overflow:hidden;
            .swiper-slide {
                float: left;
            }
            .row{
                display:flex;
                flex-wrap:wrap;
                justify-content:space-between;

            }
            .list{
                width:188px;
                height:132px;
                border-top-left-radius:8px;
                border-top-right-radius:8px;
                background:#000000;
                margin-right:50px;
                margin-bottom:54px;
                position:relative;                
                .point{
                    position:absolute;
                    top:-7px;
                    left:10px;
                    i{
                        display:inline-block;
                        width:4px;                        
                        height:4px;
                        border-radius:50%;
                        background:#ffffff;
                        margin-right:4px;
                    }
                }
                .pc{
                    position:absolute;
                    bottom:2px;
                    left:2px;
                    width:184px;
                    height:118px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .phone{
                    height:114px;
                    width:64px;
                    border-radius:7px;
                    background:#000000;
                    position:absolute;
                    bottom:0;
                    right:-50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &>div{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        width: 60px;
                        height:96px;
                    }
                }
            }
        }
    }

    button{
        margin-top:68px;
        width:260px;
        height:46px;
        border-radius:2px;
        background:#00afec;
        color:#ffffff;
        font-size:18px;
        line-height:46px;
        outline:none;
        cursor:pointer;
        &:hover{
            background:#009bec;
        }
    }
}

</style>