<template>
    <div>
        <div class="searchval" v-if="isSearching">
            <div>
                <template v-if="!toploadingshow">搜索到<span>{{'"'+ obj.keyWord+'"'}}</span>相关结果{{ searchconut | toMoney}}个
                </template>
            </div>
            <loadingImg style="position:absolute;left:50%;top:10px;margin-left:-70px;" v-show="toploadingshow"/>
        </div>
        <template v-else>
            <banner/>

            <template>
                <div class="searchWrap" style="background:transparent">
                    <div class="search">
                        <div>筛选条件</div>
                        <div class="sBox" @click.stop="showFirst">
                            <span>{{firstCon}}</span>
                            <svg t="1554979981658" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="1964"
                                 xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15">
                                <path class="down" d="M862.752 326.016H161.248l349.696 371.936L862.72 326.016z"
                                      p-id="1965"></path>
                            </svg>
                            <ul v-show='firstListShow' v-clickoutside="handleClose" id="box1">
                                <li v-for="(item,index) in firstList" :key='index'
                                    :class="{'checked':firstCategoryId==item.fId}">
                                    <a :href="'/jzmuban/'+item.fId">{{item.fCategoryName}}</a>
                                </li>
                            </ul>
                        </div>
                        <div :class="{'lockstyle':secondList.length===0,'sBox':true}" @click.stop="showSecond">
                            <span>{{secondCon}}</span>
                            <svg t="1554979981658" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="1964"
                                 xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15">
                                <path class="down" d="M862.752 326.016H161.248l349.696 371.936L862.72 326.016z"></path>
                            </svg>
                            <ul v-show='secondListShow' v-clickoutside="handleClose" id="box2">
                                <li v-for="(item,index) in secondList" :key='index'
                                    :class="{'checked':secondCategoryId==item.fId}">
                                    <a :href="'/jzmuban/'+firstCategoryId+'_'+item.fId">{{item.fCategoryName}}</a>
                                </li>
                            </ul>
                        </div>

                        <div class="sBox" @click.stop="showThird">
                            <span>{{thirdCon}}</span>
                            <svg t="1554979981658" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="1964"
                                 xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15">
                                <path class="down" d="M862.752 326.016H161.248l349.696 371.936L862.72 326.016z"
                                      p-id="1965"></path>
                            </svg>
                            <ul v-show='thirdListShow' v-clickoutside="handleClose" id="box3">
                                <li v-for="(item,index) in thirdList" :key='index'
                                    @click.stop.prevent="thirdListClick(item,index)"
                                    :class="{'checked':thirdMarker==index}">
                                    {{item}}
                                </li>
                            </ul>
                        </div>
                        <div class="sBox" @click.stop="showHot" >
                            <span>{{hotCon}}</span>
                            <svg t="1554979981658" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="1964"
                                 xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15">
                                <path class="down" d="M862.752 326.016H161.248l349.696 371.936L862.72 326.016z"
                                      p-id="1965"></path>
                            </svg>
                            <ul v-show='hotListShow' v-clickoutside="handleClose" id="box4">
                                <li v-for="(item,index) in hotList" :key='index'
                                    @click.stop.prevent="hotListClick(item,index)"
                                    :class="{'checked':hotMarker==index}">
                                    {{item}}
                                </li>
                            </ul>
                        </div>

                        <div @click.stop.prevent="emptyClick">清空选项</div>
                        <div class='clear'></div>
                    </div>
                </div>
            </template>
            <div :style="{height:(!isSearching?'30px':'auto'),marginTop:(!isSearching?'-10px':'0px')}">
                <loadingImg v-show="toploadingshow" :style="{height:!isSearching?'0px':'30px'}"/>
            </div>
        </template>
        <div class="websiteWrap"
             :style="{marginTop:(isSearching?'-40px':'0px'),maxWidth:maxWidth+'px',minHeight:'300px'}"
             v-show="!searchconut==0">
            <div class="zm-templates-item" v-for="(item,index) in lists" :key="index">
                <div class="zm-templates-pc">
                    <div class="zm-pc-top">
                        <i></i><i></i><i></i>
                    </div>
                    <div class="zm-pc-img">
                        <img :src="item.fUrl ? item.fUrl:'/images/template/u495.png'"
                             @load="handleImg($event,340,220)" />
                        <div class="zm-templates-mask zm-template-use">
                            <span class="zm-template-free"
                                  @click="usethemodule(item)">{{!item.fIsFree?'使用':'申请免费'}}</span>
                            <a class="zm-template-preview"
                                  @click="preview(item.fId)" :href="'/pre/'+item.fTemplateId.toLowerCase()" target="_blank">预览</a>
                            <div class="zm-templates-ph">
                                <div class="zm-ph-top">
                                    <div class="zm-ph-line"></div>
                                </div>
                                <div class="zm-ph-body">
                                    <div class="zm-ph-img">
                                        <img :src="item.fUrl2 ? item.fUrl2 :'/images/template/u495.png'"
                                             @load="handleImg($event,112,190)"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="zm-template-details">
                    <div>
                        <div class="zm-template-name">{{item.fName}}</div>
                        <div v-if="item.fUseTime > 20">
                            <span>已使用：</span>
                            <div>{{item.fUseTime}}</div>
                        </div>
                        <div v-else>
                            <img src="/images/template/new.png" alt="">
                        </div>
                    </div>
                    <div class="zm-template-price orangeColor">
                        {{item.fIsFree?'￥'+item.fAmount.toFixed(2)+'/签到免费':'免费'}}
                    </div>
                </div>
            </div>
            <div class="zm-templates-item" v-for="(item,index) of emptynum" :key="index+Math.random()">
            </div>
        </div>
        <toTop v-if="toTopShow"/>
        <!-- 搜索没有结果提示 -->
        <template>
            <div v-if="zerotip" class="noinfotisi">
                抱歉！没有找到符合条件的网站模板，查看 <a :href="mubanUrl" target="_blank">行业模板分类</a>
            </div>
        </template>
        <loadingImg v-show="loading"/>
        <p class="lowest" v-if="noMore" v-show="nodatatip">已经到底了！</p>
        <websitePopup v-if="popupConfig.isShow && popupConfig.type === 'website'"></websitePopup>
        <useTemplateTip></useTemplateTip>
    </div>
