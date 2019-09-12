<template>
    <transition  
        @before-enter="beforeEnter1"  
        @enter="enter1" 
        @after-enter="afterEnter1" 
        @enter-cancelled="enterCancelled1" 
        @before-leave="beforeLeave1" 
        @leave="leave1" 
        @after-leave="afterLeave1" 
        @leave-cancelled="leaveCancelled1">
        <slot></slot>
    </transition>
</template>
<script>
export default {
    name:'anim1',
    methods:{
         // **展开收起动画**
        beforeEnter1(el){
            el.className=el.className+' my-transition1';
            el.style.height = '0';
        },
        enter1(el){
            el.style.height = el.scrollHeight + 'px';
        },
        afterEnter1(el){
            el.className=el.className.replace("my-transition1",'');
            el.style.height = '';
        },
        enterCancelled1(el){
 
        },
        beforeLeave1(el){
            el.style.height = el.scrollHeight + 'px';
        },
        leave1(el){
            let ht=el.scrollHeight;
            el.className=el.className+' my-transition1';
            el.style.height = 0;
        },
        afterLeave1(el){
            el.className=el.className.replace("my-transition1",'');
            el.style.height = '';
        },
        leaveCancelled1(el){
             
        },
    }

}
</script>
<style lang="less">
.my-transition1{transition: .5s height ease-in-out/* , 10.5s padding-top ease-in-out, 10.5s padding-bottom ease-in-out */}
</style>