<template>
    <header :class="[changeTheme?'theme':'']">
        <div class="zmHead">
            <businessFunctionMenu></businessFunctionMenu>
            <div class="zm-topbar">
                <div class="zm-logo">
                    <a href="/">
                        <svg>
                            <use xlink:href="/images/index/icon/zumaIcon.svg#zm-logo"></use>
                        </svg>
                    </a>
                </div>
                <div class="zm-topbar-right" :style="{paddingRight:isLogin?'35px':'15px'}">
                    <div class="nav">
                        <a :href="item.href" v-for="(item,index) in nav" :target="item.target"
                           :class="{'checked':checkedNav==index && !isShowChecked}">
                            {{item.title}}
                        </a>
                    </div>
                    <div class="zm-panel" v-if="!isLogin">
                        <div class="zm-login btn"  @click.stop.prevent="goToLogin">登录</div>
                        <div class="zm-register btn" @click="goToRegister" >免费注册</div>
                    </div>
                    <div class="zm-panel1" v-if="isLogin">
                        <div class="zmUserImg">
                            <div @click.stop.prevent="goToMemberCenter">
                                <img :src="headImgSrc" alt="用户头像" @load="handleImg($event,40,40)">
                            </div>
                            <div>
                                <div></div>
                                <div @click.stop="openEntrepList">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 40 40.2" style="enable-background:new 0 0 40 40.2;" xml:space="preserve">
                    <g>
                      <path  style="fill:#333333;" d="M7.6,40.2c-2.1,0-3.9-1.7-3.9-3.9V23.5c0-0.6,0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1v12.9c0,0.9,0.8,1.7,1.7,1.7
                        h24.8c0.9,0,1.7-0.8,1.7-1.7V23.5c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1v12.9c0,2.1-1.7,3.9-3.9,3.9H7.6z"/>
                      <path  style="fill:#333333;" d="M34.2,21.2c-1.9,0-3.6-1-4.7-2.7c-1.1,1.7-2.8,2.7-4.7,2.7c-1.9,0-3.6-1-4.7-2.7c-1.1,1.7-2.8,2.7-4.7,2.7
                        s-3.6-1-4.7-2.7c-1.1,1.7-2.8,2.7-4.7,2.7c-3.2,0-5.8-2.9-5.8-6.4c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1l0,0l0,0c0,0,0-0.1,0-0.1l0,0
                        c0,0,0,0,0-0.1l6-13.7C6.2,0.3,6.6,0,7.1,0h25.9c0.4,0,0.8,0.3,1,0.7l6,13.7c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1l0,0l0,0
                        c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1C40,18.4,37.4,21.2,34.2,21.2z M29.5,13.8c0.6,0,1.1,0.5,1.1,1.1c0,2.3,1.6,4.2,3.6,4.2
                        c1.9,0,3.5-1.8,3.6-4L32.2,2.2H7.8L2.2,15.1c0.1,2.3,1.7,4,3.6,4c2,0,3.6-1.9,3.6-4.2c0,0,0-0.1,0-0.1c0.1-0.6,0.5-1,1.1-1
                        c0.6,0,1,0.4,1.1,1c0,0,0,0.1,0,0.1c0,2.3,1.6,4.2,3.6,4.2c2,0,3.6-1.9,3.6-4.2c0-0.6,0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1
                        c0,2.3,1.6,4.2,3.6,4.2c2,0,3.6-1.9,3.6-4.2C28.4,14.2,28.9,13.8,29.5,13.8z"/>
                    </g>
                  </svg>
                                    <span>我的主体</span>
                                </div>
                                <div @click.stop="goToProductOrder">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <path style="fill:none;stroke:#333333;stroke-width:2.4032;stroke-miterlimit:10;" d="M5.4,19.3h32.7c1.1,0,2,0.9,2.1,2l1.6,26.4c0.1,1.2-0.9,2.2-2.1,2.2H3.8c-1.2,0-2.2-1-2.1-2.2l1.6-26.4
                        C3.4,20.1,4.3,19.3,5.4,19.3z"/>
                      <path  style="fill:none;stroke:#333333;stroke-width:2.4032;stroke-linecap:round;stroke-miterlimit:10;" d="M12.1,22.9V11.5c0-5.1,4.2-9.3,9.3-9.3h0c5.1,0,9.3,4.2,9.3,9.3v11.4"/>
                      <circle  style="fill:#333333;" cx="12.1" cy="25" r="2.1"/>
                      <circle  style="fill:#333333;" cx="30.7" cy="25" r="2.1"/>
                    </g>
                  </svg>
                                    <span>购物订单</span>
                                </div>
                                <div @click.stop="goToServerOrder">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <path style="fill:#333333;" d="M34.6,30.2c-0.3,0-0.7-0.2-0.8-0.4c-0.2-0.2-0.1-0.1-0.2-0.3c0.1-0.3,0.2-0.5,0.4-0.6c2.7-1.8,5.7-6,5.7-9.5
                        c0-5.6-4.6-10.1-10.1-10.1c-2.7,0-5.2,1-7.1,2.9c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3c-2.2-2.2-5.3-3.3-8.5-2.8
                        C8,10,4.3,13.7,3.8,18.2c-0.5,4.3,1.7,8.3,5.5,10.2c0.5,0.2,0.8,0.8,0.6,1.3c-0.2,0.4-0.5,0.6-0.9,0.6c-0.2,0-0.3,0-0.5-0.1
                        c-4.2-2.1-6.7-6.3-6.7-10.9c0-6.7,5.5-12.2,12.2-12.2c2.8,0,5.6,1,7.8,2.8l0.1,0.1l0,0c1.6-1.3,3.4-2.2,5.4-2.6
                        c7.7-1.5,14.5,4.5,14.5,12c0,4.2-3.3,9-6.5,11.2C35,30.7,34.8,30.2,34.6,30.2z"/>
                      <path style="fill:#333333;" d="M33.3,34.6c-0.9,0-1.7-0.3-2.4-1l-4.3-4.3c-0.2-0.2-0.3-0.4-0.3-0.7s0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3
                        c0.3,0,0.5,0.1,0.7,0.3l4.3,4.3c0.2,0.2,0.6,0.4,0.9,0.4c0.4,0,0.7-0.1,0.9-0.4c0.2-0.2,0.4-0.6,0.4-0.9c0-0.4-0.1-0.7-0.4-0.9
                        L22,18.4c-0.2-0.2-0.3-0.4-0.3-0.7c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.5-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3l12.2,11.9
                        c1.3,1.3,1.3,3.4,0,4.7C35.1,34.2,34.2,34.6,33.3,34.6z"/>
                      <path style="fill:#333333;" d="M30.5,38.3c-0.9,0-1.7-0.3-2.4-1l-2.2-2.2c-0.4-0.4-0.4-1,0-1.4c0.2-0.2,0.4-0.3,0.7-0.3s0.5,0.1,0.7,0.3
                        l2.2,2.2c0.2,0.2,0.6,0.4,0.9,0.4c0.4,0,0.7-0.1,0.9-0.4c0.2-0.2,0.4-0.6,0.4-0.9c0-0.3-0.1-0.7-0.4-0.9l-5.8-5.8
                        c-0.2-0.2-0.3-0.4-0.3-0.7c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3l5.8,5.8c0.6,0.6,1,1.5,1,2.4
                        c0,0.9-0.3,1.7-1,2.4C32.2,37.9,31.3,38.3,30.5,38.3z"/>
                      <path style="fill:#333333;" d="M27.2,41.6c-0.9,0-1.7-0.3-2.4-1l-0.5-0.5c-0.2-0.2-0.3-0.4-0.3-0.7s0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3
                        c0.3,0,0.5,0.1,0.7,0.3l0.5,0.5c0.2,0.2,0.6,0.4,0.9,0.4c0.4,0,0.7-0.1,0.9-0.4c0.5-0.5,0.5-1.3,0-1.9l-1.1-1.1
                        c-0.2-0.2-0.3-0.4-0.3-0.7s0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3s0.5,0.1,0.7,0.3l1.1,1.1c1.3,1.3,1.3,3.4,0,4.7
                        C28.9,41.2,28.1,41.6,27.2,41.6z"/>
                      <path style="fill:#333333;" d="M23.9,44.8c-0.9,0-1.7-0.3-2.4-1L21,43.3c-0.2-0.2-0.3-0.4-0.3-0.7s0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3
                        c0.3,0,0.5,0.1,0.7,0.3l0.5,0.5c0.2,0.2,0.6,0.4,0.9,0.4c0.4,0,0.7-0.1,0.9-0.4c0.5-0.5,0.5-1.3,0-1.9l-0.5-0.5
                        c-0.4-0.4-0.4-1,0-1.4c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3l0.5,0.5c1.3,1.3,1.3,3.4,0,4.7
                        C25.6,44.5,24.8,44.8,23.9,44.8z M11.4,33.3c-0.9,0-1.7-0.3-2.4-1c-1.3-1.3-1.3-3.4,0-4.7l3.7-3.7c0.6-0.6,1.5-0.9,2.4-0.9
                        c0.9,0,1.8,0.3,2.4,0.9c0.6,0.6,1,1.5,1,2.4c0,0.9-0.3,1.7-1,2.4l-3.7,3.7C13.1,32.9,12.3,33.3,11.4,33.3z M15,25
                        c-0.3,0-0.7,0.1-0.9,0.4L10.4,29c-0.2,0.2-0.4,0.6-0.4,0.9c0,0.4,0.1,0.7,0.4,0.9c0.2,0.2,0.6,0.4,0.9,0.4h0c0.4,0,0.7-0.1,0.9-0.4
                        l3.7-3.7c0.2-0.2,0.4-0.6,0.4-0.9c0-0.3-0.1-0.7-0.4-0.9C15.7,25.1,15.4,25,15,25z"/>
                      <path style="fill:#333333;" d="M14.6,36.6c-0.9,0-1.7-0.3-2.4-1c-1.3-1.3-1.3-3.4,0-4.7l3.7-3.7c0.6-0.6,1.5-0.9,2.4-0.9
                        c0.9,0,1.8,0.3,2.4,0.9c1.3,1.3,1.3,3.4,0,4.7L17,35.6C16.4,36.2,15.5,36.6,14.6,36.6z M18.3,28.3c-0.3,0-0.7,0.1-0.9,0.4l-3.7,3.7
                        c-0.2,0.2-0.4,0.6-0.4,0.9c0,0.4,0.1,0.7,0.4,0.9c0.2,0.2,0.6,0.4,0.9,0.4l0,0c0.4,0,0.7-0.1,0.9-0.4l3.7-3.7
                        c0.5-0.5,0.5-1.3,0-1.9C19,28.4,18.7,28.3,18.3,28.3z"/>
                      <path style="fill:#333333;" d="M17.9,39.9c-0.9,0-1.7-0.3-2.4-1c-1.3-1.3-1.3-3.4,0-4.7l3.7-3.7c0.6-0.6,1.5-0.9,2.4-0.9
                        c0.9,0,1.8,0.3,2.4,0.9c1.3,1.3,1.3,3.4,0,4.7l-3.7,3.7C19.7,39.5,18.8,39.9,17.9,39.9z M21.6,31.6c-0.3,0-0.7,0.1-0.9,0.4L17,35.6
                        c-0.2,0.2-0.4,0.6-0.4,0.9c0,0.4,0.1,0.7,0.4,0.9c0.2,0.2,0.6,0.4,0.9,0.4l0,0c0.4,0,0.7-0.1,0.9-0.4l3.7-3.7
                        c0.5-0.5,0.5-1.3,0-1.9C22.3,31.7,22,31.6,21.6,31.6z"/>
                      <path style="fill:#333333;" d="M21.2,43.2c-0.9,0-1.7-0.3-2.4-1c-1.3-1.3-1.3-3.4,0-4.7l3.7-3.7c0.6-0.6,1.5-0.9,2.4-0.9
                        c0.9,0,1.8,0.3,2.4,0.9c1.3,1.3,1.3,3.4,0,4.7l-3.7,3.7C23,42.8,22.1,43.2,21.2,43.2z M24.9,34.8c-0.3,0-0.7,0.1-0.9,0.4l-3.7,3.7
                        c-0.5,0.5-0.5,1.3,0,1.9c0.2,0.2,0.6,0.4,0.9,0.4c0.4,0,0.7-0.1,0.9-0.4l3.7-3.7c0.2-0.2,0.4-0.6,0.4-0.9c0-0.4-0.1-0.7-0.4-0.9
                        C25.6,35,25.2,34.8,24.9,34.8z M17,22.9c-0.9,0-1.7-0.3-2.4-1c-1.3-1.3-1.3-3.4,0-4.7l6.9-6.5c0.2-0.2,0.4-0.3,0.7-0.3
                        c0.3,0,0.5,0.1,0.7,0.3c0.2,0.2,0.3,0.5,0.3,0.7c0,0.3-0.1,0.5-0.3,0.7l-6.9,6.4c-0.5,0.5-0.5,1.3,0,1.8c0.2,0.2,0.6,0.4,0.9,0.4
                        s0.7-0.1,0.9-0.4l4.1-3.6c0.2-0.2,0.4-0.2,0.7-0.2c0.3,0,0.6,0.1,0.8,0.4c0.4,0.4,0.3,1.1-0.1,1.4l-4.1,3.5
                        C18.8,22.5,17.9,22.9,17,22.9z"/>
                    </g>
                  </svg>
                                    <span>服务订单</span>
                                </div>
                                <div @click.stop="goToMyMusicList">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <path style="fill:#333333;" d="M24.8,35.6c-0.2,0-0.3,0-0.4-0.1l-0.1,0l0-0.1c-0.1-0.6,0.4-0.8,0.8-0.9c0.1,0,0.1,0,0.2-0.1
                        c2-0.9,3.3-2.4,4.3-4.8l0-0.1l0.1,0c0.1,0,0.1,0,0.1,0c0.1,0,0.3,0,0.4,0.1l0.1,0.1l0,0.1c0,1.2-0.7,2.5-2.1,3.8
                        c-0.5,0.5-1,1-1.6,1.3C26.1,35.2,25.4,35.6,24.8,35.6z"/>
                      <path style="fill:#333333;" d="M25.2,38c-0.3,0-0.5-0.1-0.6-0.3l0-0.1l0-0.1c0.2-0.6,0.6-0.7,1-0.7c0.1,0,0.2-0.1,0.3-0.1
                        c1.3-0.5,2.4-1.3,3.3-2.2c1.1-1.1,1.8-2.4,2.5-4.2c0.1-0.2,0.2-0.2,0.4-0.2c0.2,0,0.4,0.1,0.5,0.2l0.1,0.1l0,0.1
                        c-0.9,3.4-3.3,6-6.6,7.2L26,37.8C25.8,37.9,25.5,38,25.2,38z"/>
                      <path style="fill:#333333;" d="M26.3,40.4c-0.2,0-0.4-0.1-0.6-0.2l-0.1-0.1l0-0.1c0.1-0.6,0.7-0.8,1.2-0.9c0.1,0,0.2-0.1,0.3-0.1
                        c2.4-0.9,4.5-2.6,5.9-4.8c0.3-0.5,0.6-1.2,0.9-1.8c0.2-0.4,0.3-0.7,0.5-1.1c0.1-0.1,0.2-0.2,0.3-0.2l0.1,0l0.1,0.1c0,0,0.1,0,0.1,0
                        H35l0,0.2c0.1,1.2-0.5,2.2-1.1,3.2l-0.1,0.1c-1.4,2.4-3.7,4.3-6.4,5.4c-0.1,0-0.2,0.1-0.3,0.1C26.9,40.3,26.6,40.4,26.3,40.4z"/>
                    </g>
                    <g>
                      <path style="fill:#333333;" d="M12.6,22.5c0,0.2,0,0.3,0.1,0.4l0,0.1l0.1,0c0.6,0.1,0.8-0.4,0.9-0.8c0-0.1,0-0.1,0.1-0.2
                        c0.9-2,2.4-3.3,4.8-4.3l0.1,0l0-0.1c0-0.1,0-0.1,0-0.1c0-0.1,0-0.3-0.1-0.4l-0.1-0.1l-0.1,0c-1.2,0-2.5,0.7-3.8,2.1
                        c-0.5,0.5-1,1-1.3,1.6C13,21.1,12.6,21.8,12.6,22.5z"/>
                      <path style="fill:#333333;" d="M10.2,22c0,0.3,0.1,0.5,0.3,0.6l0.1,0l0.1,0c0.6-0.2,0.7-0.6,0.7-1c0-0.1,0.1-0.2,0.1-0.3
                        c0.5-1.3,1.3-2.4,2.2-3.3c1.1-1.1,2.4-1.8,4.2-2.5c0.2-0.1,0.2-0.2,0.2-0.4c0-0.2-0.1-0.4-0.2-0.5l-0.1-0.1l-0.1,0
                        c-3.4,0.9-6,3.3-7.2,6.6l-0.1,0.1C10.4,21.5,10.2,21.7,10.2,22z"/>
                      <path style="fill:#333333;" d="M7.8,21c0,0.2,0.1,0.4,0.2,0.6l0.1,0.1l0.1,0c0.6-0.1,0.8-0.7,0.9-1.2c0-0.1,0.1-0.2,0.1-0.3
                        c0.9-2.4,2.6-4.5,4.8-5.9c0.5-0.3,1.2-0.6,1.8-0.9c0.4-0.2,0.7-0.3,1.1-0.5c0.1-0.1,0.2-0.2,0.2-0.3l0-0.1l-0.1-0.1
                        c0,0,0-0.1,0-0.1v-0.2l-0.2,0c-1.2-0.1-2.2,0.5-3.2,1.1l-0.1,0.1c-2.4,1.4-4.3,3.7-5.4,6.4c0,0.1-0.1,0.2-0.1,0.3
                        C8,20.3,7.8,20.7,7.8,21z"/>
                    </g>
                    <g>
                      <g>
                        <path style="fill:#333333;" d="M21.7,8c9.9,0,18,8.1,18,18s-8.1,18-18,18s-18-8.1-18-18S11.8,8,21.7,8 M21.7,6c-11,0-20,9-20,20s9,20,20,20
                          s20-9,20-20S32.8,6,21.7,6L21.7,6z"/>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path style="fill:#333333;" d="M21.7,21c2.8,0,5,2.2,5,5c0,2.8-2.2,5-5,5s-5-2.2-5-5C16.7,23.3,19,21,21.7,21 M21.7,19.5
                          c-3.6,0-6.5,2.9-6.5,6.5s2.9,6.5,6.5,6.5s6.5-2.9,6.5-6.5S25.3,19.5,21.7,19.5L21.7,19.5z"/>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path style="fill:#333333;" d="M21.7,24.5c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5S20.9,24.5,21.7,24.5 M21.7,23.5
                          c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S23.1,23.5,21.7,23.5L21.7,23.5z"/>
                      </g>
                    </g>
                  </svg>
                                    <span>我的歌单</span>
                                </div>
                                <div @click.stop="goToMyVideoList">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <path  style="fill:none;stroke:#333333;stroke-width:2;stroke-miterlimit:10;" d="M28.2,44.6H5.8c-2.2,0-4-1.8-4-4V26.8c0-2.2,1.8-4,4-4h22.4c2.2,0,4,1.8,4,4v13.7
                        C32.2,42.8,30.4,44.6,28.2,44.6z"/>
                      <g>
                        <g>
                          <path  style="fill:#333333;" d="M8.3,10.2c3,0,5.4,2.4,5.4,5.4s-2.4,5.4-5.4,5.4s-5.4-2.4-5.4-5.4S5.3,10.2,8.3,10.2 M8.3,8.4
                            c-4,0-7.2,3.2-7.2,7.2s3.2,7.2,7.2,7.2s7.2-3.2,7.2-7.2S12.2,8.4,8.3,8.4L8.3,8.4z"/>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path style="fill:#333333;" d="M22.9,7.5c3.6,0,6.5,2.9,6.5,6.5s-2.9,6.5-6.5,6.5s-6.5-2.9-6.5-6.5S19.3,7.5,22.9,7.5 M22.9,5.7
                            c-4.6,0-8.3,3.7-8.3,8.3s3.7,8.3,8.3,8.3s8.3-3.7,8.3-8.3S27.5,5.7,22.9,5.7L22.9,5.7z"/>
                        </g>
                      </g>
                      <path style="fill:none;stroke:#333333;stroke-width:2;stroke-miterlimit:10;" d="M33,29v9.2l8.5,4.8c0.1,0,0.2,0,0.2-0.1V24.4c0-0.1-0.1-0.2-0.2-0.1L33,29z"/>
                      <circle style="fill:#333333;" cx="8.3" cy="15.7" r="2.7"/>
                      <ellipse transform="matrix(0.2873 -0.9578 0.9578 0.2873 2.9332 32.1479)" style="fill:#333333;" cx="23.1" cy="14.1" rx="3.5" ry="3.5"/>
                    </g>
                  </svg>
                                    <span>视频看单</span>
                                </div>
                                <div @click.stop="goToProductAfterSale">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <g>
                        <path  style="fill:none;stroke:#333333;stroke-width:1.5;stroke-miterlimit:10;" d="M15.4,15.2h12.7c0.4,0,0.8,0.3,0.8,0.8l0.6,10.3c0,0.5-0.3,0.9-0.8,0.9l-12.8-0.4c-0.5,0-1.9,0.1-1.9-0.4
                          l0.6-10.3C14.6,15.5,14.9,15.2,15.4,15.2z"/>
                        <path  style="fill:none;stroke:#333333;stroke-width:1.5;stroke-linecap:round;stroke-miterlimit:10;" d="M18,17.4v-5.3c0-2,1.6-3.6,3.6-3.6h0c2,0,3.6,1.6,3.6,3.6v5.3"/>
                        <circle  style="fill:#333333;" cx="18" cy="17.4" r="0.8"/>
                        <circle  style="fill:#333333;" cx="25.2" cy="17.4" r="0.8"/>
                      </g>
                      <g>
                        <path style="fill:none;stroke:#333333;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" d="M28.6,27.6c0,0,3.6-0.2,7.4-3.4c0.3-0.2,0.5-0.5,0.7-0.7c1.3-1.3,6-2.8,4.8,1c-0.2,0.7-0.5,1.3-0.9,1.8
                          C38.7,29,32.4,36.6,27,37c-4.6,0.3-8.2-0.2-10.5,0.1c-1.4,0.2-2.3,1.4-2.3,1.4l-7.8-6.7c0,0,5.5-7.7,14.6-4.7c2,0.7,8.5-1,8.9,2
                          c0.4,2.9-4.8,3.4-9.4,2.7"/>
                        <g>
                          <path  style="fill:#333333;" d="M5.6,33l7.6,6.6L11.7,41l-7.4-6.7L5.6,33 M5.5,30.4c-0.1,0-0.3,0.1-0.4,0.2L1.9,34c-0.2,0.2-0.2,0.5,0,0.7
                            l9.5,8.7c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.3,0,0.4-0.1l3.5-3.5c0.2-0.2,0.2-0.6,0-0.7l-9.9-8.6C5.7,30.5,5.6,30.4,5.5,30.4
                            L5.5,30.4z"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                                    <span>产品售后</span>
                                </div>
                                <div @click.stop="goToServerComplain">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <line style="fill:#333333;stroke:#333333;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" x1="2.2" y1="46.1" x2="32.4" y2="46.1"/>
                      <g>
                        <path style="fill:none;stroke:#333333;stroke-width:2;stroke-miterlimit:10;" d="M40.1,23.8L20.2,43.7c-1.6,1.6-4.1,1.6-5.7,0l-11-11C2,31.1,2,28.6,3.6,27L23.4,7.2c1.6-1.6,4.1-1.6,5.7,0
                          l11,11C41.7,19.7,41.7,22.2,40.1,23.8z"/>
                        <path style="fill:none;stroke:#333333;stroke-width:2;stroke-miterlimit:10;" d="M3,30l18.4-4.5c0.2-0.1,0.4-0.2,0.5-0.5l4.8-18.6c0.2-0.7-0.5-0.5-1.3-0.4c-0.4,0.1-2.2,1.3-2.5,1.6
                          c-1.1,1.1-19,19-19,19l-0.7,0.7c-0.5,0.6-0.8,1.4-0.7,2.1C2.6,29.9,2.7,30.1,3,30z"/>
                      </g>
                    </g>
                  </svg>
                                    <span>服务投诉</span>
                                </div>
                                <div @click.stop="goToMyComment">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <g>
                        <g>
                          <path  style="fill:#333333;" d="M21.7,8c9.7,0,17.8,7.9,18,17.6c0.1,4-1.1,7.8-3.4,11l-0.7,0.9l0.4,1c0.2,0.6,0.7,1.7,1.3,3.3
                            c-1.3-0.4-2.7-0.8-3.8-1.2l-0.9-0.3l-0.8,0.5c-3,2-6.5,3.1-10.1,3.1c-0.5,0-1,0-1.5-0.1c-8.8-0.7-15.9-7.9-16.5-16.7
                            c-0.3-5,1.4-9.7,4.7-13.4c3.4-3.7,8-5.7,12.9-5.8C21.5,8,21.6,8,21.7,8L21.7,8 M21.7,6c-0.1,0-0.2,0-0.3,0
                            C10.1,6.2,1,15.8,1.8,27.4c0.6,9.8,8.5,17.8,18.3,18.6c0.5,0,1.1,0.1,1.6,0.1c4.2,0,8-1.3,11.2-3.4c1.6,0.5,3.7,1.1,5.3,1.6
                            c0.1,0,0.3,0.1,0.4,0.1c0.8,0,1.5-0.8,1.2-1.7c-0.6-1.7-1.5-3.8-1.9-4.8c2.5-3.4,3.9-7.6,3.8-12.2C41.5,14.8,32.5,6,21.7,6
                            L21.7,6z"/>
                        </g>
                      </g>
                      <path style="fill:#333333;" d="M29.5,20.8c-2.1-2.1-5.5-2.2-7.7-0.2c-2.2-2-5.6-2-7.7,0.2c-1.1,1.1-1.6,2.5-1.6,4c0,1.5,0.6,3,1.6,4l6.5,6.6
                        c0.3,0.3,0.8,0.5,1.3,0.5c0.5,0,0.9-0.2,1.3-0.5l6.5-6.6c1.1-1.1,1.7-2.5,1.6-4C31.1,23.3,30.5,21.9,29.5,20.8L29.5,20.8z M28.2,28
                        l-6.1,6.2c-0.2,0.2-0.6,0.2-0.8,0c0,0,0,0,0,0L15.3,28c-0.8-0.8-1.2-1.9-1.2-3c0-1.1,0.4-2.2,1.2-3c1.6-1.6,4.1-1.6,5.7-0.1
                        l0.7,0.7l0.7-0.7c1.6-1.5,4.2-1.5,5.7,0.1c0.8,0.8,1.2,1.9,1.2,3C29.4,26.1,29,27.2,28.2,28L28.2,28z"/>
                    </g>
                  </svg>
                                    <span>我的评价</span>
                                </div>
                                <div @click.stop="goToAccountInformation">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <path  style="fill:none;stroke:#000000;stroke-width:3.2245;stroke-linecap:round;stroke-miterlimit:10;" d="M41.7,35.5"/>
                      <g>
                        <g>
                          <path  style="fill:#333333;" d="M20.8,6.3c4.3,0,7.8,3.5,7.8,7.8s-3.5,7.8-7.8,7.8S13,18.4,13,14.1S16.5,6.3,20.8,6.3 M20.8,4.3
                            c-5.4,0-9.8,4.4-9.8,9.8s4.4,9.8,9.8,9.8s9.8-4.4,9.8-9.8S26.2,4.3,20.8,4.3L20.8,4.3z"/>
                        </g>
                      </g>
                      <path style="fill:none;stroke:#333333;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" d="M15.5,44.9h-5.1c-4.8,0-8.7-3.9-8.7-8.7v0c0-4.8,3.9-8.7,8.7-8.7h20.1"/>
                      <path style="fill:#333333;" d="M35.1,37.1h-13c-0.7,0-1.3-0.6-1.3-1.3v0c0-0.7,0.6-1.3,1.3-1.3h13c0.7,0,1.3,0.6,1.3,1.3v0
                        C36.4,36.5,35.8,37.1,35.1,37.1z"/>
                      <path style="fill:#333333;" d="M38.2,45.7H21.7c-0.7,0-1.3-0.6-1.3-1.3v0c0-0.7,0.6-1.3,1.3-1.3h16.5c0.7,0,1.3,0.6,1.3,1.3v0
                        C39.5,45.2,38.9,45.7,38.2,45.7z"/>
                    </g>
                  </svg>
                                    <span>账户信息</span>
                                </div>
                                <div @click.stop="goToUpdatePassword">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <path  style="fill:none;stroke:#333333;stroke-width:2;stroke-miterlimit:10;" d="M33.6,45.5H9.8c-3.9,0-7.1-3.2-7.1-7.1V27.9c0-3.9,3.2-7.1,7.1-7.1h23.8c3.9,0,7.1,3.2,7.1,7.1v10.5
                        C40.7,42.3,37.6,45.5,33.6,45.5z"/>
                      <circle  style="fill:none;stroke:#333333;stroke-width:2;stroke-miterlimit:10;" cx="21.7" cy="30.5" r="4"/>
                      <line  style="fill:none;stroke:#333333;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" x1="21.7" y1="34.4" x2="21.7" y2="41"/>
                      <path  style="fill:none;stroke:#333333;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;" d="M31.9,20.8H11.6v-4.1c0-5.6,4.5-10.2,10.2-10.2h0c5.6,0,10.2,4.5,10.2,10.2V20.8z"/>
                    </g>
                  </svg>
                                    <span>修改密码</span>
                                </div>
                                <div @click.stop="goToLoginOut">
                                    <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       viewBox="0 0 44 52" style="enable-background:new 0 0 44 52;" xml:space="preserve">
                    <g>
                      <path  style="fill:none;stroke:#333333;stroke-width:3;stroke-linecap:round;stroke-miterlimit:10;" d="M30.4,11c6.1,3.1,10.3,9.5,10.3,16.9c0,10.5-8.5,19-19,19s-19-8.5-19-19c0-6.6,3.3-12.3,8.4-15.8"/>
                      <line  style="fill:none;stroke:#333333;stroke-width:3;stroke-linecap:round;stroke-miterlimit:10;" x1="21.7" y1="5.1" x2="21.7" y2="25.7"/>
                    </g>
                  </svg>
                                    <span>退出登录</span>
                                </div>
                            </div>
                        </div>
                        <div class="zm-register btn" @click="goToBack">后台管理</div>
                    </div>
                </div>
            </div>
        </div>
    </header>

