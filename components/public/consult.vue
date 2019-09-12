<template>
    <div class="consult">
        <div :style="{left:leftVal+'px'}">
            <img src="/images/other/kefu04.png" alt="关闭" @click="close1">
            <img src="/images/other/kefu01.png" alt="背景">
            <div>
                <img src="/images/other/kefu05.png" alt="客服头像">
                <div>
                    <img src="/images/other/kefu02.png" alt="电话图标">
                    <span>免费咨询电话</span>
                </div>
                <div>400-820-2178</div>
                <div @click="customerService">在线咨询</div>
            </div>
        </div>
        <div :style="{left:leftVal2+'px'}">
            <img src="/images/other/kefu04.png" alt="关闭" @click="close2">
            <img src="/images/other/kefu03.png" alt="背景">
            <div>
                <div>族蚂官方公众号</div>
                <img src="/images/other/kefu06.png" alt="族蚂官方公众号">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
      return{
          leftVal:160,
          leftVal2:160,
      }
    },
    created(){

    },
    mounted(){
        setTimeout(()=>{
            this.leftVal = 0;
            this.leftVal2 = 0;
        },500);
    },
    methods:{
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
        close1(){
            this.leftVal = 160;
        },
        close2(){
            this.leftVal2 = 160;
        }
    }
}
</script>
<style lang="less" scoped>
.consult{
    position: fixed;
    top:27%;
    right:40px;
    z-index: 50;
    width: 120px;
    height:412px;
    &>div:nth-child(1){
        position: absolute;
        width: 120px;
        height:242px;
        top:0;
        transition:left 0.5s;
        &>img:nth-child(1){
            position: absolute;
            top:0;
            right:0;
            width: 12px;
            height:12px;
            cursor: pointer;
        }
        &>img:nth-child(2){
            position: absolute;
            top:12px;
            left:0;
            width:120px;
            height:230px;
        }
        &>div:nth-child(3){
            width: 120px;
            height:230px;
            position: absolute;
            top:12px;
            left:0;
            z-index: 5;
            display: flex;
            flex-direction: column;
            align-items: center;
            &>img:nth-child(1){
                margin-top:15px;
                width:90px;
                height:90px;
            }
            &>div:nth-child(2){
                margin-top:17px;
                display: flex;
                align-items: center;
                justify-content: center;
                &>img:nth-child(1){
                    width: 17px;
                    height:17px;
                }
                &>span:nth-child(2){
                    font-size: 12px;
                    color:#ffffff;
                    margin-left: 10px;
                }
            }
            &>div:nth-child(3){
                font-size: 14px;
                font-weight: bold;
                color:#ffffff;
                margin-top: 15px;
            }
            &>div:nth-child(4){
                width: 100px;
                height:30px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #ffffff;
                font-size:13px;
                color:#3D9BE9;
                margin-top: 17px;
                cursor: pointer;
            }
        }
    }
    &>div:nth-child(2){
        position: absolute;
        bottom: 0;
        width:120px;
        height:167px;
        transition: left 0.5s;
        &>img:nth-child(1){
            width: 12px;
            height:12px;
            position: absolute;
            bottom: 150px;
            right:0;
            cursor: pointer;
        }
        &>img:nth-child(2){
            width: 120px;
            height:145px;
            position: absolute;
            bottom:0;
            left:0;
        }
        &>div:nth-child(3){
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            bottom:0;
            left:0;
            z-index: 5;
            width: 120px;
            height:145px;
            &>div:nth-child(1){
                font-size: 12px;
                color:#ffffff;
                margin-top: 10px;
            }
            &>img:nth-child(2){
                width: 100px;
                height:100px;
                margin-top: 10px;
            }
        }
    }
}
</style>
