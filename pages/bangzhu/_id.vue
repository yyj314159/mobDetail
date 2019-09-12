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
      let type = 'three-list';
      let catid = null;
      let searchStr = null;
      let searchList = null
      let categoryId = null;
      let hotQuestions = [];
      let contentObj = {
        fTitle:'',
        fContent:'',
      }
      console.log(params)
      catid = params.id
      hotQuestions = requestUtil.validateData(await requestUtil.getData('/help/queryAllCategoryAndHelp'))
      let idNameLists = hotQuestions.map(o=>{
            let aaa = {}
            aaa['fId'] = o.fId;
            aaa['fName'] = o.fName;
            if(o.helpCategoryBeanList && o.helpCategoryBeanList.length > 0){
                aaa['helpCategoryBeanList'] = o.helpCategoryBeanList.map(m=>{
                    let bbb = {}
                    bbb['fId'] = m.fId;
                    bbb['fName'] = m.fName;
                    if(m.helpCategoryBeanList && m.helpCategoryBeanList.length > 0){
                        bbb['helpCategoryBeanList'] = m.helpCategoryBeanList.map(n =>{
                            let ccc = {}
                            ccc['fId'] = n.fId;
                            ccc['fName'] = n.fName;
                            ccc['helpBeanList'] = n.helpBeanList;
                            return ccc;
                        })
                        
                    }else{
                        bbb['helpCategoryBeanList'] = [];
                    }
                    return bbb;
                })
            }else{
                aaa['helpCategoryBeanList'] = [];
            } 
            return aaa;
        });
        hotQuestions = idNameLists;
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