</template>
<script>
    import businessFunctionMenu from '~/components/public/head/businessFunctionsMenu';
    import publicUtil from '~/common/publicUtil';
    import MusicPlayer from "~/common/musicPlayer";

    export default {
        name: 'zmHead',
        components: {
            businessFunctionMenu
        },
        props: ['changeTheme', 'jzDomain','isShowChecked'],
        data() {
            return {
                nav: [{
                    title: '首页',
                    href: '/',
                    target: '_self'
                },
                    {
                        title: '建站',
                        href: this.jzDomain,
                        target: '_blank'
                    },
                    {
                        title: '购物',
                        href: '/gouwu',
                        target: '_blank',
                    },
                    {
                        title: '服务',
                        href: '/fuwu',
                        target: '_blank',
                    },
                    {
                        title: '资讯',
                        href: '/zixun',
                        target: '_blank',
                    },
                    {
                        title: '帮助中心',
                        href: '/bangzhu',
                        target: '_blank',
                    }],
                checkedNav: 0,
                headImgSrc: '/shop_web/shop/images/user-default.png',
            }
        },
        methods: {
            handleImg(e, maxWidth, maxHeight) {
                publicUtil.handleImg(e, maxWidth, maxHeight);
            },
            goToLogin() {
                window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
            },
            goToRegister() {
                window.location.href = '/zhuce?url=' + encodeURIComponent(window.location.href);
            },
            goToMemberCenter() {
                window.open("/member/index");
            },
            goToBack() {
                this.$store.commit('requestLoginInfo', {
                    noLoginCallBack: () => {
                        window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
                    },
                    loginCallBack: () => {
                        this.$store.commit("changePopupConfig", {
                            isShow: true,
                            module: 1,//进入主体后台
                            type: 'entrep'
                        })
                    }
                })
            },
            goToProductOrder() {
                window.open('/pOrder_web/productOrder/memberList');
            },
            goToServerOrder() {
                window.open('/sorder_web/serviceOrder/list');
            },
            goToMyMusicList() {
                let musicPlayer = new MusicPlayer();
                musicPlayer.toMusicPlayer(null, 0, 0, null, 3);
            },
            goToMyVideoList() {
                window.open('/video_web/shopVideoWatchOrder/videolist');
            },
            goToProductAfterSale() {
                window.open('/memberAfterSalePC/buyerAfterSaleList');
            },
            goToServerComplain() {
                window.open('/memberServiceComplain/memberServiceHandle');
            },
            goToMyComment() {
                window.open('/comment/toWaitingComment');
            },
            goToAccountInformation() {
                window.open("/member_web/memberCenterIndex/index");
            },
            goToUpdatePassword() {
                window.open('/member_web/safeSet/editPassword');
            },
            goToLoginOut() {
                window.location.href = '/loginOut?url=' + window.location.href;
            },
            openEntrepList() {
                this.$store.commit("changePopupConfig", {
                    isShow: true,
                    module: 1,//直接进主体后台
                    type: 'entrep'
                })
            },
        },
        created() {
            this.$axios.get(this.interfaceApi.getLoginStatus).then((res) => {
                if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 0) {
                        if (data.data === 0) {
                            this.$store.commit("changeLoginStatus", false);
                        } else {
                            this.$store.commit("changeLoginStatus", true);
                            this.$axios.get(this.interfaceApi.getUserBasicInfo).then((res) => {
                                if (res.status === 200) {
                                    let data = res.data;
                                    if (data.status === 0) {
                                        if (data.data.user.userHead) {
                                            this.headImgSrc = data.data.user.userHead;
                                        }
                                        this.$store.commit("changeUserBasicInfo", data.data);
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
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },

    }
</script>

<style lang="less" scoped>
    @baseColor: #ffffff;
    @baseColor0: #444444;
    @baseColor1: #00b9f2;
    @baseColor2: #00AFEC;
    .zmHead {
        background: rgba(255, 255, 255, 0);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 150;
        .zm-topbar {
            max-width: 1240px;
            min-width: 1200px;
            margin: 0 auto;
            font-size: 16px;
            width: 100%;

            .zm-logo {
                float: left;
                padding-top: 14px;
                padding-left: 15px;
                svg {
                    width: 111px;
                    height: 40px;
                    fill: @baseColor;
                }
            }
            .zm-topbar-right {
                float: right;
                height: 70px;
                line-height: 70px;
                padding-right: 35px;
                font-size: 16px;
                .nav {
                    display: inline-block;
                    a {
                        color: @baseColor;
                        height: 40px;
                        width: 100px;
                        display: inline-block;
                        text-align: center;
                        line-height: 40px;
                        border-radius: 5px;
                        &:hover {
                            color: @baseColor1;
                        }
                    }
                    a.checked {
                        // background: @baseColor;
                        color: @baseColor1;
                        font-weight: 700;
                    }

                }
                .zm-panel {
                    float: right;
                    padding-left: 20px;
                    width: 244px;
                    display: flex;
                    flex-direction: row-reverse;
                    .zm-register {
                        width: 120px;
                        height: 34px;
                        line-height: 34px;
                        background: @baseColor;
                        color: #00b9f2;
                        &:hover {
                            color:#00abeb;
                        }
                    }
                    .zm-login {
                        width: 80px;
                        height: 34px;
                        line-height: 32px;
                        border: 1px solid rgba(255, 255, 255, 1);
                        color: @baseColor;
                        margin-left: 18px;
                        &:hover {
                            background:rgba(255,255,255,.1);
                        }
                    }
                    .btn {
                        text-align: center;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 14px;
                        // font-weight: 700;
                        // letter-spacing: 1px;
                        margin-top: 18px;
                    }

                }
                .zm-panel1 {
                    float: right;
                    padding-left: 20px;
                    width: 210px;
                    display: flex;
                    flex-direction: row-reverse;
                    .zm-register {
                        width: 120px;
                        height: 34px;
                        line-height: 34px;
                        background: @baseColor;
                        color: #00b9f2;
                        &:hover {
                            color:#00abeb;
                        }
                    }
                    .zmUserImg {
                        width: 40px;
                        height: 40px;
                        margin-left: 30px;
                        margin-top: 15px;
                        position: relative;
                        cursor: pointer;
                        & > div:nth-child(1) {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            overflow: hidden;
                        }
                        &:hover>div:nth-child(2){
                            display: inline-block;
                        }
                        & > div:nth-child(2) {
                            width: 130px;
                            height: 437px;
                            border-radius: 6px;
                            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                            position: absolute;
                            top: 50px;
                            left: -50px;
                            background: #ffffff;
                            display: none;
                            & > div:nth-child(1) {
                                width: 40px;
                                height: 10px;
                                position: absolute;
                                left: 17px;
                                top: -10px;
                                cursor: auto;
                                &:hover {
                                    background: transparent;
                                }
                            }
                            & > div {
                                width: 100%;
                                height: 40px;
                                display: flex;
                                align-items: center;
                                cursor: pointer;
                                &:hover {
                                    background: rgba(61, 155, 233, 0.1);
                                }
                                & > svg {
                                    width: 18px;
                                    height: 18px;
                                    margin-left: 20px;
                                }
                                & > span {
                                    font-size: 13px;
                                    color: #333333;
                                    margin-left: 10px;
                                }
                            }
                        }
                    }
                    .btn {
                        text-align: center;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 700;
                        letter-spacing: 1px;
                        margin-top: 18px;
                    }

                }
            }
        }

    }

    .theme {
        .zmHead {
            transition: all .3s;
            background: rgba(255, 255, 255, 1);
            box-shadow: 1px 1px 1px rgba(18, 47, 70, 0.1);
            .zm-logo {
                svg {
                    fill: @baseColor2;
                }
            }
            .zm-topbar-right {
                .nav {
                    a {
                        color: @baseColor0;
                    }
                    a.checked {
                        // background: @baseColor;
                        color: @baseColor1;
                        font-weight: 700;
                    }
                }
                .zm-panel,.zm-panel1 {
                    .zm-register {
                        background: #00b9f2;
                        color: @baseColor;
                        &:hover {
                            color:@baseColor;
                            background:#00abeb;
                        }
                    }
                    .zm-login {
                        border: 1px solid #00b9f2;
                        background:@baseColor;
                        color:#00b9f2;
                        &:hover {
                            background:#00abeb;
                            color:#ffffff;
                        }
                    }
                }
            }
        }
    }
</style>
