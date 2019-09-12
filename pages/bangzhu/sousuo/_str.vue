<template>
    <div>
        <businessFunctionMenu />
        <help-center :pageData="pageData"></help-center>
    </div>
</template>

<script>

    import businessFunctionMenu from '~/components/public/head/businessFunctionsMenu' 
    import helpCenter from '~/components/help/helpCenter';
    import requestUtil from '~/common/requestUtil';
  export default {
    components:{
      helpCenter,
      businessFunctionMenu
    },
    async asyncData({app,params}){
      let type = 'search';
      let catid = null;
      let searchStr = null;
      let searchList = null
      let categoryId = null;
      let hotQuestions = [];
      let contentObj = {
        fTitle:'',
        fContent:'',
      }
 
    searchStr = params.str ? params.str : '';          

    hotQuestions = requestUtil.validateData(await requestUtil.getData('/help/queryAllCategoryAndHelp'))
      
      return {
        pageData:{
          type:type,
          catid:catid,
          searchStr:searchStr,
          hotQuestions:hotQuestions,
          contentObj:contentObj,
          searchList:searchList
        }
      }
    },
      scrollToTop:true,
  }
</script>