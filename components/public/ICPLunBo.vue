<template>
    <div class="wrap">
        <ul :style="{top:topValue+'px'}" v-show="isShow">
            <li v-for="(item,i) in list" :key="i">
                您的网站：“<span>{{item.fName}}</span>”使用的自主域名：“<span>{{item.fOutUrl}}</span>”未进行ICP备案，网站可能会被工信部封停，<a :href="'/shop_web/records/index?fEntrepId='+item.fCompanyId">立即备案</a>
            </li>
        </ul>
        <ul :style="{top:topValue1+'px'}" v-show="isShow1">
            <li v-for="(item,i) in list" :key="i">
                您的网站：“<span>{{item.fName}}</span>”使用的自主域名：“<span>{{item.fOutUrl}}</span>”未进行ICP备案，网站可能会被工信部封停，<a :href="'/shop_web/records/index?fEntrepId='+item.fCompanyId">立即备案</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "ICPLunBo",
        data(){
            return {
                list:[],
                topValue:0,
                topValue1:0,
                timer:null,
                isShow:true,
                isShow1:true,
            }
        },
        computed:{
            websiteList(){
                if(this.$store.state.userBasicInfo){
                    return this.$store.state.userBasicInfo.shopList;
                }else{
                    return [];
                }
            }
        },
        watch:{
            websiteList(val){
                this.list = [];
                if(val.length>0){
                    let index = 0;
                    for(let i = 0;i<val.length;i++){
                        if(val[i].fIcpStatus !== undefined){
                            this.$set(this.list,index,val[i])
                            index += 1;
                        }
                    }
                    if(this.list.length > 1){
                        this.topValue = 0;
                        this.topValue1 = this.list.length*26;
                        clearInterval(this.timer);
                        this.timer = setInterval(()=>{
                            this.topValue -=26;
                            this.topValue1 -=26;
                            this.isShow = true;
                            this.isShow1 = true;
                            if(this.topValue === -(this.list.length*26)){
                                setTimeout(()=>{
                                    this.isShow = false;
                                    this.topValue = this.list.length*26;
                                },500);
                            }
                            if(this.topValue1 === -(this.list.length*26)){
                                setTimeout(()=>{
                                    this.isShow1 = false;
                                    this.topValue1 = this.list.length*26;
                                },500);
                            }
                        },5000);
                    }else{
                        this.isShow1 = false;
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .wrap{
        width: 100%;
        height:26px;
        background: #F7D1E0;
        display: flex;
        align-items: center;
        justify-content: center;
        color:#122F46;
        position: fixed;
        transition: top 0.5s;
        z-index: 50;
        overflow: hidden;
        &>ul{
            position: absolute;
            transition: top 0.5s;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            &>li{
                height:26px;
                display: flex;
                align-items: center;
                span{
                    font-weight: bold;
                }
                a{
                    text-decoration: underline;
                    font-weight: bold;
                    color:#122F46;
                }
            }
        }
    }
</style>