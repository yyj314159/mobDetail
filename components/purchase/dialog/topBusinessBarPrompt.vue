<template>
    <div class="businessBarBox">
        <svg @click="close" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve" fill="#CDCDCD">
                    <g>
                    <path class="st0" d="M27,25L49.6,2.4c0.5-0.5,0.5-1.4,0-2c-0.5-0.5-1.4-0.5-2,0L25,23L2.4,0.4c-0.5-0.5-1.4-0.5-2,0
	                c-0.5,0.5-0.5,1.4,0,2L23,25L0.4,47.6c-0.5,0.5-0.5,1.4,0,2c0.5,0.5,1.4,0.5,2,0L25,27l22.6,22.6c0.5,0.5,1.4,0.5,2,0
	                c0.5-0.5,0.5-1.4,0-2L27,25z"/>
                    </g>
                </svg>
        <prompt-top-business-bar></prompt-top-business-bar>
        <div class="dialog">
            <div> 添加产品及服务组件，有效帮助买家快速查看订单及购物车。</div>
            <div>
                <div class="btn1" @click="close">我知道了</div>
            </div>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.2 47">
                <g>
                    <path  d="M0,46l0,1c0,0,0.3,0,0.9,0c0.5,0,1.2,0,2.1-0.1l-0.1-1C1.1,46,0.1,46,0,46z"/>
                    <path  d="M11.3,44.7l0.2,1c2.1-0.5,4.1-1.1,6-1.9l-0.4-0.9C15.3,43.6,13.4,44.2,11.3,44.7z"/>
                    <path  d="M4.1,45.9l0.1,1c2.1-0.2,4.2-0.5,6.2-0.9l-0.2-1C8.2,45.4,6.1,45.7,4.1,45.9z"/>
                    <path  d="M18.3,42.4l0.4,0.9c2-0.9,3.8-1.9,5.5-3.1l-0.6-0.8C22,40.5,20.2,41.5,18.3,42.4z"/>
                    <path  d="M32.9,18.2l1-0.1c-0.2-1.7-0.6-3.8-1.3-6.1l-1,0.3C32.3,14.6,32.7,16.6,32.9,18.2z"/>
                    <path  d="M23.3,35.3l0.6-0.8c-1.1-0.8-1.9-2.3-1.9-3.8c0-0.4,0.1-0.8,0.2-1.1l0,0l-1-0.3c-0.1,0.4-0.2,0.9-0.2,1.4
                        C21,32.5,21.9,34.2,23.3,35.3z"/>
                    <path  d="M27.5,27.4c0.1,0,0.1,0.1,0.2,0.1l0.5-0.9c-0.1,0-0.2-0.1-0.2-0.1c-1.9-0.9-4.6-0.2-6,1.5l0.8,0.6
                        C23.8,27.2,26,26.6,27.5,27.4z"/>
                    <path  d="M33,19.4c0,0.2,0,0.3,0,0.4l0,0.2c0,1.9-0.2,3.8-0.4,5.4l1,0.2c0.3-1.7,0.4-3.6,0.5-5.6l0-0.2
                        c0-0.2,0-0.3,0-0.5L33,19.4z"/>
                    <path  d="M30.7,31.6c0,0,0-0.1,0-0.1c0-1.5-0.5-2.9-1.5-4l-0.7,0.7c0.8,0.9,1.2,2.1,1.2,3.3c0,0.7-0.1,1.3-0.4,1.9
                        l0.2,0.1c-1.4,1.8-2.5,2.1-4.4,1.6c-0.1,0-0.1,0-0.2-0.1l-0.3,0.9c0.1,0,0.2,0.1,0.3,0.1c0.9,0.3,1.7,0.3,2.5,0.2
                        c-0.8,0.9-1.7,1.7-2.7,2.4l0.6,0.8c1.5-1.1,2.8-2.4,4-3.8c0.2-0.2,0.4-0.5,0.5-0.7l0,0c0.3-0.3,0.6-0.7,0.9-1l-0.2-0.1
                        c0.2-0.4,0.3-0.8,0.4-1.3l0.5,0.3c0.9-1.6,1.7-3.6,2.2-5.9l-1-0.2C32,28.6,31.4,30.3,30.7,31.6z"/>
                    <path  d="M31,10.2c0.1,0.3,0.2,0.5,0.3,0.8l1-0.3c-0.1-0.3-0.2-0.6-0.3-0.9l2.3-0.9L27.3,0l1.5,11.1L31,10.2z"/>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
    import promptTopBusinessBar from '~/components/purchase/dialog/promptTopBusinessBar';
    export default {
        components:{
            promptTopBusinessBar
        },
        methods:{
            close(){
                this.$parent.isShowTopBusinessBarPrompt = false;
            },
        }
    }
</script>

<style scoped lang="less">
    .businessBarBox{
        width: 100%;
        height:100%;
        position: fixed;
        z-index: 10000;
        background: rgba(18,47,70, 0.6);
        top:0;
        left:0;
        &>svg{
            width: 60px;
            height:60px;
            position: absolute;
            top:60px;
            right:60px;
            cursor:pointer;
        }
        .dialog{
            width: 583px;
            height:210px;
            position: relative;
            margin:0 auto;
            border: 4px dashed #ffffff;
            margin-top:145px;
            padding: 20px 15px;
            &>div:nth-child(1){
                font-size: 26px;
                color:#ffffff;
            }
            &>div:nth-child(2){
                margin-top: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                .btn1{
                    width: 160px;
                    height:40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 20px;
                    color:#333333;
                    background: #ffffff;
                    cursor: pointer;
                }
            }
            &>svg{
                position:absolute;
                width:138px;
                height:186px;
                fill:#ffffff;
                right:-138px;
                top:-140px;
            }
        }
    }
</style>
