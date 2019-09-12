<template>
    <div class="content">
        <div>收费控件及增值服务</div>
        <div>
            <div>建网站不求人，自助搭建在线交易网站！</div>
            <div>族蚂网致力于提供更加垂直的行业解决方案、成熟的模块化功能，助力企业轻松转型。</div>
            <div>我们为您提供了丰富的收费功能及增值服务，您可根据您的业务需求进行购买。</div>
        </div>
        <img src="/images/purchase/controlMarket_banner.png" alt="交易市场横幅图片">
        <div>
            <div>收费控件及增值服务列表</div>
            <div class="line"></div>
            <div>
                <div v-for="(item,index) in controlList" :key="index" v-if="item.fControlStatus === 3">
                    <div>
                        <div>
                            <img :src="item.leftImg" :alt="item.fName+'收费标识图'">
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div>{{item.fName}}</div>
                                    <div v-if="item.fIsPurchase === 3">当前已付费至{{item.fOrderDueTime | formatTime}}，请及时续费
                                    </div>
                                    <div v-if="item.fIsPurchase === 2">当前试用期至{{item.fOrderDueTime | formatTime}}，请及时购买
                                    </div>
                                </div>
                                <ol v-html="item.fDescription"></ol>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="showgfont"><span style="font-size: 29px">￥</span>{{item.fPrice?item.fPrice:item.priceBeanList[0].fPrice
                            | formatPrice}}
                        </div>
                        <div v-if="item.fIsPurchase === null || item.fIsPurchase === 2" @click="goToPay(item)">购买</div>
                        <div v-if="item.fIsPurchase === 1" class="disable">购买</div>
                        <div v-if="item.fIsPurchase === 3" @click="goToPay(item)">续费</div>
                        <div v-if="item.fProbation === 1 && item.fOrderProbation === null && item.fIsPurchase === null"
                             @click="tryOut(item,index)">试用
                        </div>
                        <div v-if="item.fProbation === 1 && (item.fIsPurchase === 1 || item.fIsPurchase === 3) && item.fOrderProbation === null"
                             class="disable">试用
                        </div>
                        <div v-if="item.fProbation === 1 && item.fOrderProbation === 1" class="disable">已试用</div>
                        <div v-if="item.fId === 'SD001' || item.fId === 'SD002'" @click="view(item.fId)">查看</div>
                    </div>
                </div>
                <div v-if="ipData && ipPrice">
                    <div>
                        <div>
                            <img src="/images/purchase/controlMarket_img4.png" alt="IP收费标识图">
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div>国内静态IP+ICP备案服务</div>
                                    <div v-if="ipData.fCurrentDueDate">当前已付费至{{ipData.fCurrentDueDate |
                                        formatTime}}，请及时续费
                                    </div>
                                </div>
                                <ol>
                                    <li>为您的网站分配国内静态IP地址</li>
                                    <li>提供免费ICP备案服务，不限次数</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="showgfont"><span style="font-size: 29px">￥</span>{{ipPrice | formatPrice}}</div>
                        <div v-if="!ipData.fCurrentDueDate" @click="goToPay(ipData)">购买</div>
                        <div v-else @click="goToPay(ipData)">续费</div>
                    </div>
                </div>
            </div>
        </div>
        <topBusinessBarPrompt v-if="isShowTopBusinessBarPrompt"></topBusinessBarPrompt>
        <rightBusinessBarPrompt v-if="isShowRightBusinessBarPrompt"></rightBusinessBarPrompt>
        <probationPopup v-if="isShowProbationPopup" :data="probationData"></probationPopup>
        <noAuthorityPopup v-if="isShowNoAuthorityPopup"></noAuthorityPopup>
    </div>
</template>

