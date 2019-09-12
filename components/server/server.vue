<template>
    <div class="zm_server_wrap">
        <banner v-if="noSearch"></banner>
        <div class="shaixuan" v-if="search">
            <div class="select_wrap">
                <div class="select_text">筛选条件</div>
                <div class="inputSelectBoxs">
                    <div id="inputSelectBox_input_price" class="inputSelectBox">
                        {{price}}
                        <span class="price_icon">
                <i></i>
              </span>
                    </div>
                    <ul v-if="showPrice" class="inputSelectBox_list inputSelectBox_list_price">
                        <li :class="[activePrice === i ? 'on':'']" v-for="(item,i) in priceArr" :key="i"
                            @click="PriceLi(item,i)">{{item}}
                        </li>
                    </ul>
                </div>
                <div class="inputSelectBoxs">
                    <div id="inputSelectBox_input_priceSelect" class="inputSelectBox">
                        {{priceSelect}}
                        <span class="priceSelect_icon">
              </span>
                    </div>
                    <ul v-if="showPriceSelect" class="inputSelectBox_list inputSelectBox_list_priceSelect">
                        <li :class="[activePriceSelect === i ? 'on':'']" v-for="(item,i) in priceSelectArr" :key="i"
                            @click="priceSelectLi(item,i)">{{item}}
                        </li>
                    </ul>
                </div>
                <div class="inputSelectBoxs">
                    <div id="inputSelectBox_input_payType" class="inputSelectBox">
                        {{payType}}
                        <span class="payType_icon">
              </span>
                    </div>
                    <ul v-if="showPayType" class="inputSelectBox_list inputSelectBox_list_payType">
                        <li :class="[activePayType === i ? 'on':'']" v-for="(item,i) in payTypeArr" :key="i"
                            @click="payTypeLi(item,i)">{{item}}
                        </li>
                    </ul>
                </div>
                <div class="inputSelectBoxs">
                    <div id="inputSelectBox_input_address" class="inputSelectBox" @click="showCityPicker">
                        <div style="width:110px;height:20px;line-height:20px;overflow:hidden;">{{clearAll ? '商家所在地' :
                            sellerAddress}}
                        </div>
                        <span class="address_icon">
              </span>
                    </div>
                    <citypicker message="#inputSelectBox_input_address" @getAddress="setAddress" v-if="showAddress"
                                style="position:absolute;top:40px;"
                                class="inputSelectBox_list inputSelectBox_list_address"></citypicker>
                </div>
                <div class="inputSelectBoxs">
                    <div id="inputSelectBox_input_serverTime" class="inputSelectBox">
                        {{serverTime}}
                        <span class="serverTime_icon">
              </span>
                    </div>
                    <ul v-if="showServerTime" class="inputSelectBox_list inputSelectBox_list_serverTime">
                        <li :class="[activeServerTime === i ? 'on':'']" v-for="(item,i) in serverTimeArr" :key="i"
                            @click="serverTimeLi(item,i)">{{item}}
                        </li>
                    </ul>
                </div>
                <div class="inputSelectBoxs">
                    <div id="inputSelectBox_input_serverType" class="inputSelectBox">
                        {{serverType}}
                        <span class="serverType_icon">
              </span>
                    </div>
                    <ul v-if="showServerType" class="inputSelectBox_list inputSelectBox_list_serverType">
                        <li :class="[activeServerType === i ? 'on':'']" v-for="(item,i) in serverTypeArr" :key="i"
                            @click="serverTypeLi(item,i)">{{item}}
                        </li>
                    </ul>
                </div>
                <div class="clearSelect" @click="clearSelectAll()">清空选项</div>
            </div>
            <div v-if="searchcount" class="searchVal">
                <div>
                    搜索到"
                    <span style="color:#3D9BE9;">{{serverObj.keyword}}</span>
                    "相关结果{{totalCount}}个
                </div>
            </div>
        </div>
        <loading v-if="loadingSearch"></loading>
        <div class="zm_pd_wrap_cont">
            <div v-for="(item,i) in setList" :key="i" class="zm_pd_wrap_cont1" @click.stop.prevent="toDetail(item)">
                <div class="cont1_img">
                    <div class="commonbox payMethod" v-show="checkShow1(item)">{{checkShow1(item)}}</div>
                    <div class="commonbox valuation" v-show="checkShow2(item)">{{checkShow2(item)}}</div>
                    <div class="imgBox">
                        <img class="cont1_img_bg" @load="handleImg($event,224,224)"
                             :alt="item.fServiceName?item.fServiceName:''+item.fServiceKey?item.fServiceKey:''"
                             :src="item.fMainImage"/>
                    </div>
                    <div class="commonbox localCity" v-show="checkShow3(item)">{{checkShow3(item)}}</div>
                    <div class="cont1_img_cover"></div>
                </div>

                <div class="cont1_title">
                    <p>
                        <span class="moneyIcon">￥</span>
                        <span class="moneyNum">{{item.fServicePriceStr}}</span>
                    </p>
                    <p v-html="item.fServiceName"></p>
                </div>
            </div>
            <div v-for="(item,i) in setList2" :key="i+Math.random()" class="zm_pd_wrap_cont1 zm_pd_wrap_contBlank">
            </div>
        </div>
        <to-top v-if="toTopShow"></to-top>
        <loading v-if="loading"></loading>
        <div v-if="isBottom" style="width:100%;text-align:center;font-size:12px;height:60px;line-height:60px;">已经到底了
        </div>
        <div v-if="noData" style="width:100%;height:160px;line-height:160px;text-align:center;font-size:18px;">
            抱歉！没有找到符合条件的服务！
        </div>
        <div v-if="noPublish && serverObj.fEntrepId"
             style="width:100%;height:160px;line-height:160px;text-align:center;font-size:18px;">抱歉！该主体没有发布服务！
        </div>
        <entrepPopup v-if="popupConfig.isShow && popupConfig.type === 'entrep'"></entrepPopup>
    </div>
