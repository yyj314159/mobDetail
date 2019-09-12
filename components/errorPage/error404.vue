<template>
    <div id="error">
        <div class="errorimg"><img src="/images/errorPage/error404.png" alt=""></div>
        <div class="errortext">哎呀！您不小心进入未知领域！{{time}}s后返回上一页...</div>
    </div>
</template>

<script>
    export default {
        name: "error404",
        data(){
            return{
                time:3,
                timer:null
            }
        },
        methods:{
            settime(){
                clearInterval(this.timer);
                if(sessionStorage.getItem("prevUrl")){
                    window.history.go(-1);
                }else{
                    console.log("回到首页");
                    window.location.href = window.location.protocol+'//'+window.location.host;
                }
            }
        },
        mounted(){
            this.timer = setInterval(() => {
                if(this.time>1){
                    this.time-=1
                }else{
                    this.settime()
                }
            },1000);
        }
    }
</script>

<style scoped lang="less">
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
#error{
    width: 100%;
    padding-top: 175px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    & div{
        width: 100%;
        height: 100%;
    }
}
.errorimg{
    max-width: 404px;
    & img{
        width: 100%;
    }
}
.errortext{
    font-size: 18px;
    color: #000;
    font-weight: 600;
    margin-top: 50px;
}
</style>