</template>

<script>
    import loadingImg from '~/components/public/loading'
    import toTop from "~/components/public/toTop.vue";
    import banner from "~/components/template/banner";
    import publicUtil from '~/common/publicUtil';
    import websitePopup from '~/components/public/dialog/websitePopup';
    import useTemplateTip from '~/components/public/dialog/useTemplateTip';

    export default {
        name: "website",
        props: ['pageData'],
        components: {
            loadingImg,
            toTop,
            banner,
            websitePopup,
            useTemplateTip
        },
        data() {
            return {
                lists: [],
                page: 0,
                // 每页多少条数据
                limit: 3,
                // 是否有更多数据
                maxWidth: null,
                firstCon: '模板大类',
                firstListShow: false,
                firstList: [],
                firstCategoryId:null,
                secondCon: '模板小类',
                secondListShow: false,
                secondList: [],
                secondCategoryId:null,
                optionLoading: false,
                emptynum: 0,
                thirdCon: '价格',
                thirdList: ['免费', '<50元', '50~100元', '100~200元', '≥200元'],
                thirdListShow: false,
                thirdMarker: null,
                hotCon: '热度',
                hotList: ['最新发布', '使用次数由高到低', '使用次数由低到高'],
                hotListShow: false,
                hotMarker: null,
                isSearching: false,
                obj: null,
                searchconut: 0,
                // 置顶
                toTopShow: false,
                // 没有更多数据
                noMore: false,
                // 搜索状态头部点点点加载
                toploading: true,
                // 底部点点点加载
                loading: false,
                // 每次请求条数
                count: 0,
                // 总条数
                allcount: 0,
                //标记第一次加载的数据后，是否还有数据   false 有数据  true 没数据
                firstsign: true,
                //已经到底啦提示
                nodatatip: true,
                //搜索为0的提示
                zerotip: false,
                toploadingshow: false,
                isShowOfficially: false,
                searchWord: null,
            }
        },
        created() {
            this.firstList = this.pageData.templateBigCategory;
            this.secondList = this.pageData.templateSmallCategory;
            this.firstCategoryId = this.pageData.templateBigCategoryId;
            this.secondCategoryId = this.pageData.templateSmallCategoryId;
            this.firstCon = this.pageData.templateBigCategoryName;
            this.secondCon = this.pageData.templateSmallCategoryName;
            this.obj = this.pageData.obj;
            if (this.obj.keyWord != null) {
                this.isSearching = true;
                this.searchWord = this.obj.keyWord;
            } else {
                this.isSearching = false
            }

            this.selectload()
        },
        methods: {
            jsonP(obj) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: obj.url,
                        type: obj.type,
                        data: obj.data,
                        async: obj.async,
                        dataType: obj.dataType,
                        jsonpCallback: obj.jsonpCallback ? obj.jsonpCallback : false,
                        beforeSend: function () {
                            obj.beforeFn && obj.beforeFn()
                        },
                        success: function (data) {
                            resolve(data)
                        },
                        error: function (event) {
                            reject(event)
                        },
                        complete: function () {
                            obj.successFn && obj.successFn()
                        }
                    })
                })
            },
            //间隔时间设置，这里是设置几秒后请求数据
            doubleAfter1seconds(num) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(2 * num);
                    }, 0)
                })
            },
            //请求数据
            async loadMore() {
                // 没有正在加载中才会请求数据
                if (!this.loading) {
                    if (this.noMore) {
                        this.loading = false
                        return
                    }
                    this.loading = true
                    let res = await this.doubleAfter1seconds(30);
                    this.obj.pageNow = this.obj.pageNow + 1;

                    // 请求下一页数据
                    const response = this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getTemplateList, this.obj))

                    let newData = response.content;
                    this.limit = response.count;
                    this.count = newData.length
                    // 数据不够一页且大于0肯定没更多数据了
                    if (this.count < this.obj.pageSize && this.count > 0) {
                        this.noMore = true;
                        this.loading = false;
                        this.lists = this.lists.concat(newData);
                        console.log(this.windowWidth, '加载最后一页时，监听window宽度')
                        this.replenish(this.windowWidth, this.count)
                    } else {
                        // 数据刚好为一页默认有更多数据

                        this.noMore = false
                        this.lists = this.lists.concat(newData)
                        this.loading = false
                    }
                }
            },

            //选择加载数据
            async selectload() {
                this.nodatatip = false;
                this.zerotip = false;
                this.obj.pageNow = 1;
                this.toploadingshow = true;
                if (this.obj.fAmount != null || this.obj.hot != null) {
                    this.lists = (this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getTemplateList, this.obj)) ? this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getTemplateList, this.obj)).content : '');
                    this.searchconut = (this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getTemplateList, this.obj)) ? this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getTemplateList, this.obj)).count : 0);
                    this.count = this.lists.length;
                } else {
                    this.lists = this.pageData.templateList.content;
                    this.searchconut = this.pageData.templateList.count;
                    this.count = this.pageData.templateList.content.length;
                }

                if (this.count < this.obj.pageSize) {
                    this.noMore = true;
                    this.firstsign = true;
                    if (this.count == 0) {
                        this.zerotip = true;
                        this.nodatatip = false;
                    } else if (this.count > 0) {
                        this.nodatatip = true;
                    }
                    this.replenish(this.windowWidth, this.count)
                } else {
                    this.noMore = false;
                    this.nodatatip = true;
                    this.firstsign = false;
                }
                this.toploadingshow = false;
            },
            //显示大类列表
            showFirst() {
                if (this.firstListShow === false) {
                    this.firstListShow = true;
                } else {
                    this.firstListShow = false;
                }
                this.secondListShow = false;
                this.thirdListShow = false;
                this.hotListShow = false;
            },
            //显示小类列表
            showSecond() {
                if (!this.secondIsOn) {
                    if (this.secondListShow === false) {
                        this.secondListShow = true;
                    } else {
                        this.secondListShow = false;
                    }
                    this.firstListShow = false;
                    this.thirdListShow = false;
                    this.hotListShow = false;
                }
            },
            //显示价格列表
            showThird() {
                this.thirdListShow ? this.thirdListShow = false : this.thirdListShow = true;
                this.firstListShow = this.secondListShow = this.hotListShow = false;
            },
            //显示热度列表
            showHot() {
                this.hotListShow ? this.hotListShow = false : this.hotListShow = true;
                this.firstListShow = this.secondListShow = this.thirdListShow = false;
            },
            // 价格列表点击事件
            thirdListClick(name, index) {
                this.thirdCon = name;
                this.thirdListShow = false;
                this.thirdMarker = index;
                this.obj.fAmount = index;
                this.selectload();
            },

            // 热度列表点击事件
            hotListClick(name, index) {
                this.hotCon = name;
                this.hotListShow = false;
                this.hotMarker = index;
                this.obj.hot = index + 1;
                this.selectload();
            },
            //点击的不是 显示的div，隐藏显示的div
            handleClose(e) {
                this.firstListShow = false;
                this.secondListShow = false;
                this.thirdListShow = false;
                this.hotListShow = false;
            },
            //清空选项
            emptyClick() {
                if(this.firstCategoryId || this.secondCategoryId){
                    window.location.href = '/jzmuban';
                    return;
                }
                this.emptynum = 0;
                this.firstCon = '模板大类';
                this.firstListShow = false;
                this.obj.fLargeCategoryName = null;
                this.secondCon = '模板小类';
                this.secondListShow = false;
                this.obj.fSmallCategoryName = null;
                this.thirdCon = '价格';
                this.thirdMarker = null;
                this.obj.fAmount = null;
                this.thirdListShow = false;
                this.hotCon = '热度';
                this.hotMarker = null;
                this.obj.hot = null;
                this.hotListShow = false;
                //加载数据
                this.selectload();
            },
            //点击模板预览
            preview(id) {
                $.ajax({
                    url: this.interfaceApi.updateTemplatePreviewCount,
                    data: {fTemplateId: id}
                });
            },
            //用空数据填充列表
            replenish(breadth, num) {
                this.emptynum = 0;
                if (breadth >= 1520) {
                    console.log('4个模板的情况')
                    if (num % 4) {
                        this.emptynum = 4 - (num % 4);
                    }
                } else if (breadth >= 1140 && breadth < 1520) {
                    console.log('3个模板的情况')
                    if (num % 3) {
                        console.log(breadth)
                        this.emptynum = 3 - (num % 3);
                    }
                } else if (breadth < 1140) {
                    console.log('2个模板大的情况')
                    if (num % 2) {
                        console.log(breadth)
                        this.emptynum = 2 - (num % 2);
                    }
                }
            },
            changeTopShow(v) {
                this.toTopShow = v;
            },
            usethemodule(obj) {
                this.$store.commit("changeTemplateInfo", obj);
                this.$store.commit("requestLoginInfo", {
                    noLoginCallBack: () => {
                        window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
                    },
                    loginCallBack: () => {
                        this.$store.commit("changePopupConfig",{
                            isShow:true,
                            module:2,//使用模板
                            type:'website'
                        });
                    }
                });
            },
            handleImg(e, maxWidth, maxHeight) {
                publicUtil.handleImg(e, maxWidth, maxHeight);
            },
        },
        computed: {
            windowWidth() {
                return this.$store.state.windowWidth;
            },
            scrollTop() {
                return this.$store.state.scrollTop;
            },
            mubanUrl(){
                return `${this.$store.state.domainObj.jzDomain}/moban`;
            },
            //弹窗的配置项
            popupConfig(){
                return this.$store.state.popupConfig;
            },
        },
        filters: {
            toMoney: (value) => {
                return value.toLocaleString();
            }
        },
        directives: {
            clickoutside: {
                // 初始化指令
                bind(el, binding, vnode) {
                    function documentHandler(e) {
                        // 这里判断点击的元素是否是本身，是本身，则返回
                        if (el.contains(e.target)) {
                            return false;
                        }
                        // 判断指令中是否绑定了函数
                        if (binding.expression) {
                            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                            binding.value(e);
                        }
                    }

                    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
                    el.__vueClickOutside__ = documentHandler;
                    document.addEventListener('click', documentHandler);
                },
                unbind(el, binding) {
                    // 解除事件监听
                    document.removeEventListener('click', el.__vueClickOutside__);
                    delete el.__vueClickOutside__;
                },
            }

        },
        watch: {
            windowWidth(val) {
                if (val > 1540) {
                    this.maxWidth = 1520;
                } else if (val <= 1540 && val > 1160) {
                    this.maxWidth = 1320;
                } else {
                    this.maxWidth = 880;
                }
                this.replenish(val, this.count)
            },
            scrollTop(val) {
                if (!this.firstsign) {
                    if (val + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 80) {
                        this.loadMore()
                    }
                }
                if (val > document.documentElement.clientHeight * 2) {
                    //第二屏
                    this.toTopShow = true
                } else {
                    this.toTopShow = false
                }
            }
        },


    }
</script>
<style scoped lang="less">
    @import '../../assets/css/website.less';
</style>