<script>
    import topBusinessBarPrompt from '~/components/purchase/dialog/topBusinessBarPrompt';
    import rightBusinessBarPrompt from '~/components/purchase/dialog/rightBusinessBarPrompt';
    import probationPopup from '~/components/purchase/dialog/probationPopup';
    import noAuthorityPopup from '~/components/public/dialog/noAuthorityPopup';

    export default {
        name: "controlMarket",
        components: {
            topBusinessBarPrompt,
            rightBusinessBarPrompt,
            probationPopup,
            noAuthorityPopup
        },
        data() {
            return {
                isHasAuthority: false,
                fShopId: null,
                dataObj: {
                    SD004: {
                        leftImg: '/images/purchase/controlMarket_img1.png',
                        name: '去除页底广告',
                        description: '<li>去除页底法律声明、隐私政策等信息</li><li>去除使用族蚂技术创建及服务器托管信息</li>',
                    },
                    SD001: {
                        leftImg: '/images/purchase/controlMarket_img2.png',
                        name: '顶部会员功能栏',
                        description: '<li>会员注册入口功能</li><li>会员登陆入口功能</li><li>定位访客所在地理位置功能</li><li>购物车入口功能，方便用户查看购物车</li><li>订单管理入口功能，方便用户查看订单详情</li><li>会员中心入口功能，方便用户登录会员中心</li>'
                    },
                    SD002: {
                        leftImg: '/images/purchase/controlMarket_img3.png',
                        name: '右侧电子商务功能栏',
                        description: '<li>购物车入口功能，方便用户查看购物车</li><li>会员中心入口功能，方便用户登录会员中心</li>'
                    }
                },
                controlList: [],
                probationData: {
                    fProbationDays: null,
                    fName: '',
                    fOrderDueTime: null
                },
                isShowProbationPopup: false,//是否显示试用弹窗
                ipData: null,
                ipPrice: null,
                isShowTopBusinessBarPrompt: false,//是否显示顶部功能栏的展示弹窗
                isShowRightBusinessBarPrompt: false,//是否显示右侧功能栏的展示弹窗
                isShowNoAuthorityPopup: false,//是否显示无权限弹窗
                dictionObj: {//通过不同id对应不同的名字
                    SD004: {
                        name: '页底广告',
                        type: 1
                    },
                    SD002: {
                        name: '电子商务功能栏',
                        type: 3
                    },
                    SD001: {
                        name: '顶部会员功能栏',
                        type: 4
                    },
                    SD000:{
                        name:'IP',
                        type:2
                    }
                },
                tryOutFlag: true,//避免快速点击多次重复发送试用请求
            }
        },
        props: ['pageData'],
        created() {
            this.fShopId = this.pageData.fShopId;
            this.controlList = this.pageData.controlList;
            if (this.controlList) {
                for (let i = 0; i < this.controlList.length; i++) {
                    if (this.controlList[i].fControlStatus === 3) {
                        this.controlList[i].fName = this.dataObj[this.controlList[i].fId].name;
                        this.controlList[i].fDescription = this.dataObj[this.controlList[i].fId].description;
                        this.$set(this.controlList[i], 'leftImg', this.dataObj[this.controlList[i].fId].leftImg);
                        this.$set(this.controlList[i], 'id', this.controlList[i].fId);
                    }
                }
            }
            this.ipData = this.pageData.ipData;
            if (this.ipData) {
                let length = this.ipData.dictionaryBeanList.length;
                if (length > 0) {
                    switch (this.ipData.dictionaryBeanList[length - 1].fValue) {
                        case 6:
                            this.ipPrice = this.ipData.moreDetailBeanList[0].fPrice;
                            break;
                        case 3:
                            this.ipPrice = this.ipData.lessDetailBeanList[0].fPrice;
                            break;
                        case 1:
                            this.ipPrice = this.ipData.singleDetailBeanList[0].fPrice;
                            break;
                    }
                }
                this.$set(this.ipData,'id','SD000');
            }
        },
        methods: {
            //去支付页
            goToPay(obj) {
                if (this.$route.query.fWebsiteId) {
                    window.location.href = '/pay?fShopId=' + this.fShopId + '&fWebsiteId=' + this.$route.query.fWebsiteId + '&type=' + this.dictionObj[obj.id].type;
                } else {
                    window.location.href = '/pay?fShopId=' + this.fShopId + '&type=' + this.dictionObj[obj.id].type;
                }
            },
            //计算试用截止期的时间戳
            probationDueTime(dayCount) {
                let time = new Date().getTime();
                time += dayCount * 24 * 3600 * 1000;
                return time;
            },
            view(id) {
                if (id === "SD001") {
                    this.isShowTopBusinessBarPrompt = true;
                }
                if (id === "SD002") {
                    this.isShowRightBusinessBarPrompt = true;
                }
            },
            //获取该网站是不是当前登录用户的
            getAuthority() {
                $.ajax({
                    url: this.interfaceApi.getUserBasicInfo,
                    data: {fShopId: this.$route.query.fShopId},
                    async: false,
                    success: (res) => {
                        if (res.status === 0) {
                            this.$store.commit("changeUserBasicInfo", res.data);
                            this.isHasAuthority = true;
                        }
                        if (res.status === 3) {
                            this.isHasAuthority = false
                        }
                    },
                    error: (err) => {
                        if (JSON.parse(err.responseText).status === -3) {
                            window.location.href = '/denglu?url=' + encodeURIComponent(window.location.href);
                        }
                    }
                });
            },
            //试用
            tryOut(obj, index) {
                this.isHasAuthority = false;
                this.getAuthority();
                if (this.isHasAuthority) {
                    let data = {
                        fShopId: this.fShopId,
                        fFunctionId: obj.fId,
                        fFunctionName: this.dictionObj[obj.fId].name,
                        fFunctionType: this.dictionObj[obj.fId].type,
                        functionOrderBeanList: [{
                            fShopId: this.fShopId,
                            fSiteId: this.$route.query.fWebsiteId ? this.$route.query.fWebsiteId : null,
                            fFunctionId: obj.fId,
                            fFunctionName: this.dictionObj[obj.fId].name,
                            fFunctionType: this.dictionObj[obj.fId].type,
                            fOrderBuy: 3,
                            fOrderProbationDays: obj.fProbationDays
                        }]
                    };
                    if (this.tryOutFlag) {
                        this.tryOutFlag = false;
                        $.ajax({
                            url: this.interfaceApi.requestWebsitePay,
                            type: 'post',
                            data: JSON.stringify(data),
                            dataType: 'json',
                            contentType: 'application/json;charset=utf-8',
                            success: (res) => {
                                console.log(res);
                                this.tryOutFlag = true;
                                if (res.status === 0) {
                                    this.probationData.fName = obj.fName;
                                    this.probationData.fProbationDays = obj.fProbationDays;
                                    this.probationData.fOrderDueTime = this.probationDueTime(obj.fProbationDays);
                                    this.isShowProbationPopup = true;
                                    this.controlList[index].fOrderProbation = 1;
                                }
                            },
                            error: (err) => {
                                console.log(err);
                            }
                        })
                    }
                } else {
                    this.isShowNoAuthorityPopup = true;
                }
            }
        },
        filters: {
            formatTime(val) {
                if (val) {
                    let year = new Date(val).getFullYear();
                    let month = new Date(val).getMonth() + 1;
                    let day = new Date(val).getDate();
                    return `${year}年${month}月${day}日`;
                }
            },
            formatPrice(val) {
                return val.toFixed(2);
            }
        }
    }
