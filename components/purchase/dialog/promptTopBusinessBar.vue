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
                <div id="chooseAddress">
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
                </div>
            </div>
            <div>
                <div v-show="!isLogin">
                    <span>登录</span>
                    <span>免费注册</span>
                </div>
                <div v-show="isLogin">
                    <div>
                        <span>您好，</span>
                        <span>{{nickName}}</span>
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
                        <div>账户管理</div>
                        <div>退出登录</div>
                        <div><span>消息</span><span>{{informationNum | formatNum}}</span></div>
                    </div>
                </div>
                <div class="line"></div>
                <div>
                    <div>
                        <span>我的主体</span>
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
                        <div>
                            <vue-scroll v-if="isShowScroll" :ops="ops">
                                <div class="siteList" v-show="isLogin">
                                    <div v-for="(item,index) in websiteList" class="siteItem" :key="index">
                                        {{item.fName}}
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
                                        <div>现在注册！</div>
                                    </div>
                                </div>
                            </vue-scroll>
                        </div>
                        <div>
                            <span>+</span>
                            <span>添加新主体</span>
                        </div>
                    </div>
                </div>
                <div class="line"></div>
                <div>
                    <div>
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
                        <div>购物车</div>
                        <div>产品订单</div>
                        <div>产品议价单</div>
                        <div>服务订单</div>
                        <div>服务议价单</div>
                    </div>
                </div>
                <div class="line"></div>
                <div>
                    <div>族蚂网首页</div>
                </div>
                <div class="line"></div>
                <div>会员中心</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "businessFunctionsMenu",
        data() {
            return {
                location: "上海",
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
                        keepShow:true,
                    }
                },
                isShowScroll: false,
                isLogin:false,
                websiteList:[]
            }
        },
        mounted() {
            this.isShowScroll = true;
        },
        methods: {

        },
        computed: {

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
    .businessFunctionMenu {
        background: #f2f2f2;
        width: 100%;
        color: #333333;
        font-size: 12px;
        position: relative;
        z-index: 150;
        & > div {
            width: 100%;
            max-width: 1260px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            height: 30px;
            min-width: 768px;
            padding-left: 30px;
            padding-right: 20px;
            justify-content: space-between;
            & > div:nth-child(1) {
                display: flex;
                align-items: center;
                & > svg {
                    width: 14px;
                    height: 19px;
                }
                & > div {
                    margin-left: 10px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    width: 52px;
                    position: relative;
                    & > svg {
                        width: 11px;
                        height: 16px;
                        margin-left: 5px;
                        fill: #666666;
                        transform: rotate(0deg);
                        transition: transform 0.5s;
                        &.arrowRotate {
                            transform: rotate(-180deg);
                        }
                    }
                }
            }
            & > div:nth-child(2) {
                display: flex;
                align-items: center;
                & > div {
                    display: flex;
                    align-items: center;
                    padding: 0 10px;
                    position: relative;
                }
                & > .line {
                    padding: 0;
                    width: 1px;
                    height: 8px;
                    background: #333333;
                }
                & > div:nth-child(1) {
                    & > span {
                        cursor: pointer;
                        height: 30px;
                        display: flex;
                        align-items: center;
                    }
                    & > span:hover {
                        background: #ffffff;
                    }
                    & > span:nth-child(2) {
                        margin-left: 10px;
                    }
                }
                & > div:nth-child(2) {
                    cursor: pointer;
                    height: 30px;
                    &:hover {
                        background: #ffffff;
                        & > div:nth-child(1) {
                            & > svg {
                                transform: rotate(-180deg);
                            }
                        }
                        & > div:nth-child(2) {
                            display: flex;
                        }
                    }
                    & > div:nth-child(1) {
                        display: flex;
                        align-items: center;
                        & > svg {
                            width: 11px;
                            height: 16px;
                            margin-left: 5px;
                            fill: #666666;
                            transform: rotate(0deg);
                            transition: transform 0.5s;
                        }
                        & > span:nth-child(2) {
                            max-width: 96px;
                            height: 17px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                    & > div:nth-child(2) {
                        position: absolute;
                        right: 0;
                        top: 30px;
                        background: #ffffff;
                        box-shadow: 0 2px 2px 0 #ddd;
                        width: 68px;
                        display: none;
                        flex-direction: column;
                        & > div {
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 30px;
                        }
                        & > div:hover {
                            background: #f5f5f5;
                        }
                        & > div:nth-child(3) {
                            & > span:nth-child(2) {
                                color: #cc3333;
                            }
                        }
                    }
                }
                & > div:nth-child(4) {
                    height: 30px;
                    &:hover {
                        background: #ffffff;
                        & > div:nth-child(1) {
                            & > svg {
                                transform: rotate(-180deg);
                            }
                        }
                        & > div:nth-child(2) {
                            display: flex;
                        }
                    }
                    & > div:nth-child(1) {
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        & > svg {
                            width: 11px;
                            height: 16px;
                            margin-left: 5px;
                            fill: #666666;
                            transform: rotate(0deg);
                            transition: transform 0.5s;
                        }
                    }
                    & > div:nth-child(2) {
                        display: none;
                        position: absolute;
                        top: 30px;
                        left: 0;
                        width: 260px;
                        background: #ffffff;
                        height: 180px;
                        box-shadow: 0 2px 2px 0 #ddd;
                        flex-direction: column;
                        & > div:nth-child(1) {
                            width: 100%;
                            height: 150px;
                            .siteList {
                                width: 260px;
                                .siteItem {
                                    padding-left: 10px;
                                    width: 100%;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    height: 30px;
                                    line-height: 30px;
                                    cursor: pointer;
                                    &:hover {
                                        background: #F5F5F5;
                                    }
                                }
                            }
                            & .noLoginContent {
                                position: relative;
                                & > svg {
                                    position: absolute;
                                    top: 20px;
                                    left: 20px;
                                    width: 56px;
                                    height: 56px;
                                }
                                & > div {
                                    position: absolute;
                                    top: 30px;
                                    left: 85px;
                                    & > div:nth-child(2) {
                                        margin-top: 5px;
                                    }
                                    & > div:nth-child(2):hover {
                                        text-decoration: underline;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                        & > div:nth-child(2) {
                            width: 100%;
                            height: 30px;
                            background: #f2f2f2;
                            line-height: 30px;
                            padding: 0 8px;
                            text-align: right;
                            border-top: 1px solid #d7d7d7;
                            & > span:nth-child(1) {
                                width: 14px;
                                height: 14px;
                                background: #434343;
                                text-align: center;
                                line-height: 12px;
                                font-size: 12px;
                                border-radius: 2px;
                                color: #fff;
                                display: inline-block;
                            }
                            & > span:nth-child(2) {
                                cursor: pointer;
                                &:hover {
                                    color: #4BB1A6;
                                }
                            }
                        }
                    }
                }
                & > div:nth-child(6) {
                    height: 30px;
                    &:hover {
                        background: #ffffff;
                    }
                    & > div:nth-child(1) {
                        display: flex;
                        align-items: center;
                        font-size: 12px;
                        cursor: pointer;
                        & > svg {
                            width: 15px;
                            height: 13px;
                        }
                        & > span:nth-child(2) {
                            color: #333333;
                            margin-left: 10px;
                        }
                        & > span:nth-child(3) {
                            color: #CC3333;
                        }
                    }
                }
                & > div:nth-child(8) {
                    height: 30px;
                    &:hover {
                        background: #ffffff;
                        & > div:nth-child(1) {
                            & > svg {
                                transform: rotate(-180deg);
                            }
                        }
                        & > div:nth-child(2) {
                            display: inline-block;
                        }
                    }
                    & > div:nth-child(1) {
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        & > svg {
                            width: 11px;
                            height: 16px;
                            margin-left: 5px;
                            fill: #666666;
                            transform: rotate(0deg);
                            transition: transform 0.5s;
                        }
                    }
                    & > div:nth-child(2) {
                        position: absolute;
                        top: 30px;
                        width: 100%;
                        heght: 150px;
                        background: #fff;
                        box-shadow: 0 2px 2px 0 #ddd;
                        left: 0;
                        display: none;
                        & > div {
                            display: flex;
                            align-items: center;
                            height: 30px;
                            cursor: pointer;
                            justify-content: center;
                            &:hover {
                                background: #f5f5f5;
                            }
                        }
                    }
                }
                & > div:nth-child(10) {
                    height: 30px;
                    &:hover {
                        background: #ffffff;
                    }
                    & > div:nth-child(1) {
                        cursor: pointer;
                    }
                }
                & > div:nth-child(12) {
                    height: 30px;
                    &:hover {
                        background: #ffffff;
                    }
                    cursor: pointer;
                }
            }
        }
    }
</style>
