<template>
    <div>
        <!-- banner  搜索状态时隐藏 -->
        <banner v-if="!isSearching"/>

        <!-- 搜索选项  只有搜索状态时显示 -->
        <template v-if="isSearching">
            <div class="inforselect" v-if="menu===0">
                <div class="selecttext">筛选条件</div>
                <div class="selecttype" @click.stop.prevent="showbloglist">
                    <div id="selectbig" class="select">{{bloggtext}}
                        <svg t="1554979981658" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="1964" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="15" height="15">
                            <path class="down" d="M862.752 326.016H161.248l349.696 371.936L862.72 326.016z"></path>
                        </svg>
                    </div>
                    <ul v-if="bloglistshow" v-clickoutside="handleClose" class="inforbig">
                        <li v-for="(a,i) in blogbigar" :key='i' @click.stop.prevent="blogListClick(a[1],a[0],i)"
                            :class="{'checked':blogtypeMarker==i}">
                            {{a[1]}}
                        </li>
                    </ul>
                </div>

                <div class="inforclean" @click.stop.prevent="cleanselect">清空选项</div>
            </div>
            <div class="inforselect" v-else>
                <div class="selecttext">筛选条件</div>
                <div class="selecttype" @click.stop.prevent="showFirst">
                    <div id="selectbig" class="select">
                        <span>{{newsbig}}</span>
                        <svg t="1554979981658" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="1964" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="15" height="15">
                            <path class="down" d="M862.752 326.016H161.248l349.696 371.936L862.72 326.016z"></path>
                        </svg>
                    </div>
                    <ul v-if="firstListShow" v-clickoutside="handleClose" class="inforbig">
                        <li v-for="(a,i) in newsbigar" :key='i' @click.stop.prevent="firstListClick(a[1],a[0],i)"
                            :class="{'checked':newstypeMarker==i}">
                            {{a[1]}}
                        </li>
                    </ul>
                </div>
                <div class="selecttype" @click.stop.prevent="showSecond">
                    <div id="selectsmall" class="select">
                        <span>{{newsmall}}</span>
                        <svg t="1554979981658" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="1964" xmlns:xlink="http://www.w3.org/1999/xlink"
                             width="15" height="15">
                            <path class="down" d="M862.752 326.016H161.248l349.696 371.936L862.72 326.016z"></path>
                        </svg>
                    </div>
                    <div v-if="secondListShow" v-clickoutside="handleClose" class="inforsmall active">
                        <div
                                :class="[newsclassifyMarker===i?'on':'','inforlist']"
                                v-for="(a,i) in newssmallar"
                                v-bind:key="i"
                        >
                            <span @click.stop.prevent="secondListClick(a[1],a[0],i)">{{a[1]}}</span>
                        </div>
                    </div>
                </div>
                <div class="inforclean" @click.stop.prevent="cleanselect">清空选项</div>
            </div>
        </template>
        <div class="searchval" :style="{height:isSearching?'70px':''}">
            <div v-if="isSearching" v-show="!toploadingshow">搜索到<span> {{'"'+ (menu===0?blogobj.keyword:newsobj.keyword) +'"'}} </span>相关结果{{this.count
                | toMoney}}个
            </div>
            <loadingImg style="position:absolute;left:50%;top:10px;margin-left:-70px;" v-show="toploadingshow"/>
        </div>
        <div class="newsWrap" ref="newsWrap"
             :style="{paddingTop:isSearching?'0px':'15px'}">

            <div class="zm-news" ref="newsList">
                <!-- 博客列表-->
                <template v-if="menu===0">
                    <div :class="{'zm-news-list':true,'zm-retract':(blogs.fThumbnail!='')}"
                         v-for='(blogs,index) in lists' :key='index' @click.stop.prevent="opencont(blogs.pcZmBlogURL)">
                        <div class="zm-news-left" v-if="blogs.fBlogType==1">

                        </div>
                        <div class="zm-news-left" v-else>
                            <div class="newsimg"><img
                                    :src="blogs.fBlogVideoImg ? blogs.fBlogVideoImg : blogs.fImageInfo"
                                    @load="handleImg($event,200,132)"
                                    :alt="removeEm(blogs.fBlogTitle)+(blogs.fKeyWord?blogs.fKeyWord:'') + labellist1(blogs.fBlogLabelIds)"/>
                            </div>
                            <div class="zm-video-btn">
                                <img src='/images/information/u94.png' v-show="blogs.fBlogVideoImg ? true : false">
                            </div>
                        </div>
                        <div :class="{'zm-news-right':true,'zm-news-noimg':blogs.fBlogType==1}">
                            <div class="zm-new-title"><a :href="blogs.pcZmBlogURL" target="_blank"
                                                         v-html="blogs.fBlogTitle"></a></div>
                            <div class="zm-new-time">
                                <div class="times">{{blogs.fUpdateTime | timeformat}}</div>
                                <div class="share">
                                </div>
                            </div>
                            <div class="zm-new-summary"
                                 v-html="blogs.fBlogContentText=='null'?'':blogs.fBlogContentText.trim()">

                            </div>
                            <div class="zm-new-source">
                                <div class="source" v-if="labellist(blogs.fBlogLabelIds)">
                                    来自主题：
                                    <span v-html="labellist(blogs.fBlogLabelIds)"></span>

                                </div>
                                <div class="site" :style="{marginLeft:labellist(blogs.fBlogLabelIds)?'12px':'0px'}">
                                    <span v-if="labellist(blogs.fBlogLabelIds)">|</span>
                                    {{blogs.fEntrepName}}
                                </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </template>

                <!-- 新闻列表 -->
                <template v-else>
                    <div :class="{'zm-news-list':true,'zm-retract':(news.fThumbnail!='')}" v-for='(news,index) in lists'
                         :key='index' @click.stop.prevent="opencont(news.newsDetailPageSrc)">
                        <div class="zm-news-left" v-if="news.fNewsType!=2 && news.fThumbnail">
                            <div class="newsimg"><img
                                    :src="news.fThumbnail.indexOf('video_')>-1?news.fThumbnail.slice(6,):news.fThumbnail"
                                    @load="handleImg($event,200,132)"
                                    :alt="removeEm(news.fNewsTitle)+(news.fKeyWord?news.fKeyWord:'')"></div>
                            <div class="zm-video-btn">
                                <img src="/images/information/u94.png" alt
                                     v-show="news.fNewsType==4 || news.fThumbnail.indexOf('video_') > -1">
                            </div>
                        </div>
                        <div :class="{'zm-news-right':true,'zm-news-noimg':!news.fThumbnail || news.fNewsType==2}">
                            <div class="zm-new-title"><a :href="news.newsDetailPageSrc" target="_blank"
                                                         v-html="news.fNewsTitle"></a></div>
                            <div class="zm-new-time">
                                <div class="times">{{news.fUpdateTime | timeformat}}</div>
                                <div class="share">
                                </div>
                            </div>

                            <!-- 图集 -->
                            <template v-if="news.fNewsType==2">

                                <div class="zm-new-lists">
                                    <div class="imglist" v-for="(img,index) in news.fContentText.split(',')"
                                         :key="index">
                                        <img :src="img" @load="handleImg($event,200,132)" v-if="index < 6">
                                    </div>

                                </div>
                            </template>
                            <template v-else>
                                <div class="zm-new-summary"
                                     v-html="news.fContentText==null?'':news.fContentText.trim()">
                                </div>
                                <div class="zm-new-source">
                                    <div class="source">
                                        资讯类型：
                                        <span>{{news.fNewsType | newstype}}</span>
                                    </div>
                                    <div class="site">
                                        <span>|</span>
                                        {{news.fShopSiteName}}
                                    </div>
                                </div>
                            </template>

                        </div>
                        <div class="clear"></div>
                    </div>
                </template>

                <!-- 搜索没有结果提示 -->
                <template>
                    <div v-if="zerotip && this.entrepId!==null && !this.isSearching" class="noinfotisi">
                        抱歉！该主体没有发布{{menu===0?'博客':'资讯'}}！
                    </div>
                    <div v-else-if="zerotip && this.isSearching" class="noinfotisi">
                        抱歉！没有找到符合条件的{{menu===0?'博客':'资讯'}}！
                    </div>
                </template>
            </div>
        </div>

        <!-- 置顶按钮 -->
        <toTop v-if="toTopShow"/>
        <!-- 点点点加载 -->
        <loadingImg v-show="loading"/>
        <!-- 没有数据到底提示 -->
        <p class="lowest" v-if="noMore" v-show="nodatatip">已经到底了！</p>
        <entrepPopup v-if="popupConfig.isShow && popupConfig.type === 'entrep'"></entrepPopup>
    </div>