</script>

<style scoped lang="less">
    .content {
        width: 1200px;
        padding-top: 35px;
        margin: 0 auto;
        & > div:nth-child(1) {
            font-size: 24px;
            font-weight: bold;
            color: #797979;
        }
        & > div:nth-child(2) {
            margin-top: 20px;
            color: #949494;
            font-size: 16px;
            line-height: 26px;
        }
        & > img:nth-child(3) {
            width: 100%;
            margin-top: 15px;
        }
        & > div:nth-child(4) {
            margin-top: 60px;
            & > div:nth-child(1) {
                font-size: 24px;
                font-weight: bold;
                color: #797979;
            }
            .line {
                width: 100%;
                height: 1px;
                background: #e4e4e4;
                margin-top: 20px;
            }
            & > div:nth-child(3) {
                & > div {
                    width: 100%;
                    border-bottom: 1px solid #e4e4e4;
                    padding: 25px 0;
                    display: flex;
                    align-items: center;
                    & > div:nth-child(1) {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        width: 1036px;
                        & > div:nth-child(1) {
                            width: 312px;
                            img {
                                width: 312px;
                                height:174px;
                            }
                        }
                        & > div:nth-child(2) {
                            display: flex;
                            flex-direction: column;
                            flex: 2;
                            padding-left: 70px;
                            & > div {
                                & > div:nth-child(1) {
                                    & > div:nth-child(1) {
                                        font-size: 18px;
                                        font-weight: bold;
                                        color: #434343;
                                    }
                                    & > div:nth-child(2) {
                                        font-size: 14px;
                                        color: #2FB7EC;
                                        margin-top: 10px;
                                    }
                                }
                                & > ol {
                                    color: #797979;
                                    font-size: 14px;
                                    list-style: circle;
                                    line-height: 24px;
                                    margin-top: 10px;
                                }
                            }
                        }
                    }
                    & > div:nth-child(2) {
                        width: 120px;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        .showgfont {
                            font-size: 36px;
                            display: flex;
                            align-items: center;
                        }
                        & > div:nth-child(2) {
                            width: 120px;
                            height: 36px;
                            background: #3D9BE9;
                            font-size: 14px;
                            color: #ffffff;
                            text-align: center;
                            line-height: 36px;
                            cursor: pointer;
                            border-radius: 200px;
                            margin-top: 10px;
                            &:hover {
                                background: #64AFED;
                            }
                        }
                        & > div:nth-child(3) {
                            margin-top: 10px;
                            width: 120px;
                            height: 36px;
                            background: #ffffff;
                            font-size: 14px;
                            color: #3D9BE9;
                            text-align: center;
                            line-height: 36px;
                            cursor: pointer;
                            border-radius: 200px;
                            border: 1px solid #3D9BE9;
                            &:hover {
                                background: #64AFED;
                                color: #ffffff;
                            }
                            &.disable {
                                border: 1px solid #B1C9D3;
                                color: #B1C9D3;
                                cursor: not-allowed;
                            }
                            &.disable:hover {
                                background: none;
                                color: #B1C9D3;
                            }
                        }
                        & > div:nth-child(4) {
                            margin-top: 10px;
                            width: 120px;
                            height: 36px;
                            background: #ffffff;
                            font-size: 14px;
                            color: #3D9BE9;
                            text-align: center;
                            line-height: 36px;
                            cursor: pointer;
                            border-radius: 200px;
                            border: 1px solid #3D9BE9;
                            &:hover {
                                background: #64AFED;
                                color: #ffffff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>