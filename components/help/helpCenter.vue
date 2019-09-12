<template>
    <div class="zuma-help-center">
        <div class="bgTop">
            <div class="helpTop">
                <span class="zm holdfont"><nuxt-link to='/'>族蚂</nuxt-link> <span class="line"></span></span>
                <span class="zm-right">帮助中心</span>
                <!--搜索-->

                <div class="search-box">

                    <input
                            type="text"
                            placeholder="请输入你想了解的问题"
                            v-model="searchKey"
                            @keyup.enter="queryBySearchStr(searchKey)"
                    >
                    <svg @click.stop.prevent="queryBySearchStr(searchKey)">
                        <use xlink:href="/images/index/icon/zumaIcon.svg#zm-search"></use>
                    </svg>
                </div>


            </div>
        </div>
        <div class="helpQuestion">
            <div class="helpQuestionLeft">
                <div class="questionLists">
                    <transition-group name="flip-list" tag="ul">
                        <li
                                class="leve-1"
                                v-for="(item, index) in hotQuestions"
                                :key="item.fId"
                                :class="{'active': index == active}"

                        >
                            <div>
                                <div @click.stop.prevent="oneList(index)" class="fLeve">
                                    {{item.fName}}
                                    <svg t="1564021480901" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="1097"
                                         xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                                        <defs>
                                            <style type="text/css"></style>
                                        </defs>
                                        <path d="M454.188 785.022c-145.192-150.177-290.378-300.353-435.422-450.526-59.842-61.836 37.327-154.021 97.313-91.899 129.23 133.647 258.318 267.296 387.548 400.868 133.646-134.287 267.436-268.574 401.083-402.934 60.84-61.123 158.011 31.060 97.244 91.971-150.105 150.89-300.279 301.703-450.454 452.521-24.933 24.934-72.666 25.575-97.311 0z"
                                              p-id="1098"></path>
                                    </svg>
                                </div>
                            </div>

                            <ul v-show="index == active">
                                <li
                                        class="leve-2"
                                        v-for="(list,key) in item.helpCategoryBeanList"
                                        :key="list.fId"
                                        :class="{'active2': key == active2}"

                                >
                                    <nuxt-link
                                            :to="list.helpCategoryBeanList[0]?'/bangzhu/'+list.helpCategoryBeanList[0].fId+'_'+index+'_'+key+'_0':''">
                                        {{list.fName}}
                                    </nuxt-link>
                                </li>
                            </ul>
                        </li>
                    </transition-group>
                </div>
            </div>
            <div class="helpQuestionRight">
                <div class="question-right-top" v-show="type != 'boxThird'&& searchBox == false">
                    <span class="leve-1-name">
                  <a href="javascript:void(0);">{{titleFirst.fName}}</a>
                </span>
                    <span class="arrowRight" v-if="this.titleSecond.fName">
                        >
                    </span>
                    <span
                            class="leve-2-name"
                            v-if="this.titleSecond.fName"
                            v-on:click.stop.prevent="twoHref(titleSecond.fId,titleSecond.key,titleSecond.index)"
                    >
                  <a href="javascript:void(0);">{{titleSecond.fName}}</a>
                </span>
                    <span class="arrowRight" v-if="this.titleThird.fName">></span>
                    <span
                            class="leve-3-name"
                            v-if="this.titleThird.fName"
                            v-on:click.stop.prevent="threeHref(titleThird.fId,titleThird.lnum,titleThird.key,titleThird.index)"
                    >
                  <a href="javascript:;">{{titleThird.fName}}</a>

                </span>
                </div>
                <div class="question-right-content clear">
                    <!-- 问题列表展示区 -->
                    <div class="question-list-box clear" v-show="type == 'boxFirst'">
                        <div class="leve-3-list">
                            <ul>
                                <li
                                        v-for="(item,index) in levelThird"
                                        :key="index"
                                        v-if="levelThird.length>0"
                                >
                                    <nuxt-link :class="{'active': index == active3}" :to="item.href">
                                        {{item.fName}}
                                    </nuxt-link>

                                </li>
                                <li class="clear"></li>
                            </ul>
                        </div>
                        <div class="question-list col-w-10 clear">
                            <p class="question-list-title">问题列表</p>
                            <ul>
                                <li
                                        v-for="(item,index) in questionTitle"
                                        :key="index"
                                >
                                    <nuxt-link :to="item.href" class="question-item">• {{item.fTitle}}</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="question-item-detail clear" v-show="type == 'boxSecond'">
                        <h1 class="item-detail-title">{{contentObj.fTitle}}</h1>
                        <div class="item-detail-box" v-html="contentObj.fContent" ref="attach"></div>
                    </div>

                    <!-- 搜索问题展示区 -->
                    <div class="search-result" v-show="type == 'boxThird'">
                        <div class="search-result-top">
                            关于“
                            <span class="key-word">{{searchKey2}}</span>”，共找到
                            <span class="key-word">{{total}}</span>条相关问题
                        </div>
                        <div class="search-result-list" v-for="(item,index) in searchResult" :key="index">
                            <p
                                    class="question-item"
                                    v-html="filterSearchKey(item.fTitle)"
                                    v-on:click.stop.prevent="searchHref(item.href)"
                            ></p>

                            <div class="question-item-content" v-html="filterSearchKey(item.fContent)"></div>
                        </div>

                        <!--分页-->
                        <pagination
                                :total="total"
                                :current-page="current"
                                :display="display"
                                @pagechange="pagechange"
                                v-if=" total > 10 && type != 'boxSecond'"
                        ></pagination>
                    </div>
                </div>


            </div>
            <div class="clear"></div>
        </div>

    </div>