</template>

<script>
    import banner from "./banner"
    import loadingImg from '~/components/public/loading'
    import toTop from '~/components/public/toTop'
    import publicUtil from '~/common/publicUtil'
    import entrepPopup from '~/components/public/dialog/entrepPopup';

    export default {
        name: "information",
        components: {banner, loadingImg, toTop,entrepPopup},
        props: ['pageData'],
        data() {
            return {
                menu: 0,    //0博客    1新闻
                maxWidth: 1352,
                leftVal: 66,
                marginRight: 0,
                //博客类型默认值
                bloggtext: '博客类型',
                //博客类型筛选列表
                blogtylelist: [],
                //博客类型列表显示/隐藏
                bloglistshow: false,
                //博客类型列表
                blogbigar: [[6, '图文博客'], [18, '视频博客'], [1, '文本博客']],
                //新闻类型默认值
                newsbig: '信息类型',
                //新闻分类默认值
                newsmall: '信息分类',
                //新闻类型列表
                newsbigar: [[1, '图文资讯'], [2, '图集资讯'], [4, '视频资讯']],
                //新闻分类
                newssmallar: [],
                //新闻类型列表显示/隐藏
                firstListShow: false,
                //新闻分类列表显示/隐藏
                secondListShow: false,
                //新闻类型列表选中的状态
                newstypeMarker: null,
                //新闻分类列表选中的状态
                newsclassifyMarker: null,
                //博客列表选中的状态
                blogtypeMarker: null,
                //博客接口
                blogurl: '/blog_api/blogInfoSearch/searchBlog',
                blogobj: null,
                newsurl: '/news_web/search-api/searchNews',
                //新闻传参
                newsobj: null,
                // 数据list
                lists: [],
                // blog标签
                bloglabels: [],
                // 置顶
                toTopShow: false,
                // 没有更多数据
                noMore: false,
                // 搜索状态头部点点点加载
                toploadingshow: true,
                // 底部点点点加载
                loading: false,
                //总条数
                count: 0,
                //标记第一次加载的数据后，是否还有数据   false 有数据  true 没数据
                firstsign: false,
                //已经到底啦提示
                nodatatip: true,
                //搜索为0的提示
                zerotip: false,
                isSearching: false,
                searchWord: null,
                entrepId:null
            };
        },
        created() {
            if (this.pageData.type === 2) {
                this.menu = 1;
            } else {
                this.menu = 0;
            }
            this.blogobj = this.pageData.blogobj;
            this.newsobj = this.pageData.newsobj;
            if(this.blogobj.fEntrepId){
                this.entrepId = this.blogobj.fEntrepId;
            }
            if(this.newsobj.fEntrepId){
                this.entrepId = this.newsobj.fEntrepId;
            }
            if (this.blogobj.keyword != null) {
                this.searchWord = this.blogobj.keyword;
            }
            if (this.newsobj.keyword != null) {
                this.searchWord = this.newsobj.keyword;
            }
            if (this.blogobj.keyword != null || this.newsobj.keyword != null) {
                this.isSearching = true
            } else {
                this.isSearching = false
            }
            this.selectload();
            //查询博客label标签
            if (this.pageData.bolgLabs) {
                for (let i = 0; i < this.pageData.bolgLabs.length; i++) {
                    this.bloglabels.push(this.pageData.bolgLabs[i].fLabelName)
                }
            }
            //一级新闻类目
            if (this.pageData.newsBigCategory) {
                for (let i = 0; i < this.pageData.newsBigCategory.length; i++) {
                    this.newssmallar.push([this.pageData.newsBigCategory[i].fId, this.pageData.newsBigCategory[i].fName])
                }
            }


        },
        computed: {
            windowWidth() {
                return this.$store.state.windowWidth;
            },
            clickEvent() {
                return this.$store.state.clickEvent;
            },
            scrollTop() {
                return this.$store.state.scrollTop;
            },
            //弹窗的配置项
            popupConfig(){
                return this.$store.state.popupConfig;
            },
        },
        methods: {
            getData(url, obj) {
                return this.$axios.get(url, {params: obj})
            },
            //间隔时间设置，这里是设置几秒后请求数据
            doubleAfter1seconds(num) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(2 * num);
                    }, 0)
                })
            },
            //滚动到底部请求数据
            async loadMore() {
                // 没有正在加载中才会请求数据
                if (!this.loading) {
                    if (this.noMore) {
                        this.loading = false
                        return
                    }
                    this.loading = true
                    let res = await this.doubleAfter1seconds(30);
                    let response = ''
                    if (this.menu === 0) {
                        this.blogobj.pageNow = this.blogobj.pageNow + 1;
                        response = this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getBlogList, this.blogobj));
                    } else {
                        this.newsobj.pageNow = this.newsobj.pageNow + 1;
                        response = this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getNewsList, this.newsobj))
                    }
                    // 请求下一页数据
                    let newData = response.content;

                    let count = newData.length
                    console.log(this.count, 'a1a1a1')
                    // 数据不够一页且大于0肯定没更多数据了
                    if ((count < this.blogobj.pageSize || count < this.newsobj.pageSize) && count >= 0) {
                        this.noMore = true;
                        this.loading = false
                        this.lists = this.lists.concat(newData)
                        console.log(this.windowWidth, '加载最后一页时，监听window宽度')
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
                this.toploadingshow = true;
                this.firstsign = true;
                this.nodatatip = false;
                this.zerotip = false;
                this.firstsign = false;
                let response = '';
                if (this.pageData.type === 2) {
                    this.newsobj.pageNow = 1;
                    if (this.newsobj.fNewsType || this.newsobj.fFristZumaItemId) {
                        response = this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getNewsList, this.newsobj))

                    } else {
                        response = this.pageData.DataList;
                    }
                } else {
                    this.blogobj.pageNow = 1;
                    if (this.blogobj.fBlogType) {
                        response = this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getBlogList, this.blogobj));
                    } else {
                        response = this.pageData.DataList;
                    }
                }
                this.lists = response.content;
                this.toploadingshow = false;
                this.count = response.count;
                if (this.count < this.newsobj.pageSize || this.count < this.blogobj.pageSize) {
                    this.noMore = true;
                    if (this.count === 0) {
                        this.zerotip = true;
                        this.nodatatip = false;
                    } else if (this.count > 0) {   //设置大于0条时，显示到底提示
                        this.nodatatip = true;
                    }

                } else {
                    this.noMore = false;
                    this.nodatatip = true;
                }
            },
            // 请求接口方法
            requestfunc(res) {
                if (res.status === 200) {
                    let testlist = ''
                    if (res.data.status === 0) {
                        testlist = res.data.data.content;
                    } else {
                        testlist = '';
                        console.log('请求数据失败')
                    }
                    return testlist;
                }
            },
            //显示博客类型列表
            showbloglist() {
                if (this.bloglistshow === false) {
                    this.bloglistshow = true;
                } else {
                    this.bloglistshow = false;
                }
            },
            // 博客类型列表点击
            blogListClick(name, id, index) {
                this.bloggtext = name;
                this.bloglistshow = false;
                this.blogtypeMarker = index;
                this.blogobj.fBlogType = id;

                this.selectload();
            },


            //显示新闻类型列表
            showFirst() {
                if (this.firstListShow === false) {
                    this.firstListShow = true;
                } else {
                    this.firstListShow = false;
                }
                this.secondListShow = false;
            },

            //显示新闻分类列表
            showSecond() {

                if (this.secondListShow === false) {
                    this.secondListShow = true;
                } else {
                    this.secondListShow = false;
                }
                this.firstListShow = false;
            },
            //新闻类型列表点击事件
            firstListClick(name, id, index) {
                this.newsbig = name;
                this.firstListShow = false;
                this.newstypeMarker = index;
                this.newsobj.fNewsType = id;
                this.selectload();
            },
            //新闻分类列表点击事件
            secondListClick(name, id, index) {
                this.newsmall = name;
                this.secondListShow = false;
                this.newsclassifyMarker = index;
                this.newsobj.fFristZumaItemId = id;
                this.selectload();
            },
            //点击的不是 显示的div，隐藏显示的div
            handleClose(e) {
                this.firstListShow = false;
                this.secondListShow = false;
                this.bloglistshow = false;
            },
            // 清空选项
            cleanselect() {
                this.clearstatus();
                this.selectload();
            },
            // 博客来源主题标签
            labellist(value) {
                console.log(value);
                if (value) {
                    if (value === 0) return ''
                    let label = value.toString(2).split('').reverse();
                    let str = ''
                    for (let i = 0; i < label.length; i++) {
                        if (label[i] === '1') {
                            str += ' <span>' + this.bloglabels[i] + '</span>';
                            if (i < 2) {
                                str += ' ';
                            }
                        }
                    }
                    return str;
                } else {
                    return '';
                }

            },
            // 博客Alt标签
            labellist1(value) {
                if(value !== null){
                    if (parseInt(value) === 0) return ''
                    let label = value.toString(2).split('').reverse();
                    let str = ''
                    for (let i = 0; i < label.length; i++) {
                        if (label[i] === '1') {
                            str += ' ' + this.bloglabels[i];
                        }
                    }
                    return str;
                }else{
                    return '';
                }

            },
            //清空筛选状态
            clearstatus() {
                //博客类型默认值
                this.bloggtext = '博客类型'
                //新闻类型默认值
                this.newsbig = '资讯类型'
                //新闻分类默认值
                this.newsmall = '博客分类'
                //博客类型列表显示/隐藏
                this.bloglistshow = false
                //新闻类型列表显示/隐藏
                this.firstListShow = false
                //新闻分类列表显示/隐藏
                this.secondListShow = false
                //新闻类型列表选中的状态
                this.newstypeMarker = null
                //新闻分类列表选中的状态
                this.newsclassifyMarker = null
                //博客列表选中的状态
                this.blogtypeMarker = null
                this.blogobj.fBlogType = null
                this.newsobj.fNewsType = null
                this.newsobj.fFristZumaItemId = null
            },
            //maxWidth:设置图片的width（具体像素值），maxHeight:设置图片的height(具体像素值)
            handleImg(e, maxWidth, maxHeight) {
                publicUtil.handleImg(e, maxWidth, maxHeight);
            },
            opencont(url) {
                window.open(url, '_blank')
            },
            removeEm(name) {
                var namestr = name.replace(/<em>/g, '');
                namestr = namestr.replace(/<\/em>/g, '');
                return namestr;
            },
        },
        filters: {
            timeformat: (value) => {
                if (!value) return '';
                //字符串转为时间戳
                let datestr = Date.parse(String(value).replace(/-/gi, "/"));

                //时间时差
                let minute = 1000 * 60;
                let hour = minute * 60;
                let day = hour * 24;
                let halfamonth = day * 15;
                let month = day * 30;
                let year = day * 365;

                let now = new Date().getTime();
                let diffValue = now - datestr;

                if (diffValue < 0) {
                    //若日期不符则弹窗口告之
                }

                let yearC = diffValue / year;
                let monthC = diffValue / month;
                let weekC = diffValue / (7 * day);
                let dayC = diffValue / day;
                let hourC = diffValue / hour;
                let minC = diffValue / minute;

                let result = "";
                if (yearC >= 1) {
                    result = parseInt(yearC) + "年前";
                } else if (monthC >= 1) {
                    result = parseInt(monthC) + "月前";
                }
                // else if (weekC >= 1) {
                //   result = parseInt(weekC) + "周前";
                // }
                else if (dayC >= 1) {
                    result = parseInt(dayC) + "天前";
                } else if (hourC >= 1) {
                    result = parseInt(hourC) + "小时前";
                } else if (minC >= 1) {
                    result = parseInt(minC) + "分钟前";
                }
                // else{
                //     result = "刚刚"
                // }
                return result;
            },
            toMoney: (value) => {
                return value.toLocaleString();
            },
            newstype: (value) => {
                switch (parseInt(value)) {
                    case 1: {
                        return '图文资讯'
                    }
                    case 2: {
                        return '图集资讯'
                    }
                    case 4: {
                        return '视频资讯'
                    }
                }

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
            scrollTop(val) {
                if (!this.firstsign) {
                    if (val + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 80) {
                        this.loadMore()
                    }
                    if (val > document.documentElement.clientHeight * 2) {
                        //第二屏
                        this.toTopShow = true
                    } else {
                        this.toTopShow = false
                    }
                }

            }

        },

    };
</script>

<style scoped lang="less">
    @import "../../assets/css/information.less";
</style>
