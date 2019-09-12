<template>
    <div class="businessFunctionMenu">
        <div>
            <div>
                <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	              viewBox="0 0 28.2 36" style="enable-background:new 0 0 28.2 36;" xml:space="preserve">
            <path style="fill:#D9534F;" d="M28.2,14.1C28.2,5.9,22.3,0,14.1,0C6.3,0,0,6.3,0,14.1c0,5.7,7.8,15.4,12,20.7l0.3,0.4c0.4,0.5,1.1,0.9,1.8,0.9
                c0.7,0,1.4-0.3,1.8-0.9l0.3-0.4C20.4,29.5,28.2,19.8,28.2,14.1z M14.1,18.4c-3.4,0-6.2-2.8-6.2-6.2S10.7,6,14.1,6s6.2,2.8,6.2,6.2
                S17.5,18.4,14.1,18.4z"/>
          </svg>
                <div id="chooseAddress" @click="showCityPicker">
                    <div>{{location}}</div>
                    <svg :class="{arrowRotate:isRotate}" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 245.8 134.9" style="enable-background:new 0 0 245.8 134.9;" xml:space="preserve">
              <g>
                <path d="M122.8,134.6c-3.1,0-6-1.2-8.2-3.4L3.4,20C1.2,17.8,0,14.8,0,11.7c0-3.1,1.2-6.1,3.4-8.3l0.1-0.1C5.7,1.2,8.6,0,11.7,0
                  c3.1,0,6,1.2,8.2,3.4l111.3,111.2c4.5,4.6,4.5,12-0.1,16.5C128.9,133.4,126,134.6,122.8,134.6z"/>
                <path d="M123,134.9c-2.9,0-5.7-1.1-7.8-3l-0.1-0.1l0,0l-0.5-0.5c-4.3-4.5-4.3-11.6,0-16.1l0.1-0.1L225.8,3.7
                  c2.2-2.2,5.1-3.4,8.2-3.4c3,0,5.9,1.2,8.1,3.2c1.7,1.8,3,4,3.5,6.5c0.6,3.7-0.5,7.5-3.2,10.2L131.2,131.5
                  C129,133.7,126.1,134.9,123,134.9L123,134.9z"/>
              </g>
            </svg>
                    <city-picker message="#chooseAddress" v-if="isShowCityPicker" @getAddress="setAddress"
                                 style="top:20px;"></city-picker>
                </div>
            </div>
            <div>
                <div v-show="!isLogin">
                    <span @click="goToLogin">登录</span>
                    <span @click="goToRegister">免费注册</span>
                </div>
                <div v-show="isLogin">
                    <div>
                        <span>您好，</span>
                        <span>{{nickName}}</span>
                        <svg :class="{arrowRotate:isRotate}" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                        <div @click="goToAccountInformation">账户管理</div>
                        <div @click="goToLoginOut">退出登录</div>
                        <div @click="goToInfoCenter"><span>消息</span><span>{{informationNum | formatNum}}</span></div>
                    </div>
                </div>
                <div class="line"></div>
                <div>
                    <div>
                        <span>我的主体</span>
                        <svg :class="{arrowRotate:isRotate}" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                            <vue-scroll v-if="isShowScroll" :ops="ops">
                                <div class="siteList" v-show="isLogin">
                                    <div v-for="(item,index) in entrepList" class="siteItem" :key="index"
                                         @click="goToEntrepBackground(item.fId)">{{item.fName}}
                                    </div>
                                </div>
                                <div v-show="!isLogin" class="noLoginContent">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 56 56" style="enable-background:new 0 0 56 56;" xml:space="preserve">
                  <g>
                    <path style="fill:#3b88c7" d="M23.6,37.8c1.6-1.2,4.3-2.8,5.4-2.8c1.1,0,3.8,1.6,5.4,2.8l1.2-1.6C34.9,35.7,31.2,33,29,33s-5.9,2.7-6.6,3.2
                      L23.6,37.8z"/>
                    <path style="fill:#3b88c7" d="M54,4H2C0.9,4,0,4.9,0,6v36c0,1.1,0.9,2,2,2h5.4c-0.2,0.6-0.3,1.2-0.4,1.8c0,0.6,0.3,1.2,0.9,1.4
                      c2,0.8,3.4,1.7,4.2,2.2c0.5,0.3,0.7,0.8,0.7,1.4V52h2v-1.2c0-1.2-0.6-2.4-1.6-3.1c-0.8-0.6-2.2-1.4-4.2-2.2
                      c0.2-1.1,0.7-2.5,2.3-2.5c4.5,0,8.4,1.8,11.8,5.5c0.3,0.3,0.5,0.8,0.5,1.2V52h2v-2.3c0-1-0.4-1.9-1-2.6c-1.2-1.2-2.4-2.3-3.6-3.1
                      h15.6c-1.3,0.9-2.5,1.9-3.6,3.1c-0.7,0.7-1,1.6-1,2.6V52h2v-2.3c0-0.4,0.2-0.9,0.5-1.2c3.5-3.7,7.3-5.5,11.8-5.5
                      c1.6,0,2.1,1.4,2.3,2.5c-2,0.8-3.4,1.7-4.2,2.2c-1,0.7-1.6,1.8-1.6,3.1V52h2v-1.2c0-0.6,0.3-1.1,0.7-1.4c0.8-0.5,2.2-1.4,4.2-2.2
                      c0.6-0.2,0.9-0.8,0.9-1.4c0-0.6-0.2-1.2-0.4-1.8H54c1.1,0,2-0.9,2-2V6C56,4.9,55.1,4,54,4z M17.4,42h-0.3c-1.8-0.7-3.8-1-5.8-1
                      c-0.4,0-0.8,0.1-1.2,0.2c0.4-2.9-0.4-4.8-0.5-4.9c0-0.1-0.1-0.2-0.2-0.3c-0.1-0.2-3.5-4.1-1-8c2-3,1.8-5.4,1-7h7
                      c0.5,0.5,2.1,2.2-0.2,5.7c-2.8,4.2-0.6,8.8,1,10.7C17.6,37.9,18,39.6,17.4,42z M48.1,36c-0.1,0.1-0.1,0.2-0.2,0.3
                      c0,0.1-0.9,2-0.5,4.9c-0.4-0.1-0.7-0.2-1.2-0.2c-2.1,0-4.1,0.4-6,1.1c-0.7-2.5-0.2-4.2-0.1-4.7c1.7-2,3.8-6.5,1-10.7
                      c-2.3-3.4-0.7-5.1-0.2-5.7h7c-0.8,1.6-1,4,1,7C51.6,31.9,48.2,35.8,48.1,36z M54,42h-4.3c-0.6-2.4-0.2-4.1,0-4.6
                      c1.7-2,3.8-6.5,1-10.7c-2.3-3.4-0.7-5.1-0.2-5.7h1.2v-2h-14v2h0.9c-0.8,1.6-1,4,1,7c2.6,3.9-0.8,7.8-1,8c-0.1,0.1-0.1,0.2-0.2,0.3
                      c0,0.1-1,2.4-0.3,5.7H19.5c0.7-3.4-0.3-5.6-0.3-5.7c0-0.1-0.1-0.2-0.2-0.3c-0.1-0.2-3.5-4.1-1-8c2-3,1.8-5.4,1-7H20v-2H6v2h1.2
                      c0.5,0.5,2.1,2.2-0.2,5.7c-2.8,4.2-0.6,8.8,1,10.7c0.2,0.5,0.6,2.2,0,4.6H2V6h52V42z"/>
                    <path style="fill:#3b88c7" d="M26.2,16.3c-3.8-0.9-8.7-4.8-8.7-4.9l-0.9,1.2c0.2,0.2,5.2,4.1,9.3,5.1L26.2,16.3z"/>
                    <path style="fill:#3b88c7" d="M39.5,12.6l-0.9-1.2c0,0-4.9,3.9-8.7,4.9l0.4,1.5C34.3,16.7,39.3,12.8,39.5,12.6z"/>
                  </g>
                </svg>
                                    <div>
                                        <div>您还不是注册会员！</div>
                                        <div @click="goToRegister">现在注册！</div>
                                    </div>
                                </div>
                            </vue-scroll>
                        </div>
                        <div>
                            <span>+</span>
                            <span @click="goToAddEntrep">添加新主体</span>
                        </div>
                    </div>
                </div>
                <div class="line"></div>
                <div>
                    <div @click="goToShopCart">
                        <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   viewBox="0 0 30 26" style="enable-background:new 0 0 30 26;" xml:space="preserve">
                <g>
                  <g>
                    <path class="st0" style="fill:#CC3333;" d="M30,14.9V1.5H7C7,0.6,6.3,0,5.5,0h-4C0.7,0,0,0.7,0,1.5S0.7,3,1.5,3h2.9L8,17v2H7v2h1h1.5H10h15.5H28v-2H10
                      v-2.2L30,14.9z"/>
                    <circle style="fill:#CC3333;" cx="9.5" cy="23.5" r="2.5"/>
                    <circle style="fill:#CC3333;" cx="25.5" cy="23.5" r="2.5"/>
                  </g>
                </g>
              </svg>
                        <span>购物车</span>
                        <span>{{cartNum | formatNum}}</span>
                        <span>件</span>
                    </div>
                </div>
                <div class="line"></div>
                <div>
                    <div>
                        <span>我的订单</span>
                        <svg  version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                        <div @click="goToShopCart">购物车</div>
                        <div @click="goToProductOrder">产品订单</div>
                        <div @click="goToProductBargin">产品议价单</div>
                        <div @click="goToServerOrder">服务订单</div>
                        <div @click="goToServerBargin">服务议价单</div>
                    </div>
                </div>
                <div class="line"></div>
                <div>
                    <div @click="goToIndex">族蚂网首页</div>
                </div>
                <div class="line"></div>
                <div @click="goToMemberCenter">会员中心</div>
            </div>
        </div>
    </div>