</template>

<script>
    import pagination from "@/components/help/pagination";
    import anim from '@/components/help/anim1'

    export default {
        name: "helpCenter",
        props: ['pageData'],
        created() {
            this.hotQuestions = this.pageData.hotQuestions;
            this.levelIdLists = this.hotQuestions.map(o => [o.fId, (o.helpCategoryBeanList && o.helpCategoryBeanList.length > 0) ? o.helpCategoryBeanList.map(m => [m.fId, (m.helpCategoryBeanList && m.helpCategoryBeanList.length > 0) ? m.helpCategoryBeanList.map(n => [n.fId, n.helpCategoryBeanList]) : []]) : []]);
            if (!this.pageData.type && !this.pageData.catid) {
                this.loadData1({'type': 'three-list', 'catid': '_0_0_0'})
            } else {
                console.log(this.pageData.type, 'type', this.pageData.catid)

                this.loadData1({
                    'type': this.pageData.type,
                    'catid': this.pageData.catid,
                    'str': this.pageData.searchStr
                })
            }

        },

        head() {
            return {
                'title': this.title,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: '族蚂网是一家免费自助建站的平台,只要你会操作电脑,就可以完整地搭建出一个网站,而且族蚂网免费提供建站模板、域名和空间。族蚂支持音频视频的上传和在线播放,新闻博客资讯的上传。族蚂商城可以进行家电、服饰、机械、家纺等产品的免费上传,并且还可以上传维修、保洁、家教等一系列线上线下的服务。'
                    },
                    {hid: 'keywords', name: 'keywords', content: '族蚂建站,快速建站,自助建站,在线购物,在线商城,生活服务,在线视频观看,音乐网站,个人博客,新闻资讯,'}
                ]
            }
        },

        data() {
            return {
                title: '帮助中心-族蚂网zuma.com',
                show: false, // 标记     首次进去false,以后就是true;
                hotQuestions: [], //热点问题一级类目
                levelThird: [], //三级类目
                levelIdLists: [],  //Id集合
                questionTitle: [],
                contentObj: {
                    fTitle: '',
                    fContent: ''
                },
                searchResult: [], //保存搜索结果
                titleFirst: {
                    //右侧标题导航
                    fId: "",
                    fName: ""
                },
                titleSecond: {
                    fId: "",
                    fName: "",
                    key: 0,
                    index: 0
                },
                titleThird: {
                    fId: "",
                    fName: "",
                    lnum: 0,
                    key: 0,
                    index: 0
                },
                questionTitleStr: "",
                questionContent: "",
                type: "", //boxFirst  点二级类目展示区（问题列表）  boxSecond  点三级类目展示区（详情页） boxThird 搜索展示区
                searchBox: false,
                searchKey: "",
                searchKey2: "",
                normalClass: "",
                active: 100, //进入页面默认展示第一条
                active2: 0,
                active3: 0,
                // icon:false
                total: "", // 记录总条数
                display: 10, // 每页显示条数
                current: 1, // 当前的页数
                page: 4,
                swiperOption: {
                    //左侧滚动列表
                    direction: "vertical",
                    slidesPerView: "auto",
                    freeMode: true,
                    scrollbar: {
                        el: ".swiper-scrollbar",
                        hide: false, //滚动条是否自动隐藏。默认：false，不会自动隐藏。
                        draggable: false //该参数设置为true时允许拖动滚动条。
                    },
                    mousewheel: true
                },
                SearchList: [], //关键字搜索
                sign: false //this.hotQuestions是否有当前类目下的数据    false 没有      true有
            };
        },
        methods: {
            firstCatid(item, index) {
                if (item.helpCategoryBeanList && item.helpCategoryBeanList.length > 0) {
                    if (item.helpCategoryBeanList[0].helpCategoryBeanList && item.helpCategoryBeanList[0].helpCategoryBeanList.length > 0) {
                        return item.helpCategoryBeanList[0].helpCategoryBeanList[0].fId + '_' + index + '_0_0'
                    } else {
                        return '_' + index + '_0_0'
                    }
                } else {
                    return '_' + index + '_0_0'
                }
            },
            oneList(index) {
                //一级列表点击事件
                console.log(this.active)
                if (this.active == index) {
                    this.active = 100
                } else {
                    this.active = index;
                    this.$router.push({
                        path: '/bangzhu/' + this.firstCatid(this.hotQuestions[index], index),
                    });
                }
                this.active2 = 0;
                this.active3 = 0;

            },
            // 二级列表点击事件
            twoHref(secondId, key, index) {
                this.$router.push({
                    path: '/bangzhu/' + this.hotQuestions[index].helpCategoryBeanList[key].helpCategoryBeanList[0].fId + '_' + index + '_' + key + '_0',
                });
            },
            //三级列表点击事件 threeHref(titleThird.fId,titleThird.lnum,titleThird.key,titleThird.index)
            threeHref(fId, lnum, key, index) {
                this.$router.push({
                    path: '/bangzhu/' + fId + '_' + index + '_' + key + '_' + lnum,
                });
            },
            //搜索关键词
            queryBySearchStr(str) {
                this.$router.push({
                    path: '/bangzhu/sousuo/' + str,
                });
            },
            //搜索列表点击跳转
            searchHref(url) {
                this.$router.push({
                    path: url,
                });
            },
            loadData1(urlQuery) {
                const type = urlQuery.type;
                const catid = urlQuery.catid ? urlQuery.catid : null;
                const str = urlQuery.str ? urlQuery.str : null;

                let index, key, lnum, id;
                if (type === 'three-list') {
                    this.type = 'boxFirst'
                    id = catid.split('_')[0];
                    index = catid.split('_')[1];
                    key = catid.split('_')[2];
                    lnum = catid.split('_')[3];

                    if (key == 0 && lnum == 0) {
                        if (this.hotQuestions[index].helpCategoryBeanList && this.hotQuestions[index].helpCategoryBeanList.length > 0) {
                            if (this.hotQuestions[index].helpCategoryBeanList[0].helpCategoryBeanList && this.hotQuestions[index].helpCategoryBeanList[0].helpCategoryBeanList.length > 0) {
                                key = lnum = 0
                            } else {
                                key = 0;
                                lnum = -1;
                            }
                        } else {
                            key = lnum = -1
                        }
                    }

                    this.title = this.hotQuestions[index].fName + '-帮助中心-族蚂网zuma.com';
                    if (key != -1) {
                        this.title = this.hotQuestions[index].helpCategoryBeanList[key].fName + '-帮助中心-族蚂网zuma.com';
                        if (lnum != -1) {
                            this.title = this.hotQuestions[index].helpCategoryBeanList[key].helpCategoryBeanList[lnum].fName + '-帮助中心-族蚂网zuma.com';
                        }
                    }
                    this.Topnav(index, key, lnum)
                } else if (type === 'content') {
                    this.type = 'boxSecond'
                    this.searchKey = ''
                    let categoryId = catid.split('_')[1];
                    bbq:
                        for (let i = 0; i < this.levelIdLists.length; i++) {
                            for (let j = 0; j < this.levelIdLists[i][1].length; j++) {
                                for (let x = 0; x < this.levelIdLists[i][1][j][1].length; x++) {
                                    if (this.levelIdLists[i][1][j][1][x][0] == categoryId) {
                                        index = i;
                                        key = j;
                                        lnum = x;
                                        break bbq;
                                    }
                                }
                            }
                        }
                    let contentList = this.hotQuestions[index].helpCategoryBeanList[key].helpCategoryBeanList[lnum].helpBeanList;

                    this.contentObj.fTitle = this.contentObj.fContent = '';
                    this.$axios('/help/queryHelpDetail?fId=' + catid.split('_')[0]).then(res => {
                        if (res.status == 200 && res.data.status == 0) {
                            this.contentObj = res.data.data;

                            this.title = this.contentObj.fTitle + '-帮助中心-族蚂网zuma.com'

                            this.Topnav(index, key, lnum)
                        }
                    })


                } else if (type === 'search') {
                    this.type = 'boxThird';
                    let searchStr = str ? str : '';
                    this.$axios('/help/queryHelpBeanByList?searchStr=' + searchStr).then(res => {
                        if (res.status == 200 && res.data.status == 0) {

                            this.SearchList = res.data.data;
                            this.searchKey = this.searchKey2 = searchStr;
                            this.total = this.SearchList.length;

                            this.title = searchStr + '-帮助中心-族蚂网zuma.com'


                            if (this.total > this.display) {
                                this.searchResult = this.SearchList.slice(0, this.display);
                            } else {
                                this.searchResult = this.SearchList;
                            }

                            for (let o = 0; o < this.SearchList.length; o++) {
                                this.SearchList[o].href = '/bangzhu/content/' + this.SearchList[o].fId + '_' + this.SearchList[o].fCategoryId
                            }
                        }
                    })

                }
            },

            Topnav(i, j, x) {
                this.active = i;
                this.active2 = j;
                this.active3 = x;
                console.log(this.active, this.active2, this.active3)
                this.titleFirst.fId = this.hotQuestions[i].fId;
                this.titleFirst.fName = this.hotQuestions[i].fName;
                if (j != -1) {
                    this.titleSecond.fId = this.hotQuestions[i].helpCategoryBeanList[j].fId;
                    this.titleSecond.fName = this.hotQuestions[i].helpCategoryBeanList[j].fName;
                    this.titleSecond.key = j;
                    this.titleSecond.index = i;
                    if (x != -1) {
                        this.titleThird.fId = this.hotQuestions[i].helpCategoryBeanList[j].helpCategoryBeanList[x].fId;
                        this.titleThird.fName = this.hotQuestions[i].helpCategoryBeanList[j].helpCategoryBeanList[x].fName;
                        this.titleThird.lnum = x;
                        this.titleThird.key = j;
                        this.titleThird.index = i;
                        this.levelThird = this.hotQuestions[i].helpCategoryBeanList[j].helpCategoryBeanList;

                        for (let o = 0; o < this.levelThird.length; o++) {
                            this.levelThird[o].href = '/bangzhu/' + this.levelThird[o].fId + '_' + i + '_' + j + '_' + o;
                        }
                        this.questionTitle = this.levelThird[x].helpBeanList;
                        for (let o = 0; o < this.questionTitle.length; o++) {
                            this.questionTitle[o].href = '/bangzhu/content/' + this.questionTitle[o].fId + '_' + this.questionTitle[o].fCategoryId;
                        }


                    } else {
                        this.type = ''
                        this.titleThird = {
                            fId: "",
                            fName: "",
                            lnum: 0,
                            key: 0,
                            index: 0
                        };
                    }
                } else {
                    this.type = ''
                    this.titleSecond = {
                        fId: "",
                        fName: "",
                        key: 0,
                        index: 0
                    };
                    this.titleThird = {
                        fId: "",
                        fName: "",
                        lnum: 0,
                        key: 0,
                        index: 0
                    };
                }
            },

            //分页
            pagechange: function (pagechange) {
                let displayStart = (pagechange - 1) * this.display;
                let displayLenggth = pagechange * this.display;
                this.searchResult = this.SearchList.slice(displayStart, displayLenggth);
            },

            //内容附件查询
            queryAttach(id, cont, title, index, type) {
                //内容附件接口
                let url = "/help/queryHelpBeanById";

                this.$axios('/help/queryHelpBeanById?helpId=' + id)
                    .then(res => {
                        //console.log('附件和类目',res)
                        //console.log(this.$refs.attach);
                        // 附件展示
                        let str = "";
                        if (!!res.data.data) {
                            res.data.data.helpBean.helpMediaBeanList.map(v => {
                                // console.log(v)
                                return (str += `<div class="attach"><a target="_blank" href="${
                                    v.fMediaUrl
                                    }" ><i class="idenphoto-icon"></i>${v.fMediaName}</a></div`);
                            });
                        }
                        this.questionContent =
                            str == "" ? this.questionContent : this.questionContent + str;
                        // arr[0] = this.questionContent;
                        if (str != "") {
                            this.checkDetail(cont, title, index, type, str);
                        } else {
                            this.checkDetail(cont, title, index, type);
                        }
                    })
                    .catch(err => {
                        console.log("附件失败", err);
                    });
            },

            // 问题列表和搜索下的问题列表 查看详情
            checkDetail(conent, title, index, type, attach) {
                this.questionContent = attach == undefined ? conent : conent + attach;
                this.questionTitleStr = title;
                this.type = type;

                // img
                this.$nextTick(() => {
                    //console.log(this.$refs.attach.getElementsByTagName('img'));
                    let obj = this.$refs.attach.getElementsByTagName("img");
                    // console.log(obj instanceof Array)
                    for (let i = 0; i < obj.length; i++) {
                        //console.log(obj[i].getAttribute("_width"))
                        let width = parseInt(obj[i].getAttribute("_width"));
                        //console.log(width,'1111111111111111111');
                        // obj[i].style='width:'+ width+'%' +';height:auto';

                        obj[i].style["maxWidth"] = "100%";
                        obj[i].style["height"] = "auto";
                    }
                });
            },
            compare(cid) {
                // 左侧栏目对应
                console.log(cid)
                for (let i = 0; i < this.hotQuestions.length; i++) {
                    if (this.hotQuestions[i].helpCategoryBeanList) {
                        for (
                            let j = 0;
                            j < this.hotQuestions[i].helpCategoryBeanList.length;
                            j++
                        ) {
                            if (
                                this.hotQuestions[i].helpCategoryBeanList[j].helpCategoryBeanList
                            ) {
                                for (
                                    let x = 0;
                                    x <
                                    this.hotQuestions[i].helpCategoryBeanList[j]
                                        .helpCategoryBeanList.length;
                                    x++
                                ) {
                                    if (
                                        this.hotQuestions[i].helpCategoryBeanList[j]
                                            .helpCategoryBeanList[x].fId == cid
                                    ) {
                                        this.Topnav(i, j, x);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            },

            Ladder(val) {
                // 存储所有http请求
                let reqList = [];
                // 存储后台响应每个请求后的返回结果
                let resList = [];
                for (let i = 0; i < val.length; i++) {
                    let req = this.$axios.get(
                        "/help/queryHelpDtoByLists?categoryId=" + val[i].fId
                    );
                    reqList.push(req);
                }
                return this.$axios.all(reqList).then(
                    this.$axios.spread(function (...resList) {
                        return resList; // 拿到所有get数据
                    })
                );
            },
            async renderHis(val, index) {
                let posts = await this.Ladder(val);
                for (let i = 0; i < posts.length; i++) {
                    if (posts[i] && posts[i].status === 200) {
                        this.$set(
                            this.hotQuestions[index].helpCategoryBeanList[i],
                            "helpCategoryBeanList",
                            posts[i].data.data.helpCategoryBeanList
                        );
                    }

                    if (this.hotQuestions[index].helpCategoryBeanList.length > 0) {
                        this.twoHref(
                            this.hotQuestions[index].helpCategoryBeanList[0].fId,
                            0,
                            index
                        );
                    }
                }
            },
            async renderData(val, index) {
                let posts = await this.Ladder(val);
                for (let i = 0; i < posts.length; i++) {
                    if (posts[i] && posts[i].status === 200) {
                        this.$set(
                            this.hotQuestions[index].helpCategoryBeanList[i],
                            "helpCategoryBeanList",
                            posts[i].data.data.helpCategoryBeanList
                        );
                        if (this.sign == false && index == this.active && i == this.active2) {
                            this.Topnav(this.active, this.active2, this.active3);
                            this.levelThird = this.hotQuestions[
                                this.active
                                ].helpCategoryBeanList[this.active2].helpCategoryBeanList;
                            console.log(this.sign);
                        }
                    }
                }
            },

            removeHTMLTag(str) {
                str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
                str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
                str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
                return str;
            },

            filterSearchKey: function (searchContent) {
                var searchKeyStr = this.searchKey2.replace(/\*/g, '');

                /* var htmlLable = new RegExp('^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$');//匹配是否是HTML标签*/
                /*console.log(htmlLable.test(searchContent))*/
                var HtmlUtil = {
                    /*1.用浏览器内部转换器实现html转码*/
                    htmlEncode: function (html) {
                        //1.首先动态创建一个容器标签元素，如DIV
                        var temp = document.createElement("div");
                        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
                        temp.textContent != undefined
                            ? (temp.textContent = html)
                            : (temp.innerText = html);
                        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
                        var output = temp.innerHTML;
                        temp = null;
                        return output;
                    },
                    /*2.用浏览器内部转换器实现html解码*/
                    htmlDecode: function (text) {
                        //1.首先动态创建一个容器标签元素，如DIV
                        var temp = document.createElement("div");
                        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
                        temp.innerHTML = text;
                        //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
                        var output = temp.innerText || temp.textContent;
                        temp = null;
                        return output;
                    },
                    /*3.用正则表达式实现html转码*/
                    htmlEncodeByRegExp: function (str) {
                        var s = "";
                        if (str.length == 0) return "";
                        s = str.replace(/&/g, "&amp;");
                        s = s.replace(/<span/g, "&lt;");
                        s = s.replace(/<image/g, "&lt;");
                        s = s.replace(/>/g, "&gt;");
                        s = s.replace(/ /g, "&nbsp;");
                        s = s.replace(/\'/g, "&#39;");
                        s = s.replace(/\"/g, "&quot;");
                        return s;
                    },
                    /*4.用正则表达式实现html解码*/
                    htmlDecodeByRegExp: function (str) {
                        var s = "";
                        if (str.length == 0) return "";
                        s = str.replace(/&amp;/g, "&");
                        s = s.replace(/&lt;/g, "<span");
                        s = s.replace(/&lt;/g, "<image");
                        s = s.replace(/&gt;/g, ">");
                        s = s.replace(/&nbsp;/g, " ");
                        s = s.replace(/&#39;/g, "'");
                        s = s.replace(/&quot;/g, '"');
                        return s;
                    }
                };

                var searchReg = new RegExp(searchKeyStr, "ig");
                // console.log(searchReg);
                return this.removeHTMLTag(searchContent).replace(
                    searchReg,
                    '<span class="key-word">' + searchKeyStr + "</span>"
                );
            },
        },
        components: {
            pagination,
            anim
        },
        watch: {
            // $route(){
            //   this.loadData1(this.$route.query)
            // }
        },
        updated() {
            $('.search-result .key-word').css('color', '#f63');
        },
    }
</script>

<style lang="less">
    .clear {
        clear: both;
    }

    .zuma-help-center {
        font-family: '微软雅黑';
        background: rgba(244, 244, 244, 1);
        padding-bottom: 60px;

        .bgTop {
            height: 200px;
            background: url(/images/help/helpBanner.png) center no-repeat;
            .helpTop {
                width: 1200px;
                margin: 0px auto;
                color: rgba(255, 255, 255, 0.98);
                font-size: 28px;
                padding-top: 40px;
                padding-left: 500px;
                a {
                    color: rgba(255, 255, 255, 0.98);
                }
            }
            .holdfont {
                font-weight: 700;
            }
            .zm {
                position: relative;
                margin-right: 25px;
                .line {
                    position: absolute;
                    width: 3px;
                    background: rgba(255, 255, 255, 0.95);
                    display: inline-block;
                    height: 28px;
                    top: 6px;
                    right: -10px;
                }
            }

            .search-box {
                width: 470px;
                height: 47px;
                padding-left: 32px;
                border-radius: 30px;
                background: #ffffff;
                margin-top: 19px;
                position: relative;

                input {
                    border: 0px;
                    color: #999999;
                    font-size: 18px;
                    width: 365px;
                    &::-webkit-input-placeholder {
                        color: #999999;
                    }
                }
                svg {
                    position: absolute;
                    width: 26px;
                    height: 26px;
                    top: 9px;
                    right: 25px;
                    fill: #333333;
                }
            }

        }

        .helpQuestion {
            width: 1210px;

            margin: 50px auto 0px;
            .helpQuestionLeft {
                width: 210px;
                min-height: 800px;
                background: rgba(255, 255, 255, .9);
                float: left;

                .questionLists {
                    padding-top: 18px;
                    .leve-1 {
                        position: relative;
                        cursor: pointer;
                        .fLeve {
                            color: #505050;
                            font-size: 16px;
                            padding-left: 44px;
                            height: 60px;
                            line-height: 60px;
                            font-weight: 700;
                            svg {
                                position: absolute;
                                // right:24px;
                                // height:6px;
                                // width:10px;
                                // top:27px;
                                fill: #505050;

                                transform: rotate(0deg);

                                right: 18px;
                                height: 10px;
                                width: 20px;
                                top: 25px
                            }
                        }
                    }
                    .active .fLeve {
                        color: #3d9be9;
                        svg {
                            transform: rotate(180deg);
                            fill: #3d9be9;
                        }
                    }
                    .leve-2 {
                        text-align: center;
                        padding-right: 20px;

                        a {
                            font-size: 14px;
                            color: #606060;
                            margin: 0;
                            height: 54px;
                            line-height: 54px;
                            display: block;
                        }
                        &:hover {
                            // background: #e2f1ff;
                            background:#cee7ff;
                        }
                    }
                    .active2 {
                        background:#e2f1ff;
                        a{
                            color:#3d9be9;
                            
                        }
                        
                    }
                }

            }
            .helpQuestionRight {
                width: 967px;
                min-height: 860px;
                background: rgba(255, 255, 255, .9);
                float: right;
                padding-left: 44px;
                padding-right: 44px;
                padding-top: 10px;

                .question-right-top {
                    font-size: 16px;
                    height: 72px;
                    line-height: 72px;
                    border-bottom: 1px dashed #e1e8ec;
                    .arrowRight {
                        padding-right: 8px;
                        padding-left: 8px;
                    }
                    a {
                        color: #606060;
                    }
                    // .leve-1-name a {
                    //     color: #3d9be9;
                    // }
                    .leve-2-name a,.leve-3-name a {
                        color:#3d9be9;
                    }
                }

                .question-right-content {
                    padding-top: 28px;

                    .leve-3-list {
                        width: 100%;

                        li {
                            float: left;
                        }
                        a {
                            color: #999999;
                            padding-right: 10px;
                            margin-right: 10px;
                            border-right: 1px solid #999999;
                            display: inline-block;
                            height: 14px;
                            line-height: 14px;
                            margin-bottom: 15px;

                        }
                        li:nth-last-child(2) a {
                            border: 0px;
                        }

                        a.active {
                            color: #3d9be9;
                            font-weight: 700;
                        }
                    }

                    .question-list {
                        padding-top: 25px;
                        .question-list-title {
                            color: #3d9be9;
                        }
                        li {
                            margin-top: 20px;
                            a {
                                color: #999999;
                            }
                        }

                    }

                    .item-detail-title {
                        margin-bottom:26px;
                        // margin-bottom: 40px;
                        font-size:20px;
                    }
                    .item-detail-box{
                        overflow:hidden;
                        word-break: break-word !important;
                        
                        img{
                            max-width:100% !important;
                        }

                        
                    }
                }

                .search-result {

                    .search-result-top {
                        height: 42px;
                        font-size: 16px;
                        border-bottom: 1px dashed #e1e8ec;
                        margin-bottom: 30px;
                    }
                    .search-result-list {
                        padding-bottom: 20px;
                        cursor: pointer;
                        .question-item {
                            font-size: 16px;
                            color: #3d9be9;
                            margin-bottom: 5px;
                            .key-word {
                                color: #f63 !important;
                            }
                        }
                        .question-item-content {
                            height: 36px;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            word-break: break-all;
                            text-overflow: ellipsis;
                        }
                    }
                    .key-word {
                        color: #f63;
                    }
                }

            }
        }
    }


</style>

