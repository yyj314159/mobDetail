import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import api from '~/common/interfaceApi';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        windowWidth: 0,//窗口宽度
        windowHeight: 0,//窗口高度
        isLogin: false,//当前是否处于登录状态
        clickEvent: null,//点击事件对象
        domainObj: {
            editorDomain: null,
            wwwDomain: null,
            jzDomain:null,
            wwwDomain_phone:null
        },//存放不同的二级域名
        isPC: true,//判断当前访问页面的设备是不是PC端
        templateInfo: null,//网站模板信息
        scrollTop:null,//滚动条滚动的距离
        userBasicInfo:null,//用户基本信息
        popupConfig:{
            isShow:false,
            module:null,
            type:null
        },//选择网站或主体的弹窗配置项 type website:选择网站；entrep:选择主体
        isErrorPage:false,//标志当前页面是不是错误页
        useTemplateTipConfig:{
            isShow:false,
            type:null,
            props:null //存一些弹窗需要的数据
        },//使用模板时候的提示配置项 type 1：收费模板且网站没有历史编辑数据； 2：免费模板且网站没有历史编辑数据；3：收费模板且网站有历史编辑数据；4：免费模板且网站有历史编辑数据
        entrepInfo:null,//存放访问主体页面时当前的主体信息
    },
    mutations: {
        //改变窗口宽度值
        changeWindowWidth(state, value) {
            state.windowWidth = value;
        },
        //改变窗口高度值
        changeWindowHeight(state, value) {
            state.windowHeight = value;
        },
        //改变登录状态
        changeLoginStatus(state, value) {
            state.isLogin = value;
        },
        //改变点击事件对象
        changeClickEvent(state, value) {
            state.clickEvent = value;
        },
        //请求当前是否处于登录状态
        requestLoginInfo(state, callBackObj) {
            axios.get(api.getLoginStatus).then((res) => {
                if (res.status === 200) {
                    let data = res.data;
                    if (data.status === 0) {
                        if (data.data === 0) {
                            this.commit("changeLoginStatus", false);
                            callBackObj.noLoginCallBack();
                        } else {
                            this.commit("changeLoginStatus", true);
                            callBackObj.loginCallBack();
                        }
                    }
                }
            }, (err) => {
                console.log(err);
            })
        },
        //改变不同二级域名的值
        changeDomain(state, obj) {
            state.domainObj = obj;
        },
        //改变当前访问页面的设备是否是PC的状态
        changeIsPC(state, val) {
            state.isPC = val;
        },
        //改变当前选择的网站模板的信息
        changeTemplateInfo(state, val) {
            state.templateInfo = val;
        },
        //改变滚动条滚动的距离
        changeScrollTop(state,val){
            state.scrollTop = val;
        },
        //改变当前登录用户的基本信息
        changeUserBasicInfo(state,val){
            state.userBasicInfo = val;
        },
        //改变弹窗配置项
        changePopupConfig(state,val){
            state.popupConfig = val;
        },
        //改变当前页面是否是错误页面的状态
        changeErrorPageStatus(state,val){
            state.isErrorPage = val;
        },
        //改变使用模板提示弹窗配置项
        changeTipConfig(state,val){
            state.useTemplateTipConfig = val;
        },
        //改变访问某个主体页面时当前主体的信息
        changeEntrepInfo(state,val){
            state.entrepInfo = val;
        }
    },
    getters: {},
    actions: {}
});
export default store;
