<template>
    <div class="consult" :style="{bottom:bottomVal+'px'}">
        <div>
            <img src="/images/other/kefu07.png" @click="close" alt="关闭">
            <div>
                <img src="/images/other/kefu08.png" alt="客服头像">
                <div>
                    <div>族蚂网助力全行业自助搭建在线交易网站！</div>
                    <div>客服热线：400-820-2178</div>
                </div>
            </div>
        </div>
        <div>
            <div @click="use">免费试用</div>
            <div @click="customerService">在线咨询</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "consult2",
        data(){
            return{
                bottomVal:-245,
                timer:null,
                time:0
            }
        },
        mounted(){
            this.timer = setInterval(()=>{
                this.time = this.time+1;
                if(this.time === 30){
                    clearInterval(this.timer);
                    this.bottomVal = 80;
                }
            },1000)
        },
        methods:{
            close(){
               this.bottomVal = -245;
                this.timer = setInterval(()=>{
                    this.time = this.time+1;
                    if(this.time === 30){
                        clearInterval(this.timer);
                        this.bottomVal = 80;
                    }
                },1000)
            },
            use(){
                this.$store.commit('requestLoginInfo',{
                    noLoginCallBack:()=>{
                        window.location.href = '/denlu?url='+encodeURIComponent(window.location.href);
                    },
                    loginCallBack:()=>{
                        this.$store.commit("changePopupConfig",{
                            isShow:true,
                            module:1,//进入编辑器或者进入模板选择页
                            type:'website'
                        })
                    }
                })
            },
            customerService(){
                let newWindow = window.open("","win1","width=660px,height=650px,resizable=no,scroll=no,status=no,scrollbars=no,status=no,toolbar=no,top=200px,left=500px");
                $.ajax({
                    url: "/im/createUserToZmService",
                    data: {
                        fIsUrgency:0,
                        fPorSUrl:window.location.href,
                        fTitle:'会员咨询'
                    },
                    type: "POST",
                    async:false,
                    success: (res) =>{
                        if(res.status === 0){
                            //跳转到聊天页面
                            newWindow.location.href = "/im/userToZmService?fCommunicationRecordId="+res.record.fCommunicationRecordId;
                        }else{
                            newWindow.close();
                        }
                    }
                })
            },
        },
        computed:{
            scrollTop(){
                return this.$store.state.scrollTop;
            },
        },
        watch:{
            scrollTop(){
                this.time = 0;
            }
        }
    }
</script>

<style scoped lang="less">
    .consult{
        position: fixed;
        left:20px;
        bottom:80px;
        z-index: 110;
        width: 440px;
        height:243px;
        box-shadow:0 0 10px  rgba(18,47,70,0.3);
        transition: bottom 0.5s;
        &>div:nth-child(1){
            width: 440px;
            height:160px;
            background: linear-gradient(180deg,#3D9BE9,#00afec);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            &>img:nth-child(1){
                position: absolute;
                width: 24px;
                height:24px;
                right:10px;
                top:10px;
                cursor: pointer;
            }
            &>div:nth-child(2){
                width: 100%;
                height:58px;
                display: flex;
                align-items: center;
                justify-content: center;
                &>img:nth-child(1){
                    width: 58px;
                    height:58px;
                }
                &>div:nth-child(2){
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 10px;
                    height:58px;
                    &>div{
                        font-size: 16px;
                        font-weight: bold;
                        color:#ffffff;
                    }
                }
            }
        }
        &>div:nth-child(2){
            background: #ffffff;
            width: 440px;
            height:83px;
            display: flex;
            justify-content: center;
            &>div:nth-child(1){
               width: 170px;
                height:40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #00AFEC;
                font-size: 16px;
                font-weight: bold;
                color:#ffffff;
                cursor: pointer;
                border-radius: 6px;
                margin-top: 18px;
            }
            &>div:nth-child(2){
                width: 170px;
                height:40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                border: 1px solid #00AFEC;
                color:#00AFEC;
                margin-left:25px;
                margin-top: 18px;
                border-radius: 6px;
            }
        }
    }
</style>