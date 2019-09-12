<template>
  <div class="zm-citypicker">
    <div class="zm-citypickerBox">
      <ul class="zm-citypickerTab">
        <li :class="{'current':index == 0}" @click.stop="choseTab(0)">省份</li>
        <li :class="{'current':index == 1}" @click.stop="choseTab(1)">城市</li>
        <li :class="{'current':index == 2}" @click.stop="choseTab(2)">县区</li>
        <li :class="{'current':index == 3}" @click.stop="choseTab(3)">街道</li>
      </ul>

      <div class="zm-citypickerCont">
        <div class="zm-provinces" v-show="index == 0">
          <dl>
            <dt>A-G</dt>
            <dd><a 
            v-for="(item,index) in provincesOne" 
            :key="index" 
            @click.stop="choseProv(index,'One',{'fProvinceId':item.i,'fProvince':item.n});"
            :class="{'active':index == nowProv && groupProv == 'One'}"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
          <dl>
            <dt>H-k</dt>
            <dd><a 
            v-for="(item,index) in provincesTow" 
            :key="index" 
            @click.stop="choseProv(index,'Tow',{'fProvinceId':item.i,'fProvince':item.n})"
            :class="{'active':index == nowProv && groupProv == 'Tow'}"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
          <dl>
            <dt>L-S</dt>
            <dd><a 
            v-for="(item,index) in provincesThree" 
            :key="index" 
            :class="{'active':index == nowProv && groupProv == 'Three'}"
            @click.stop="choseProv(index,'Three',{'fProvinceId':item.i,'fProvince':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
          <dl>
            <dt>T-Z</dt>
            <dd><a 
            v-for="(item,index) in provincesFour" 
            :key="index" 
            :class="{'active':index == nowProv && groupProv == 'Four'}"
            @click.stop="choseProv(index,'Four',{'fProvinceId':item.i,'fProvince':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
        </div>

        <div class="zm-cities" v-show="index == 1">
          <dl>
            <dd><a 
            v-for="(item,index) in city" 
            :key="index" 
            :class="{'active':index === nowCity}"
            @click.stop="choseCity(index,{'fCityId':item.i,'fCity':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
        </div>

        <div class="zm-areas" v-show="index == 2">
          <dl>
            <dd><a 
            v-for="(item,index) in area"
            :key="index" 
            :class="{'active':index === nowArea}"
            @click.stop="choseArear(item.i,index,{'fDistrictId':item.i,'fDistrict':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
        </div>

        <div class="zm-street" v-show="index == 3">
          <dl v-if="street.length!=0">
            <dd ><a 
            v-for="(item,index) in street" 
            :key="index" 
            :class="{'active':index === nowStreet}"
            @click.stop="choseStreet(index,{'fStreetId':item.i,'fStreet':item.n})"
            href="javascript:void(0);">{{item.n}}</a></dd>
          </dl>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "cityPicker",
  props:["message"],
  data() {
    return {
      index: "", //选项卡
      nowProv:'',//省会
      nowCity:'',
      nowArea:'',
      nowStreet:'',
      groupProv:'',//省会分组
      nowLocation:'',
      nowLocationDetail:'',
      textLocation:'',//临时储存城市
      provinces:[

      ],//所有数据
      city:[

      ],//
      area:[

      ],//
      street:[],
      sendData:[
        {fProvinceId:0,fProvince:''},
        {fCityId:0,fCity:''},
        {fDistrictId:0,fDistrict:''},
        {fStreetId:0,fStreet:''}
        ],  //位置保存数据
    };
  },
  computed: {
    provincesOne(){
      return this.provinces.filter(item => item.s.charCodeAt(0)>96 && item.s.charCodeAt(0)<104)
    },
    provincesTow(){
      return this.provinces.filter(item => item.s.charCodeAt(0)>103 && item.s.charCodeAt(0)<108)
    },
    provincesThree(){
      return this.provinces.filter(item => item.s.charCodeAt(0)>107 && item.s.charCodeAt(0)<116)
    },
    provincesFour(){
      return this.provinces.filter(item => item.s.charCodeAt(0)>115)
    },
    clickEvent(){
      return this.$store.state.clickEvent;
    }
  },
  methods: {
    choseTab(num) {
      this.index = num;
    },
    choseProv(num,num2,num3) {
        this.nowProv = num;
        this.groupProv = num2;
        this.nowCity = '';
        this.nowArea = '';
        this.nowStreet = '';
        this.area=[];
        this.street=[];
        this.city = this[`provinces${num2}`][num].citys;
        this.index = 1;
        this.sendData[0] = num3;
        this.sendData[1] = {fCityId:0, fCity:''};
        this.sendData[2] = {fDistrictId:0,fDistrict:''}
        this.sendData[3] = {fStreetId:0,fStreet:''}

    },
    choseCity(num,num2) {
        this.nowArea = '';
        this.nowStreet = '';
        this.area=[];
        this.street=[];
        this.area = this[`provinces${this.groupProv}`][this.nowProv].citys[num].areas;
        this.index = 2;
        this.nowCity = num;
        this.nowLocationDetail = num2.fCity;
        this.textLocation=num2.fCity;
        this.sendData[1] = num2;
        this.sendData[2] = {fDistrictId:0,fDistrict:''}
        this.sendData[3] = {fStreetId:0,fStreet:''}
        if(!this.area) this.close();
    },
    choseArear(num,num2,num3) {
        if(this.nowLocationDetail != this.textLocation){
          this.nowLocationDetail = this.textLocation;
        }   
        this.nowStreet = '';
        this.street=[];
        this.index = 3;
        this.nowArea = num2;
        $.ajax({
            url:this.interfaceApi.getTown,
            type:'post',
            data:{
                fParentId:num
            },
            success:(res)=>{
                this.street = JSON.parse(res);
                this.nowLocationDetail = this.nowLocationDetail+' '+num3.fDistrict;
                this.sendData[2] = num3;
                this.sendData[3] = {fStreetId:0,fStreet:''};
                if(this.street.length === 0){
                    this.close();
                }
            }
        });
    },
    choseStreet(num,num2) {
        this.nowStreet = num;
        this.sendData[3] = num2;
        this.close();
    },
    close() {
      let data = null;
      if(this.sendData[0].fProvinceId !== 0){
        data = this.sendData;
      }
      this.$emit("getAddress",data);//子组件向父组件传值
    }
  },
  created() {
      if(sessionStorage.getItem("city")){
          let cityData = JSON.parse(sessionStorage.getItem("city"));
          this.provinces = cityData[0];
          this.provinces.sort( (m,j) =>{
              return m.s.charCodeAt() - j.s.charCodeAt()
          });
          // 市
          this.provinces.forEach(item => {
              this.$set(item,"citys",cityData[item.i]);
              // 区
              item.citys.forEach(v => {
                  this.$set(v,"areas",cityData[v.i]);
              })
          });
      }else{
          $.ajax({
              url:this.interfaceApi.getCity,
              success:(res)=>{
                  if(res.status === 0){
                      sessionStorage.setItem("city", JSON.stringify( res.data));
                      let cityData = res.data;
                      this.provinces = cityData[0];
                      this.provinces.sort( (m,j) =>{
                          return m.s.charCodeAt() - j.s.charCodeAt()
                      });
                      // 市
                      this.provinces.forEach(item => {
                          this.$set(item,"citys",cityData[item.i]);
                          // 区
                          item.citys.forEach(v => {
                              this.$set(v,"areas",cityData[v.i]);
                          })
                      });
                  }
              }
          })
      }
  },
  watch:{
    clickEvent(e){
      if($(e.target).closest(".zm-citypicker").length === 0 && $(e.target).closest(this.message).length === 0){
        this.close()
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/cityPicker.less";
</style>

