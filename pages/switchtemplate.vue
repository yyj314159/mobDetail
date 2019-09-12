<template>
    <useTemplateLoading :pageData="obj"></useTemplateLoading>
</template>

<script>
    import useTemplateLoading from '~/components/public/useTemplateLoading';
    export default {
        components:{
            useTemplateLoading
        },
        asyncData({app,query}){
            let obj = {};
            if(query && query.fShopId){
                obj.fShopId = query.fShopId;
            }
            if(query && query.templateId){
                obj.templateId = query.templateId;
            }
            if(query && query.userType){
                obj.userType = query.userType;
            }
            return {
                obj:obj
            };
        },
        scrollToTop:true,
        head(){
            return {
                'title': '切换模板等待中-族蚂网zuma.com',
            };
        }

    }
</script>

<style scoped>

</style>