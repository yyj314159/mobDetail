<template>
    <div class="fli">
        <span class="num">
            {{animatedNumber}}<span class="norms">{{item.norms}}</span>
        </span>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tweenedNumber:0
        }
    },
    props:['item'],
    mounted(){
        this.TweenLite.to(this.$data,2,{tweenedNumber:this.item.num})
    },
    computed: {
        animatedNumber: function() {
            return this.tweenedNumber.toFixed(0);
        }
    },
}
</script>
<style lang="less" scoped>
  .num{
        font-size:58px;
        color:#00b9f2;
        position:relative;
        .norms{
            color:#333333;
            font-size:14px;
            position:absolute;
            top:12px;
            right:-24px;
        }
    }  
</style>