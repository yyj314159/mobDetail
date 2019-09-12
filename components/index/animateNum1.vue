<template>
    <div class="num">
        {{animatedNumber}}<span>{{item.norms}}</span>
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
        font-size:60px;
        color:#00b9f2;
        // position:relative;
        margin-bottom:14px;
        span{
            // position:absolute;
            font-size:40px;
            // bottom: 5px;
        }
    }
</style>