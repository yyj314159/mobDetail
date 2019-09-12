<template>
  <nav>
    <ul class="pagination">
      <li :class="{'disabled': current == 1}"><a href="javascript:;" class="prePage" @click="setCurrent(current - 1)"> 上一页 </a></li>
      <li v-for="(p,index) in grouplist" :key='index' :class="{'active': current == p.val}"><a href="javascript:;"
                                                                          @click="setCurrent(p.val)"> {{ p.text }} </a>
      </li>
      <li :class="{'disabled': current == page}"><a class="nexPage" href="javascript:;" @click="setCurrent(current + 1)"> 下一页</a></li>
      <p class="totalNumBox"><a href="javascript:;" class="pageTotalNum"> 共{{grouplist.length}}页 </a><a href="javascript:;"> 到第 <input type="text" class="pageNum" v-model="toPage"> </a>页</p>

      <li><a href="javascript:;" class="page-to-btn" @click="setCurrent(toPage)"> 确定 </a></li>
    </ul>
  </nav>
</template>

<script type="es6">
  export default{
    data(){
      return {
        current: this.currentPage,
        totalNum:this.total,
        toPage:'',   //去第几页
        
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
            type: Number,
            default: 5,
            coerce: function (v) {   //限制   ????????????
              v = v > 0 ? v : 5;
              return v % 2 === 1 ? v : v + 1;
            }
        }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          ;
          return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        }
        ;
        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > 0 + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
          this.current = idx;
          this.$emit('pagechange', this.current);

          var top = document.body.scrollTop || document.documentElement.scrollTop
          scrollBy(0,-top);
        }
      }
    }
  }
</script>

<style lang="less">
  .pagination {
    padding-top: 16px;
    padding-bottom: 16px;
    overflow: hidden;
    display: table;
    margin: 0 auto;
    /*width: 100%;*/
    height: 50px;

    li {
      float: left;
      height: 26px;
      border-radius: 5px;
      margin: 3px;
      color: #666;

      &
      :hover {
        /*background: #000;*/

        a {
          color: #fff;
        }

      }
      a {
        color: #1e1e1e;
        display: block;
        width: 25px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        font-size: 13px;
        border-radius: 3px;
        text-decoration: none
      }
      a.page-to-btn{
        width: 43px;
        height: 26px;
        border: 1px solid #d7d7d7;
        border-radius: 3px;
      }
      a.prePage,a.nexPage{
        width: 60px;
        height:26px;
        line-height: 26px;
        background: #F2F2F2;
        color:#333333;
        border: 1px solid #d7d7d7;
        border-radius: 3px;
      }

    }
    .totalNumBox{
      margin: 3px 10px 0;
      float:left;
      a{
        color: #1e1e1e;
        font-size: 14px;
      }
      a.pageTotalNum{
            margin-right: 10px;
      }
      .pageNum{
        width: 42px;
        height:26px;
        border: 1px solid #c9c9c9;
        border-radius: 3px;
        box-sizing: border-box;
      }
    }

    .active {
      background: #3d9be9;

      a {
        color: #fff;
      }

    }
  }

</style>
