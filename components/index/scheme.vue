<template>
    <div class="scheme">
        <img src="/images/index/u59.png" alt="互联网一站式解决方案">
        <div class="schemeBlock" ref='schemeNum'>
            <div class="list" v-for="(item,index) in list" :key='index'>
                <animateNum :item='item' v-if='isShowNum1' />
                <div class="sli">{{item.title}}</div>
                <div class="tli">{{item.note}}</div>
            </div>
        </div>
        <!-- <button>查看更多案例</button> -->
    </div>
</template>
<script>
import animateNum from '@/components/index/animateNum'
export default {
    components:{
        animateNum
    },
    props:['isShowNum1'],
    data(){
        return{
            list:[{
                num:80,
                norms:'人',
                title:'10年专注互联网',
                note:'美观强大的响应式网站'
            },{
                num:360,
                norms:'行',
                title:'全方位解决方案',
                note:'共同拥抱互联网红利'
            },{
                num:100,
                norms:'+',
                title:'合作公司',
                note:'累计完成1500+项目'
            },{
                num:7,
                norms:'天',
                title:'快速上线',
                note:'小程序最快七天上线'
            }],
            topValue:null
        }
    },
    methods:{
        offset(elem){
            let obj = {
                left:elem.offsetLeft,
                top:elem.offsetTop,
                width:elem.offsetWidth,
                height:elem.offsetHeight,
            }
            while(elem != document.body){
                elem = elem.offsetParent;
                console.log(elem);
                obj.left += elem.offsetLeft;
                obj.top += elem.offsetTop;
            }
            return obj;
        }
    },
    mounted(){
        this.topValue = this.offset(this.$refs.schemeNum).top+110;
    }
}
</script>
<style lang="less" scoped>
.scheme{
    width:1200px;
    margin:0 auto;
    padding-top:120px;
    padding-bottom:130px;
    text-align:center;
    img{
        width:750px;
        height:110px;
    }

    .schemeBlock{
        height:351px;
        display:flex;
        justify-content: space-between;
        .list{
            width:230px;
            .fli{
                margin-top:105px;
                
            }
            .sli{
                font-size:26px;
                font-weight:700px;
                margin-top:16px;
            }
            .tli{
                margin:20px auto;
                height:58px;
                width:230px;
                line-height:56px;
                color:#666666;
                border:1px solid #bbbbbb;
                font-size:18px;
            }
            
        }
        
    }
    button{
        width:360px;
        height:50px;
        line-height:50px;
        background:#00b9f2;
        color:#ffffff;
        font-size:18px;
        border-radius:2px;
        margin-top:40px;
        cursor:pointer;
        outline:none;
    }
} 
</style>