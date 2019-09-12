<template>
    <div class="zm-help">
        <div class="container">
            <h1>帮助中心</h1>
            <h4>您可以通过帮助中心入口，自助查询热点问题<a href="/bangzhu" target="_blank">进入帮助中心</a></h4>
            <div class="inner">
                <div class="list" v-for="(item,index) in helpListArr" :key="index">
                    <div class="left">
                        <div class="date">{{item.time | formatTime1}}</div>
                        <div class="year">{{item.time | formatTime}}</div>
                    </div>
                    <div class="right">
                        <a class="title" :href="'/bangzhu/content/'+item.fId+'_'+item.thirdCategoryId" target="_blank">{{item.fTitle}}</a>
                        <div class="category">类目：{{item.firstCategoryName}} > {{item.secondCategoryName}} > {{item.thirdCategoryName}}</div>
                        <div class="describe">{{item.fDescription}}</div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['helpList'],
    data(){
      return{
          helpListArr:[],
      }
    },
    created(){
         let categoryList = this.helpList.helpCategoryBeanList;
         for(let i = 0; i < this.helpList.helpBeanList.length;i++){
             if(i < 6){
                 let help = {};
                 help.fId = this.helpList.helpBeanList[i].fId;
                 help.fTitle = this.helpList.helpBeanList[i].fTitle;
                 help.fDescription = this.helpList.helpBeanList[i].fDescription;
                 help.time = this.helpList.helpBeanList[i].fReviewTime;
                 help.thirdCategoryId = this.helpList.helpBeanList[i].fCategoryId;
                 for(let j = 0; j < categoryList.length; j++){
                     if(categoryList[j].fId === help.thirdCategoryId){
                         help.thirdCategoryName  = categoryList[j].fName;
                         help.secondCategoryId = categoryList[j].fParentId;
                         for(let k = 0; k < categoryList.length; k++){
                             if(help.secondCategoryId === categoryList[k].fId){
                                 help.secondCategoryName = categoryList[k].fName;
                                 help.firstCategoryId = categoryList[k].fParentId;
                                 for(let l = 0; l < categoryList.length; l++){
                                     if(help.firstCategoryId === categoryList[l].fId){
                                         help.firstCategoryName = categoryList[l].fName;
                                         break;
                                     }
                                 }
                                 break;
                             }
                         }
                         break;
                     }
                 }
                 this.helpListArr.push(help);
             }else{
                 break;
             }
         }
    },
    filters:{
        formatTime(val){
            let year = new Date(val).getFullYear();
            return year;
        },
        formatTime1(val){
            let month = new Date(val).getMonth()+1;
            let day = new Date(val).getDate();
            if(month<10){
                if(day < 10){
                    return `0${month}-0${day}`;
                }else{
                    return `0${month}-${day}`;
                }
            }else{
                if(day < 10){
                    return `${month}-0${day}`;
                }else{
                    return `${month}-${day}`;
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.zm-help{
    height:716px;
    padding-top:90px;
    background:#f7f7f7;
    text-align:center;
    h1{
        font-size:42px;
        color:#3f3f3f;
        margin-bottom:27px;
    }
    h4{
        font-size:18px;
        color:#808080;
        margin-bottom:48px;
        a{
            font-size:20px;
            color:#24aaff;
            padding-bottom:2px;
            margin-left:10px;
            border-bottom:1px solid #24aaff;
        }
    }
    .container{
        width:1200px;
        margin:0 auto;
        .inner{
            .list{
                float:left;
                width:483px;
                margin-left:78px;
                margin-bottom:48px;
                .left{
                    float:left;
                    text-align:right;
                    width:80px;
                    .date{
                        font-size:28px;
                        color:#505050;
                    }
                    .year{
                        font-size:14px;
                        color:#cccccc;
                    }
                }
                .right{
                    float:right;
                    text-align:left;
                    width:370px;
                    .title{
                        color:#505050;
                        font-size:20px;
                        width: 370px;
                        height:26px;
                        line-height: 26px;
                        word-break: break-all;
                        overflow: hidden;
                        display: inline-block;
                    }
                    .category{
                        color:#cccccc;
                        font-size:14px;
                        margin-top:5px;
                        margin-bottom:7px;
                        width: 370px;
                        height:19px;
                        overflow: hidden;
                    }
                    .describe{
                        color:#707070;
                        font-size:16px;
                        line-height:24px;
                        height:48px;
                        overflow: hidden;
                        width: 370px;
                    }
                }
            }            
        }
    }
}  
</style>