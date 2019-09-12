<template>
    <div class="zm_pd_wrap">
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
                        <li
                                :class="[activePrice === i ? 'on':'']"
                                v-for="(item,i) in priceArr"
                                :key="i"
                                @click="PriceLi(item,i)"
                        >{{item}}
                        </li>
                    </ul>
                </div>
                <div class="inputSelectBoxs">
                    <div id="inputSelectBox_input_priceSelect" class="inputSelectBox">
                        {{priceSelect}}
                        <span class="priceSelect_icon"></span>
                    </div>
                    <ul v-if="showPriceSelect" class="inputSelectBox_list inputSelectBox_list_priceSelect">
                        <li
                                :class="[activePriceSelect === i ? 'on':'']"
                                v-for="(item,i) in priceSelectArr"
                                :key="i"
                                @click="priceSelectLi(item,i)"
                        >{{item}}
                        </li>
                    </ul>
                </div>
                <div class="inputSelectBoxs">
                    <div id="inputSelectBox_input_address" class="inputSelectBox" @click="showCityPicker">
                        <div style="width:110px;height:20px;line-height:20px;overflow:hidden;">{{clearAll ? '所在地' :
                            sellerAddress}}
                        </div>
                        <span class="address_icon"></span>
                    </div>
                    <citypicker
                            message="#inputSelectBox_input_address"
                            @getAddress="setAddress"
                            v-if="showAddress"
                            style="position:absolute;top:40px;"
                            class="inputSelectBox_list inputSelectBox_list_address"
                    />
                </div>
                <div class="inputSelectBoxs">
                    <div id="inputSelectBox_input_payType" class="inputSelectBox">
                        {{payType}}
                        <span class="payType_icon"></span>
                    </div>
                    <ul v-if="showPayType" class="inputSelectBox_list inputSelectBox_list_payType">
                        <li
                                :class="[activePayType === i ? 'on':'']"
                                v-for="(item,i) in payTypeArr"
                                :key="i"
                                @click="payTypeLi(item,i)"
                        >{{item}}
                        </li>
                    </ul>
                </div>
                <div class="clearSelect" @click="clearSelectAll()">清空选项</div>
            </div>
            <div v-if="searchcount" class="searchVal">
                <div>
                    搜索到"
                    <span style="color:#3D9BE9;">{{productObj.keyWord}}</span>
                    "相关结果{{totalCount}}个
                </div>
            </div>
        </div>
        <loading v-if="loadingSearch"></loading>
        <div class="zm_pd_wrap_cont">
            <div v-for="(item,i) in setList" :key="i" class="zm_pd_wrap_cont1" @click.stop="toDetail(item)">
                <div class="cont1_img">
                    <div v-show="checkShow1(item)" class="commonbox payMethod">{{checkShow1(item)}}</div>
                    <div v-show="checkShow2(item)" class="commonbox valuation">{{checkShow2(item)}}</div>
                    <div class="imgBox">
                        <img class="cont1_img_bg"
                             :alt="item.productName?item.productName:''+item.productKeyWord?item.productKeyWord:''"
                             @load="handleImg($event,224,224)" :src="item.productMainUrl"/>
                    </div>
                    <div v-show="checkShow3(item)" class="commonbox productType">{{checkShow3(item)}}</div>
                    <div v-show="checkShow4(item)" class="commonbox localCity">{{checkShow4(item)}}</div>
                    <div class="cont1_img_cover"></div>
                </div>
                <div class="cont1_title">
                    <p>
                        <span>{{item.fHasFormula == 1 ? "" : "￥"}}</span>
                        <span>{{item.productPrice | filterPrice}}</span>
                    </p>
                    <p v-html="item.productName"></p>
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
            抱歉！没有找到符合条件的产品！
        </div>
        <div v-if="noPublish && productObj.fEntrepId"
             style="width:100%;height:160px;line-height:160px;text-align:center;font-size:18px;">抱歉！该主体没有发布产品！
        </div>
        <entrepPopup v-if="popupConfig.isShow && popupConfig.type === 'entrep'"></entrepPopup>
    </div>
</template>