</template>

<script>
    import cityPicker from "../cityPicker";

    export default {
        name: "businessFunctionsMenu",
        components: {
            cityPicker
        },
        data() {
            return {
                location: "上海",
                isShowCityPicker: false,
                nickName: "",
                isRotate: false,
                cartNum: 0,
                informationNum: 0,
                ops: {
                    vuescroll: {},
                    scrollPanel: {},
                    rail: {
                        keepShow: true,
                    },
                    bar: {
                        hoverStyle: true,
                        onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                        background: '#f2f2f2',
                        minSize: 0.3,

                    }
                },
                isShowScroll: false,
                entrepList:[]
            }
        },
        mounted() {
            this.isShowScroll = true;
            let userLocation = JSON.parse(sessionStorage.getItem("userLocation"));
            this.$axios.get(this.interfaceApi.getLoginStatus).then((res) => {
                if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 0) {
                        if (data.data === 0) {
                            this.$store.commit("changeLoginStatus", false);
                            if (userLocation) {
                                this.location = userLocation.fProvince;
                            } else {
                                //根据IP请求地址
                                this.$axios.get(this.interfaceApi.getLocation1).then((res) => {
                                    if (res.status === 200) {
                                        let data = res.data;
                                        if (data.status === 0) {
                                            if (data.data) {
                                                this.location = data.data.region.substring(0, data.data.region.length - 1);
                                            }
                                        }
                                    }
                                }, (err) => {
                                    console.log(err);
                                });
                            }
                        } else {
                            this.$store.commit("changeLoginStatus", true);
                            if (userLocation) {
                                this.location = userLocation.fProvince;
                                this.$axios.get(this.interfaceApi.saveLocation, {
                                    params: {
                                        fProvince: userLocation.fProvince,
                                        fProvinceId: userLocation.fProvinceId
                                    }
                                });
                            } else {
                                this.$axios.get(this.interfaceApi.getLocation).then((res) => {
                                    if (res.status === 200) {
                                        let data = res.data;
                                        if (data.status === 0) {
                                            if (data.data && data.data.fProvince) {
                                                this.location = data.data.fProvince;
                                            } else {
                                                //根据IP请求地址
                                                this.$axios.get(this.interfaceApi.getLocation1).then((res) => {
                                                    if (res.status === 200) {
                                                        let data = res.data;
                                                        if (data.status === 0) {
                                                            if (data.data) {
                                                                this.location = data.data.region.substring(0, data.data.region.length - 1);
                                                            }
                                                        }
                                                    }
                                                }, (err) => {
                                                    console.log(err);
                                                });
                                            }
                                        }
                                    }
                                }, (err) => {
                                    console.log(err);
                                });
                            }
                            this.$axios.get(this.interfaceApi.getUserBasicInfo).then((res) => {
                                if (res.status === 200) {
                                    let data = res.data;
                                    if (data.status === 0) {
                                        this.$store.commit("changeUserBasicInfo", data.data);
                                        this.nickName = data.data.user.userName;
                                        this.entrepList = data.data.entrepList;
                                    }
                                }
                            }, (err) => {
                                console.log(err);
                            });
                            this.$axios.get(this.interfaceApi.getMessageNum).then((res) => {
                                if (res.status === 200) {
                                    let data = res.data;
                                    if (data.status === 0) {
                                        if (data.data) {
                                            this.informationNum = data.data;
                                        }
                                    }
                                }
                            }, (err) => {
                                console.log(err)
                            });
                            this.$axios.get(this.interfaceApi.getShopCartNum).then((res) => {
                                if (res.status === 200) {
                                    let data = res.data;
                                    if (data.status === 0) {
                                        this.cartNum = data.data;
                                    }
                                }
                            }, (err) => {
                                console.log(err);
                            })
                        }
                    }
                }
            }, (err) => {
                console.log(err);
            })
        },
        methods: {
            setAddress(val) {
                this.isRotate = false;
                this.isShowCityPicker = false;
                if (val && val.length !== 0) {
                    this.location = val[0].fProvince;
                    sessionStorage.setItem("userLocation", JSON.stringify({
                        fProvince: val[0].fProvince,
                        fProvinceId: val[0].fProvinceId
                    }));
                    this.$store.commit("requestLoginInfo", {
                        noLoginCallBack: () => {
                        },
                        loginCallBack: () => {
                            this.$axios.get(this.interfaceApi.saveLocation, {
                                params: {
                                    fProvince: val[0].fProvince,
                                    fProvinceId: val[0].fProvinceId
                                }
                            });
                        }
                    });
                }
            },
            showCityPicker() {
                this.isRotate = true;
                this.isShowCityPicker = true;
            },
            goToLogin() {
                window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
            },
            goToRegister() {
                window.location.href = '/zhuce';
            },
            goToShopCart() {
                window.open("/cart/redirectCart");
            },
            goToProductOrder() {
                window.open('/pOrder_web/productOrder/memberList');
            },
            goToServerOrder() {
                window.open('/sorder_web/serviceOrder/list');
            },
            goToMemberCenter() {
                window.open("/member/index");
            },
            goToIndex() {
                window.location.href = '/';
            },
            goToEntrepBackground(fId) {
                $.ajax({
                    url: '/authority-sitebackend/userPermission/clearSiteBackendPermission',
                    async: false,
                });
                $.ajax({
                    url: '/changeEntrepInfo',
                    async: false,
                    data: {entrepId: fId},
                    success: (res) => {
                        if (res.status === 0) {
                            window.open("/shop_web/index?fEntrepId=" + fId);
                        }
                    }
                });
            },
            goToAddEntrep() {
                 window.open("/pcMemberCenter/asOne");
            },
            goToProductBargin() {
                window.open("/bargin_member/bargin/toUserBarginPage?type=1");
            },
            goToServerBargin() {
                window.open("/bargin_member/bargin/toUserBarginPage?type=2")
            },
            goToInfoCenter() {
                window.open("/helpMessage/memberMessList");
            },
            goToLoginOut() {
                window.location.href = '/loginOut?url=' + window.location.href;
            },
            goToAccountInformation() {
                window.open("/member_web/memberCenterIndex/index");
            },
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        filters: {
            formatNum(val) {
                if (val > 99) {
                    return "99+";
                } else {
                    return val;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../../assets/css/businessFunctionMenu';
</style>
