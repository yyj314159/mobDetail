<template>
    <div class="zm-foot" style="bottom:-82px">
      <div @click="showBottom">
        <span>联系我们，了解更多！</span>
        <svg :class="{bottomArrow:isShow}" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 245.8 134.9" style="enable-background:new 0 0 245.8 134.9;" xml:space="preserve">
          <g>
            <path d="M122.8,134.6c-3.1,0-6-1.2-8.2-3.4L3.4,20C1.2,17.8,0,14.8,0,11.7c0-3.1,1.2-6.1,3.4-8.3l0.1-0.1C5.7,1.2,8.6,0,11.7,0
              c3.1,0,6,1.2,8.2,3.4l111.3,111.2c4.5,4.6,4.5,12-0.1,16.5C128.9,133.4,126,134.6,122.8,134.6z"/>
            <path d="M123,134.9c-2.9,0-5.7-1.1-7.8-3l-0.1-0.1l0,0l-0.5-0.5c-4.3-4.5-4.3-11.6,0-16.1l0.1-0.1L225.8,3.7
              c2.2-2.2,5.1-3.4,8.2-3.4c3,0,5.9,1.2,8.1,3.2c1.7,1.8,3,4,3.5,6.5c0.6,3.7-0.5,7.5-3.2,10.2L131.2,131.5
              C129,133.7,126.1,134.9,123,134.9L123,134.9z"/>
          </g>
        </svg>
      </div>
      <div>
        <div>
          <div>
            <a v-for="(item,index) in linkArr" :href="item.href" target="_blank"><span>{{item.name}}</span><div v-if="index !== linkArr.length-1"></div></a>
          </div>
          <div>
            <span>上海族蚂信息科技有限公司</span>
            <span>地址：上海市金山区亭林镇林盛路136号</span>
            <span>Copyright © 2017 zuma.com 版权所有 <a href="http://www.miit.gov.cn/" target="_blank">沪ICP备18007337号-2</a></span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          linkArr:[
              {
                  name:"帮助中心",
                  href:'/bangzhu'
              },
              {
                  name:"法律声明",
                  href:'/shop_web/about_29.html'
              },
              {
                  name:"隐私政策",
                  href:'/shop_web/about_30.html'
              },
              {
                  name:"购物付款类型",
                  href:'/shop_web/about_2.html'
              },
              {
                  name:"服务付款类型",
                  href:'/shop_web/about_8.html'
              },
              {
                  name:"支付方式",
                  href:'/shop_web/about_14.html'
              },
              {
                  name:"产品售后与申诉",
                  href:'/shop_web/about_18.html'
              },
              {
                  name:"服务投诉与申诉",
                  href:'/shop_web/about_23.html'
              },
              {
                  name:"族蚂议价流程",
                  href:'/shop_web/about_28.html'
              },
              {
                  name:"关于族蚂网",
                  href:'/shop_web/about_1.html'
              },
              {
                  name:"如何创建网站",
                  href:'/shop_web/about_31.html'
              },
              {
                  name:"网站举报",
                  href:'/shop_web/about_32.html'
              },
              {
                  name:"知识产权维权",
                  href:'/shop_web/about_35.html'
              },
          ],
          isShow:false,
          bottomHeight:82
        }
      },
      methods:{
        showBottom(){
          if(this.isShow){
            this.isShow = false;
            $(".zm-foot").animate({
              bottom:-this.bottomHeight+"px"
            },600);
          }else{
            this.isShow = true;
            $(".zm-foot").animate({
              bottom:"0px"
            },600);
          }
        }
      }
    }
</script>

<style scoped lang="less">
  @import '../../../assets/css/foot1';
</style>
