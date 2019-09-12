let api = {
    getLoginStatus: '/member_web/memberCenterIndex/getUserLoginStatus?_=' + new Date().getTime(),//获取用户登录状态,
    getUserBasicInfo: '/user/basic?_=' + new Date().getTime(),//获取用户基本信息,
    getLocation: '/member_web/userLocation/queryByUserId?_=' + new Date().getTime(),//获取用户存储的所在地
    getLocation1: '/member_web/userLocation/getData?_=' + new Date().getTime(),//根据IP获取用户所在地
    saveLocation: '/member_web/userLocation/save?_=' + new Date().getTime(),//用户切换地址以后存储用户所在地
    getMessageNum: '/helpMessage/queryHelpLetterNoReadFormember?_=' + new Date().getTime(),//获取信息数量
    getShopCartNum: '/cart/getCartSum?_=' + new Date().getTime(),//获取购物车数量
    getShopInfo: "/shop_web/mySite/getShopInfo?_=" + new Date().getTime(),//通过站点获取站点信息
    getSiteHandleInfo: "/shop_web/entrepProcess/isPublishByEntrepId",//获取主体处理信息
    getIsHasAuthority: '/authority-sitebackend/userPermission/checkPermission',//判断是否有处理权限
    getReadingQuantity: '/user/getPvByTemplateId',//获取转发模板的阅读量
    clearSiteBackendPermission: '/authority-sitebackend/userPermission/clearSiteBackendPermission',//清空商家总台的权限信息
    changeShopInfo: '/changeShopInfo',//改变站点信息
    getEntrepIsForbidden: '/shop_web/entrepProcess/isForbidLoginByEntrepId',//判断主体是否被冻结
    getCity: '/city/getAllData',//获取所有的城市
    getTown: '/city/getTownData',//获取每一个城市下的乡镇
    getEntrepInfo:'/shop_web/shopEntrep/queryById',//通过主体id获取主体信息

    getTemplateList: '/manage-api/template/queryTemplateByAnyConditionsToES',
    getTemplateBigCategory: '/manage-api/template/webCategory/queryCategoryDropList',//获取建站模板大类
    getTemplateSmallCategory: '/manage-api/template/webCategory/queryCategoryDropListExp',//根据大类id获取模板小类
    getSiteIdByShopId: '/manage-api/website/site/querySiteIdByShopId',//通过一部站点id获取二部站点id
    getIsHasTemplateOrder: '/manage-api/pay/zmOrderPayment/queryTemplateOrder',//判断该网站是否有该模板的订单
    getWebTemplate: '/manage-api/template/webTemplate/queryByPageExp',//首页获取模版
    getTemplateInfo: '/manage-api/template/webTemplate/templateDetail',//获取模板详情
    updateTemplateUseCount: '/manage-api/template/webTemplate/updateTemplateUseCount',//更新模板使用次数
    updateTemplatePreviewCount: '/manage-api/template/webTemplate/updateTemplatePreviewCount',//更新预览模板次数

    getProductList: '/product_gateway/productSearch/searchProductList',

    getServerList: '/service/webbuilder-api/search/searchService',

    getVideoList: '/video_web/search-api/videoList',
    getVideoCategory: '/video_web/search-api/categoryList',
    getSearchVideoList: '/video_web/search-api/searchVideo',//获取搜索的视频列表

    getAudioList: '/audio_web/search-api/searchAudio',
    getAudioCategory: '/audio_web/music/queryFirstCategory',

    getAlbumList: '/audio_web/search-api/searchAlbum',

    getCreatorList: '/audio_web/search-api/searchCreator',
    getNationalityList: '/dictionary/getDictionaryInfoByType?type=COUNTRY',//返回国籍列表
    getCreatorCategory: '/dictionary/getDictionaryInfoByType?type=WRITERTYPE',//返回创作人类型

    getBlogList: '/blog_api/blogInfoSearch/searchBlog',
    getBlogCategory: '/blog_web/shopBlog/queryBlogLabels',

    getNewsList: '/news_web/search-api/searchNews',
    getNewsCategory: '/news_web/news/queryFristCategory',

    getControlList: '/manage-api/pay/ZmControl/queryControlList',//获取控件及增值服务列表
    getControlInfo: '/manage-api/pay/ZmControl/queryControlByControlAndShopId',//查询单个控件信息

    getIPData: '/manage-api/pay/zmIp/ipInfo',//获取IP收费信息

    goToChat: '/im/createUserToZmService',//客服资询

    requestWebsitePay:'/manage-api/pay/zmOrderPayment/allOrderPayment',//请求关于网站的所有支付

    getOrderInfo:'/manage-api/pay/zmOrderPayment/queryOrderByfId',//获取订单信息

    getGroupPayInfo:'/manage-api/website/sitePage/queryUnpaidInfo',//获取发布网站时哪些项目要付费

    getIndexHelpList:'/help/queryHelpDtoByListLB',//获取首页的最新的热点问题及其类目
};
export default api;
