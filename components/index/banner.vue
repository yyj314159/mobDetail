<template>
    <div class="zm-banner" style="overflow:hidden;">
        <div class="container">
            <div class="item bj150" ref="bj">
                <div class="innerItem wow fadeInUp">
                    <img src="/images/index/slogan.png" alt="世界因你而不同" />
                    <h2>专注互联网开发/快速孵化小程序/拥抱微信生态</h2>
                    <h4>Focus on Internet Development / Rapid Hatching Applet / Embrace WeChat Ecosystem</h4>
                    <button @click.stop.prevent="chooseEntrep">立即体验</button>
                </div>                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        handleSrcoll(){
            this.$refs.bj.classList.remove('bj150')            
        },
        chooseEntrep(){
            this.$store.commit('requestLoginInfo', {
                noLoginCallBack: () => {
                    window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
                },
                loginCallBack: () => {
                    this.$store.commit("changePopupConfig",{
                        isShow:true,
                        module:1,//进入主体后台
                        type:'entrep'
                    })
                }
            })
        }
    },
    mounted(){
        new this.WOWJS.WOW().init()
        this.handleSrcoll();
    }
}
</script>
<style lang="less" scoped>
.zm-banner{
    .container{
        .item{
            height:790px;
            min-width:1200px;
            background: url('/images/index/datu.png') center center no-repeat;
            background-size:auto 100%;
            transition:all 1s; 
            .innerItem{
                color:#ffffff;
                min-width:1200px;
                max-width:1240px;
                margin:0 auto;
                padding-top:235px;
                padding-left:15px;
                .slogan{
                    font-size:70px;
                    letter-spacing:4px;
                    background-image:-webkit-linear-gradient(bottom,#bbbfc7,#ffffff,#ffffff); 
                    -webkit-background-clip:text; 
                    -webkit-text-fill-color:transparent; 
                }
                h2{
                    margin-top:55px;
                    font-size:38px;
                    letter-spacing:1px;
                    color:#fefefe;
                }
                h4{
                    margin-top:20px;
                    font-size:16px;
                }
                button{
                    width:260px;
                    height:54px;
                    line-height:54px;
                    text-align:center;
                    color:#ffffff;
                    background:#00afec;
                    border-radius:2px;
                    font-size:20px;
                    cursor:pointer;
                    margin-top:90px;
                    outline:none;
                    &:hover{
                        background:#009bec;
                    }
                }
            }            
        }
        .bj150{
            background-size:auto 150%;
                   
        }
    }
    
}
</style>