</template>
<script>
    import banner from "~/components/server/banner";
    import loading from "~/components/public/loading";
    import citypicker from "~/components/public/cityPicker";
    import toTop from "@/components/public/toTop.vue";
    import entrepPopup from '~/components/public/dialog/entrepPopup';

    export default {
        name: "product",
        components: {
            banner, citypicker, loading, toTop,entrepPopup
        },
        props: ['pageData'],
        data() {
            return {
                isLoadMore: false,
                payMethod: '诚意金',
                valuation: '在线计价',
                localCity: '上门',
                noPublish: false,
                setList: null,
                setList2: null,
                priceArr: ['从低到高', '从高到低', '定制价格'],//初始的筛选数据列表
                priceSelectArr: ['接受议价', '一口价'],
                payTypeArr: ['一次性付', '分阶段付', '分时段付'],
                serverTimeArr: ['分钟', '小时', '天', '月'],
                serverTypeArr: ['上门服务', '到店服务', '线上服务', '电话服务', '代办服务'],
                price: '价格',//初始的筛选数据
                priceSelect: '议价选项',
                payType: '付款方式',
                serverTime: '服务耗时',
                serverType: '服务方式',
                sellerDetailAddress: null,
                sellerAddress: '商家所在地',
                activePrice: '',//选中之后的筛选数据
                activePriceSelect: '',
                activePayType: '',
                activeServerTime: '',
                activeServerType: '',
                showPrice: false,//是否显示筛选数据列表
                showPriceSelect: false,
                showPayType: false,
                showServerTime: false,
                showServerType: false,
                showAddress: false,
                clearAll: false,//判定是否点击清空选项
                noSearch: false,//判断没有处于搜索状态
                search: false,//判断处于搜索状态
                searchcount: false,//判断是否显示搜索结果
                toTopShow: false,//是否置顶显示
                loading: false,//是否显示加载动画
                loadingSearch: false,//搜索加载动画
                noData: false,//没有找到相关数据
                getUrl: '/service/webbuilder-api/search/searchService',
                serverObj: null,
                totalCount: 0,//总条数
                isBottom: false,//判断是否到底了
            };
        },
        created() {
            this.serverObj = this.pageData.obj;
            this.setList = this.pageData.serverList.content;
            if (this.pageData.serverList && this.pageData.serverList.count < 60 && this.pageData.serverList.count > 0) {
                this.isLoadMore = false;
                this.isBottom = true;
            } else if (this.pageData.serverList.count > 60) {
                this.isLoadMore = true;
            } else {
                this.noData = true;
            }

            if (this.serverObj.keyword != null) {
                this.setList = this.pageData.serverList.content;
                this.search = true;
                this.noSearch = false;
                this.searchWords();
            } else {
                this.search = false;
                this.noSearch = true;
                if (this.setList.length > 0) {
                    this.totalCount = this.pageData.serverList.count;
                    if (this.setList.length < 60 && this.setList.length > 0) {
                        this.repairBlack(this.setList.length);
                        this.isBottom = true;
                    }
                    if (this.totalCount == 0) {
                        this.noData = true;
                    }
                    this.noPublish = false;
                } else {
                    this.noPublish = true;
                    this.noData = false;
                    this.loading = false;
                    this.loadingSearch = false;
                }
            }
        },
        computed: {
            clickEvent() {
                return this.$store.state.clickEvent;
            },
            windowWidth() {
                return this.$store.state.windowWidth;
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
            checkShow1(item) {
                if (item.fPayType == 0) {
                    if (item.fTakeType == null) {
                        return '';
                    } else {
                        if (item.fHasVariant == 1) {
                            return item.fTake + '分钟';
                        } else if (item.fHasVariant == 2) {
                            return item.fTake + '小时';
                        } else {
                            return '';
                        }
                    }
                } else if (item.fPayType == 1) {
                    if (JSON.parse(item.fPayList).payTypeselect == 1) {
                        return "诚意金";
                    } else if (JSON.parse(item.fPayList).payTypeselect == 2) {
                        return "定金";
                    }
                } else if (item.fPayType == 2) {
                    if (item.fTakeType == 3) {
                        return "按天付";
                    } else if (item.fTakeType == 4) {
                        return "按月付";
                    }
                }
            },
            checkShow2(item) {
                if (item.fHasFormula == 0) {
                    return '';
                } else if (item.fHasFormula == 1) {
                    return '在线计价';
                }
            },
            checkShow3(item) {
                if (item.fServiceType == 1) {
                    return '上门';
                } else if (item.fServiceType == 2) {
                    return '到店';
                } else if (item.fServiceType == 3) {
                    return '线上';
                } else if (item.fServiceType == 4) {
                    return '电话服务';
                } else if (item.fServiceType == 5) {
                    return '代办服务';
                } else {
                    return '';
                }
            },
            async PriceLi(val, i) {
                this.price = val;
                this.activePrice = i;
                this.serverObj.priceSort = (i + 1);
                this.loadingSearch = true;
                this.searchcount = false;
                this.serverObj.pageNow = 1;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getServerList, this.serverObj));
                let content = contentList.content;
                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.loadingSearch = false;
                    this.searchcount = true;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
                    if (this.setList.length < 60 && this.setList.length > 0) {
                        this.repairBlack(this.setList.length);
                        this.isBottom = true;
                    }
                    if (this.totalCount <= 60 && this.totalCount > 0) {
                        this.isBottom = true;
                    } else if (this.totalCount == 0) {
                        this.isBottom = false;
                    }
                } else {
                    this.totalCount = 0;
                    this.loadingSearch = false;
                    this.setList = content;
                    this.noData = true;
                }
            },
            async priceSelectLi(val, i) {
                this.priceSelect = val;
                this.activePriceSelect = i;
                if (i == 0) {
                    this.serverObj.isOpenPrice = 1;
                } else if (i == 1) {
                    this.serverObj.isOpenPrice = 0
                }
                this.loadingSearch = true;
                this.searchcount = false;
                this.serverObj.pageNow = 1;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getServerList, this.serverObj));
                let content = contentList.content;
                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.loadingSearch = false;
                    this.searchcount = true;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
                    if (this.setList.length < 60 && this.setList.length > 0) {
                        this.repairBlack(this.setList.length);
                        this.isBottom = true;
                    }
                    if (this.totalCount <= 60 && this.totalCount > 0) {
                        this.isBottom = true;
                    } else if (this.totalCount == 0) {
                        this.isBottom = false;
                    }
                } else {
                    this.totalCount = 0;
                    this.loadingSearch = false;
                    this.setList = content;
                    this.noData = true;
                }
            },
            async payTypeLi(val, i) {
                this.payType = val;
                this.activePayType = i;
                this.serverObj.payType = i;
                this.loadingSearch = true;
                this.searchcount = false;
                this.serverObj.pageNow = 1;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getServerList, this.serverObj));
                let content = contentList.content;
                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.loadingSearch = false;
                    this.searchcount = true;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
                    if (this.setList.length < 60 && this.setList.length > 0) {
                        this.repairBlack(this.setList.length);
                        this.isBottom = true;
                    }
                    if (this.totalCount <= 60 && this.totalCount > 0) {
                        this.isBottom = true;
                    } else if (this.totalCount == 0) {
                        this.isBottom = false;
                    }
                } else {
                    this.totalCount = 0;
                    this.loadingSearch = false;
                    this.setList = content;
                    this.noData = true;
                }

            },
            async serverTimeLi(val, i) {
                this.serverTime = val;
                this.activeServerTime = i;
                this.serverObj.takeType = (i + 1);
                this.loadingSearch = true;
                this.searchcount = false;
                this.serverObj.pageNow = 1;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getServerList, this.serverObj));
                let content = contentList.content;
                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.loadingSearch = false;
                    this.searchcount = true;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
                    if (this.setList.length < 60 && this.setList.length > 0) {
                        this.repairBlack(this.setList.length);
                        this.isBottom = true;
                    }
                    if (this.totalCount <= 60 && this.totalCount > 0) {
                        this.isBottom = true;
                    } else if (this.totalCount == 0) {
                        this.isBottom = false;
                    }
                } else {
                    this.totalCount = 0;
                    this.loadingSearch = false;
                    this.setList = content;
                    this.noData = true;
                }
            },
            async serverTypeLi(val, i) {
                this.serverType = val;
                this.activeServerType = i;
                this.serverObj.serviceType = (i + 1);
                this.loadingSearch = true;
                this.searchcount = false;
                this.serverObj.pageNow = 1;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getServerList, this.serverObj));
                let content = contentList.content;
                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.loadingSearch = false;
                    this.searchcount = true;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
                    if (this.setList.length < 60 && this.setList.length > 0) {
                        this.repairBlack(this.setList.length);
                        this.isBottom = true;
                    }
                    if (this.totalCount <= 60 && this.totalCount > 0) {
                        this.isBottom = true;
                    } else if (this.totalCount == 0) {
                        this.isBottom = false;
                    }
                } else {
                    this.totalCount = 0;
                    this.loadingSearch = false;
                    this.setList = content;
                    this.noData = true;
                }
            },
            async clearSelectAll() {
                this.price = '价格';
                this.priceSelect = '议价选项';
                this.payType = '付款方式';
                this.serverTime = '服务耗时';
                this.serverType = '服务方式';
                this.activePrice = '';
                this.activePriceSelect = '';
                this.activePayType = '';
                this.activeServerTime = '';
                this.activeServerType = '';
                this.clearAll = true;

                this.serverObj.pageNow = 1;
                this.serverObj.priceSort = null;
                this.serverObj.isOpenPrice = null;
                this.serverObj.payType = null;
                this.serverObj.takeType = null;
                this.serverObj.serviceType = null;
                this.serverObj.serviceShopAddress = null;

                this.loadingSearch = true;
                this.searchcount = false;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getServerList, this.serverObj));
                let content = contentList.content;
                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.loadingSearch = false;
                    this.searchcount = true;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
                    if (this.setList.length < 60 && this.setList.length > 0) {
                        this.repairBlack(this.setList.length);
                        this.isBottom = true;
                    }
                    if (this.totalCount <= 60 && this.totalCount > 0) {
                        this.isBottom = true;
                    } else if (this.totalCount == 0) {
                        this.isBottom = false;
                    }
                } else {
                    this.totalCount = 0;
                    this.loadingSearch = false;
                }

            },
            showCityPicker() {
                this.showAddress = true;
            },
            async setAddress(val) {
                console.log('地址', val)
                let location = '商家所在地';
                let detailAddressArr = [];
                if (val) {
                    for (let i = 0; i < val.length; i++) {
                        for (let key in val[i]) {
                            if (val[i][key] && typeof val[i][key] == 'string') {
                                location = val[i][key];
                                detailAddressArr.push(val[i][key]);
                            }
                        }
                    }
                    this.sellerDetailAddress = detailAddressArr.join(">");
                    console.log(this.sellerDetailAddress, location);
                    this.sellerAddress = location;
                    this.clearAll = false;
                    this.showAddress = false;

                    this.serverObj.pageNow = 1;
                    this.serverObj.serviceShopAddress = this.sellerDetailAddress;
                    this.loadingSearch = true;
                    this.searchcount = false;
                    this.isBottom = false;
                    this.setList2 = 0;
                    let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getServerList, this.serverObj));
                    let content = contentList.content;
                    if (content) {
                        this.setList = content;
                        this.totalCount = contentList.count;
                        this.loadingSearch = false;
                        this.searchcount = true;
                        this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
                        if (this.setList.length < 60 && this.setList.length > 0) {
                            this.repairBlack(this.setList.length);
                            this.isBottom = true;
                        }
                        if (this.totalCount <= 60 && this.totalCount > 0) {
                            this.isBottom = true;
                        } else if (this.totalCount == 0) {
                            this.isBottom = false;
                        }
                    } else {
                        this.totalCount = 0;
                        this.loadingSearch = false;
                        this.setList = content;
                        this.noData = true;
                    }
                }
            },
            //间隔时间设置，这里是设置几秒后请求数据
            after2Seconds(num) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(2 * num);
                    }, 1000);
                })
            },
            async loadMore() {
                // 没有正在加载中才会请求数据
                if (!this.loading) {
                    if (this.isBottom) {
                        this.loading = false;
                        return
                    }
                    this.loading = true;
                    let res = await this.after2Seconds(30);
                    this.serverObj.pageNow += 1;
                    let response = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getServerList, this.serverObj));
                    if (!response.content) {
                        this.serverObj.pageNow -= 1;
                        this.loading = false;
                    } else {
                        // 请求下一页数据
                        let newData = response.content;
                        // 数据刚好为一页默认有更多数据
                        this.setList = this.setList.concat(newData);
                        this.loading = false;
                        if (newData.length < 60 && newData.length > 0) {
                            this.repairBlack(newData.length);
                            this.isBottom = true;
                        }
                        if (newData.length * this.serverObj.pageNow == response.count && response.count % 60 == 0) {
                            this.isBottom = true;
                            return;
                        }
                    }
                }
            },
            searchWords() {
                this.serverObj.pageNow = 1;
                this.isBottom = false;
                this.setList2 = 0;

                let content = this.pageData.serverList;
                if (content.content) {
                    this.setList = content.content;
                    this.totalCount = content.count;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
                    this.loading = false;
                    this.loadingSearch = false;
                    this.searchcount = true;
                    if (this.setList.length < 60 && this.setList.length > 0) {
                        this.repairBlack(this.setList.length);
                        this.isBottom = true;
                    }
                    if (this.totalCount <= 60 && this.totalCount > 0) {
                        this.isBottom = true;
                    } else if (this.totalCount == 0) {
                        this.isBottom = false;
                    }
                } else {
                    // this.setList = content.content;
                    console.log('content为null')
                    this.loadingSearch = false;
                    this.totalCount = 0;
                    this.searchcount = true;
                    this.noData = true;
                }
            },
            toDetail(val) {
                window.open(val.fServiceUrl, '_blank');
            },
            repairBlack(len) {
                if (len > 0) {
                    if (len % 5 !== 0) {
                        this.setList2 = 5 - (len % 5);
                    } else {
                        this.setList2 = 0;
                    }
                }
            },
            //maxWidth:设置图片的width（具体像素值），maxHeight:设置图片的height(具体像素值)
            handleImg(e, maxWidth, maxHeight) {
                var image = new Image();
                // 获取允许的最大宽度和最大高度
                var iwidth = maxWidth;
                var iheight = maxHeight;
                image.src = e.target.src;
                if (image.width > 0 && image.height > 0) {
                    if (image.width / image.height == iwidth / iheight) {
                        // 方图
                        e.target.width = iwidth;
                        e.target.height = iheight;
                        $(e.target).css("marginTop", 0);
                        $(e.target).css("marginLeft", 0);
                    } else {
                        if (image.width / image.height > iwidth / iheight) {
                            // 横图
                            e.target.width = (image.width * iheight) / image.height;
                            e.target.height = iheight;
                            $(e.target).css("marginTop", 0);
                            $(e.target).css("marginLeft", "-" + Math.ceil(e.target.width - maxWidth) / 2 + "px");
                        } else {
                            // 竖图
                            e.target.width = iwidth;
                            e.target.height = (image.height * iwidth) / image.width;
                            $(e.target).css("marginTop", "-" + Math.ceil(e.target.height - maxHeight) / 2 + "px");
                            $(e.target).css("marginLeft", 0);
                        }
                    }
                }
            },
        },
        watch: {
            clickEvent(e) {//监听点击事件
                if ($(e.target).closest("#inputSelectBox_input_price").length > 0) {
                    this.showPrice = true;
                } else {
                    setTimeout(() => {
                        this.showPrice = false;
                    }, 200);
                }
                if ($(e.target).closest("#inputSelectBox_input_priceSelect").length > 0) {
                    this.showPriceSelect = true;
                } else {
                    setTimeout(() => {
                        this.showPriceSelect = false;
                    }, 200);
                }
                if ($(e.target).closest("#inputSelectBox_input_payType").length > 0) {
                    this.showPayType = true;
                } else {
                    setTimeout(() => {
                        this.showPayType = false;
                    }, 200);
                }
                if ($(e.target).closest("#inputSelectBox_input_serverType").length > 0) {
                    this.showServerType = true;
                } else {
                    setTimeout(() => {
                        this.showServerType = false;
                    }, 200);
                }
                if ($(e.target).closest("#inputSelectBox_input_serverTime").length > 0) {
                    this.showServerTime = true;
                } else {
                    setTimeout(() => {
                        this.showServerTime = false;
                    }, 200);
                }
                if ($(e.target).closest("#inputSelectBox_input_address").length > 0) {
                    this.showAddress = true;
                } else {
                    setTimeout(() => {
                        this.showAddress = false;
                    }, 200);
                }
            },
            scrollTop(val) {
                this.showPrice = false;
                this.showPriceSelect = false;
                this.showPayType = false;
                this.showServerType = false;
                this.showServerTime = false;
                this.showAddress = false;
                if (val + document.documentElement.clientHeight > document.documentElement.scrollHeight - 80 && this.isLoadMore) {
                    this.loadMore();
                }
                if (val > document.documentElement.clientHeight * 2) {
                    //第二屏
                    this.toTopShow = true
                } else {
                    this.toTopShow = false
                }
            },
        },
    };
</script>
<style scoped lang="less">
    @import '../../assets/css/server';
</style>