<script>
    import banner from "~/components/product/banner";
    import loading from "~/components/public/loading";
    import citypicker from "~/components/public/cityPicker";
    import toTop from "~/components/public/toTop.vue";
    import publicUtil from '~/common/publicUtil';
    import entrepPopup from '~/components/public/dialog/entrepPopup';

    export default {
        name: "product",
        components: {citypicker, banner, loading, toTop,entrepPopup},
        props: ['pageData'],
        data() {
            return {
                isLoadMore: false,
                noPublish: false,
                showSelectWebsite: true,
                setList: null,
                setList2: null,
                priceArr: ["从低到高", "从高到低", "定制价格"], //初始的筛选数据列表
                priceSelectArr: ["新品", "二手", "翻新"],
                payTypeArr: ["一次性付", "分阶段付"],
                price: "价格", //初始的筛选数据
                priceSelect: "类型",
                payType: "付款方式",
                sellerDetailAddress: "",
                sellerAddress: "所在地",
                activePrice: "", //选中之后的筛选数据
                activePriceSelect: "",
                activePayType: "",
                showPrice: false, //是否显示筛选数据列表
                showPriceSelect: false,
                showPayType: false,
                showAddress: false,
                clearAll: false,
                noSearch: false,//判断当前没有处于搜索状态
                search: false, //判断当前处于搜索状态
                searchcount: false,//判断是否显示搜索结果
                toTopShow: false, //是否显示置顶
                loading: false, //是否显示列表加载动画
                loadingSearch: false,//搜索加载动画
                noData: false,//没有找到相关数据显示
                getUrl: "/product_gateway/productSearch/searchProductList",
                productObj: null,
                totalCount: 0,//总条数
                firstLoading: false,//标记第一次加载的数据后，是否还有数据   false 有数据  true 没数据
                isBottom: false, //判断是否到底了
            };
        },
        created() {
            this.productObj = this.pageData.obj;
            this.setList = this.pageData.productList.content;
            if (this.pageData.productList && this.pageData.productList.count < 60 && this.pageData.productList.count > 0) {
                this.isLoadMore = false;
                this.isBottom = true;
            } else if (this.pageData.productList.count > 60) {
                this.isLoadMore = true;
            } else {
                this.noData = true;
            }

            if (this.productObj.keyWord != null) {
                this.setList = this.pageData.productList.content;
                this.search = true;
                this.noSearch = false;
                this.searchWords();
            } else {
                this.search = false;
                this.noSearch = true;
                if (this.setList.length > 0) {
                    this.totalCount = this.pageData.productList.count;
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
        filters: {
            filterPrice(val) {
                return val.toFixed(2);
            }
        },
        computed: {
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
            checkShow1(item) {
                if (item.productPayMent == 1) {
                    return '诚意金';
                } else if (item.productPayMent == 3) {
                    return '保证金';
                } else if (item.productPayMent == 4) {
                    return '定金';
                } else {
                    return '';
                }
            },
            checkShow2(item) {
                if (item.hasFormula == 1 && item.productWholesale == 1) {
                    return '在线计价';
                } else if (item.hasFormula == 1 && item.productWholesale == 2) {
                    return '定制批发';
                } else if (item.hasFormula == 2 && item.productWholesale == 2) {
                    return '批发';
                } else {
                    return '';
                }
            },
            checkShow3(item) {
                if (item.productType == 2) {
                    return '二手';
                } else if (item.productType == 3) {
                    return '翻新';
                } else if (item.productType == 0) {
                    if (item.childType.indexOf("2") !== -1 && item.childType.indexOf("3") !== -1) {
                        return "二手/翻新";
                    } else if (item.childType.indexOf("2") === -1 && item.childType.indexOf("3") !== -1) {
                        return "翻新";
                    } else if (item.childType.indexOf("2") !== -1 && item.childType.indexOf("3") === -1) {
                        return "二手";
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            checkShow4(item) {
                if (item.tranType == 2) {
                    return '同城交易';
                } else {
                    return '';
                }
            },
            async PriceLi(val, i) {
                this.productObj.pageNow = 1;
                this.price = val;
                this.activePrice = i;
                this.productObj.priceType = (i + 1);
                this.loadingSearch = true;
                this.searchcount = false;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getProductList, this.productObj));
                let content = contentList.content;

                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
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
                    this.totalCount = 0;
                    this.loadingSearch = false;
                    this.setList = content;
                    this.noData = true;
                }
            },
            async priceSelectLi(val, i) {
                this.productObj.pageNow = 1;
                this.priceSelect = val;
                this.activePriceSelect = i;
                this.productObj.productType = (i + 1);
                this.loadingSearch = true;
                this.searchcount = false;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getProductList, this.productObj));
                let content = contentList.content;
                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
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
                    this.totalCount = 0;
                    this.loadingSearch = false;
                    this.setList = content;
                    this.noData = true;
                }
            },
            async payTypeLi(val, i) {
                this.productObj.pageNow = 1;
                this.payType = val;
                this.activePayType = i;
                this.productObj.productPayMent = (i + 1);
                this.loadingSearch = true;
                this.searchcount = false;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getProductList, this.productObj));
                let content = contentList.content;
                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
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
                    this.totalCount = 0;
                    this.loadingSearch = false;
                    this.setList = content;
                    this.noData = true;
                }
            },
            async clearSelectAll() {
                this.price = "价格";
                this.priceSelect = "类型";
                this.payType = "付款方式";
                this.activePrice = "";
                this.activePriceSelect = "";
                this.activePayType = "";
                this.clearAll = true;

                this.productObj.pageNow = 1;
                this.productObj.priceType = null;
                this.productObj.productType = null;
                this.productObj.productPayMent = null;
                this.productObj.placeOrigin = null;
                this.loadingSearch = true;
                this.searchcount = false;
                this.isBottom = false;
                this.setList2 = 0;
                let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getProductList, this.productObj));
                let content = contentList.content;
                if (content) {
                    this.setList = content;
                    this.totalCount = contentList.count;
                    this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
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
                    this.totalCount = 0;
                    this.loadingSearch = false;
                }
            },
            showCityPicker() {
                this.showAddress = true;
            },
            async setAddress(val) {
                let location = "所在地";
                let detailAddressArr = [];
                if (val) {
                    for (let i = 0; i < val.length; i++) {
                        for (let key in val[i]) {
                            if (val[i][key] && typeof val[i][key] == "string") {
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

                    this.productObj.pageNow = 1;
                    this.productObj.placeOrigin = this.sellerDetailAddress;
                    this.loadingSearch = true;
                    this.searchcount = false;
                    this.isBottom = false;
                    this.setList2 = 0;
                    let contentList = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getProductList, this.productObj));
                    let content = contentList.content;
                    if (content) {
                        this.setList = content;
                        this.totalCount = contentList.count;
                        this.totalCount == 0 ? (this.noData = true) : (this.noData = false);
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
                });
            },
            //滚动到底部请求数据
            async loadMore() {
                // 没有正在加载中才会请求数据
                if (!this.loading) {
                    if (this.isBottom) {
                        this.loading = false
                        return
                    }
                    this.loading = true;
                    let res = await this.after2Seconds(30);
                    this.productObj.pageNow += 1;
                    let response = await this.requestUtil.validateData(await this.requestUtil.getData(this.interfaceApi.getProductList, this.productObj));
                    if (!response.content) {
                        this.productObj.pageNow -= 1;
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
                        console.log('setlist', this.setList)
                        if (newData.length * this.productObj.pageNow == response.count && response.count % 60 == 0) {
                            this.isBottom = true;
                            return;
                        }
                    }
                }
            },
            searchWords() {
                this.productObj.pageNow = 1;
                this.isBottom = false;
                this.setList2 = 0;
                let content = this.pageData.productList;
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
                    this.loadingSearch = false;
                    this.totalCount = 0;
                    this.searchcount = true;
                    this.noData = true;
                }
            },
            toDetail(val) {
                window.open(val.productUrl, '_blank');
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
            handleImg(e, maxWidth, maxHeight) {
                publicUtil.handleImg(e, maxWidth, maxHeight);
            },
        },

        watch: {
            clickEvent(e) {
                //监听点击事件
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
                this.showAddress = false;
                if (val + document.documentElement.clientHeight > document.documentElement.scrollHeight - 80 && this.isLoadMore) {
                    this.loadMore();
                }
                if (val > document.documentElement.clientHeight * 2) {
                    //第二屏
                    this.toTopShow = true;
                } else {
                    this.toTopShow = false;
                }
            },
        },
    };
</script>
<style scoped lang="less">
    @import '../../assets/css/product';
</style>