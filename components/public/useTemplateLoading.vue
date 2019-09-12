<template>
    <div class="loadingBox">
        <div v-if="!isHasError" class="loading">
            <img src="/images/other/loading30.gif" alt="">
            <div>正在初始化数据...</div>
        </div>
        <div v-else class="mask">
            <div>
                <div>友情提示</div>
                <div>
                    <p>网络连接不稳定，本次加载失败，请重新再试！</p>
                    <p>请确认使用Chrome谷歌或360浏览器登陆编辑器</p>
                </div>
                <div @click="useTemplate">重新加载</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isHasError: false,
            }
        },
        props: ['pageData'],
        mounted() {
            $.ajax({
                url:this.interfaceApi.getUserBasicInfo,
                data:{fShopId:this.$route.query.fShopId},
                async:false,
                success:(res)=>{
                    if(res.status === 0){
                        this.$store.commit("changeUserBasicInfo",res.data);
                        this.useTemplate();
                    }
                    if(res.status === 3){
                        window.location.href = "/";
                    }
                },
                error:(err)=>{
                    if(JSON.parse(err.responseText).status === -3){
                        window.location.href = '/denglu?url='+encodeURIComponent(window.location.href);
                    }
                }
            });
        },
        computed: {
            editorDomain(){
                return this.$store.state.domainObj.editorDomain
            }
        },
        methods: {
            useTemplate() {
                this.isHasError = false;
                let fShopId = parseInt(this.pageData.fShopId);
                let templateId = this.pageData.templateId;
                let userType = parseInt(this.pageData.userType);
                this.$axios.get("/manage-api/website/site/querySiteIdByShopId", {params: {fShopId}}).then((res) => {
                    if (res.status === 200) {
                        let data = res.data;
                        console.log(data);
                        if (data.status === 0) {
                            if (data.data) {//老站点
                                this.$axios.post("/manage-api/website/site/reselectTemplateToZmSite", `fShopId=${fShopId}`, {headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}}).then((res) => {
                                    if (res.status === 200) {
                                        let data = res.data;
                                        console.log(data);
                                        if (data.status === 0) {
                                            this.$axios.post('/manage-api/website/site/nofirstSwitchTemplateToZmSite', `fShopId=${fShopId}&userType=${userType}&templateId=${templateId}`, {headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}}).then((res) => {
                                                if (res.status === 200) {
                                                    let data = res.data;
                                                    console.log(data);
                                                    if (data.status === 0) {
                                                        $.ajax({
                                                            url: this.interfaceApi.updateTemplateUseCount,
                                                            data: {fTemplateId: templateId},
                                                            async: false,
                                                            success: (res) => {
                                                                console.log(res);
                                                            }
                                                        });
                                                        window.location.replace(this.editorDomain + '?type=website&fWebsiteId=' + data.data + '&fShopId=' + fShopId);
                                                    } else {
                                                        this.isHasError = true;
                                                    }
                                                } else {
                                                    this.isHasError = true;
                                                }
                                            }, (err) => {
                                                console.log(err);
                                                this.isHasError = true;
                                            })
                                        } else {
                                            this.isHasError = true;
                                        }
                                    } else {
                                        this.isHasError = true;
                                    }
                                }, (err) => {
                                    console.log(err);
                                    this.isHasError = true;
                                })
                            } else {//新站点
                                this.$axios.post('/manage-api/website/site/firstSelectToZmSite', `fShopId=${fShopId}&userType=${userType}`, {contentType: "application/x-www-form-urlencoded; charset=UTF-8"}).then((res) => {
                                    if (res.status === 200) {
                                        let data = res.data;
                                        console.log(data);
                                        if (data.status === 0) {
                                            let fSiteId = data.data;
                                            this.$axios.post('/manage-api/website/site/switchTemplateToZmSite', `fShopId=${fShopId}&fSiteId=${fSiteId}&fTemplateId=${templateId}`, {contentType: "application/x-www-form-urlencoded; charset=UTF-8"}).then((res) => {
                                                if (res.status === 200) {
                                                    let data = res.data;
                                                    console.log(data);
                                                    if (data.status === 0) {
                                                        $.ajax({
                                                            url: this.interfaceApi.updateTemplateUseCount,
                                                            data: {fTemplateId: templateId},
                                                            async: false,
                                                            success: (res) => {
                                                                console.log(res);
                                                            }
                                                        });
                                                        window.location.replace(this.editorDomain + '?type=website&fWebsiteId=' + fSiteId + '&fShopId=' + fShopId);
                                                    } else {
                                                        this.isHasError = true;
                                                    }
                                                } else {
                                                    this.isHasError = true;
                                                }
                                            }, (err) => {
                                                console.log(err);
                                                this.isHasError = true;
                                            })
                                        } else {
                                            this.isHasError = true;
                                        }
                                    } else {
                                        this.isHasError = true;
                                    }
                                }, (err) => {
                                    console.log(err);
                                    this.isHasError = true;
                                })
                            }
                        } else {
                            this.isHasError = true;
                        }
                    } else {
                        this.isHasError = true;
                    }
                }, (err) => {
                    console.log(err);
                    this.isHasError = true;
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .loadingBox {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #ffffff;
        z-index: 10;
        .loading {
            position: fixed;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0;
            left: 0;
            background: #ffffff;
            z-index: 10;
            img {
                margin-right: 10px;
            }
        }
        .mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            background: rgba(18, 47, 70, 0.5);
            & > div {
                width: 400px;
                height: 192px;
                background: #ffffff;
                position: relative;
                & > div:nth-child(1) {
                    margin-left: 40px;
                    margin-top: 30px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #122F46;
                }
                & > div:nth-child(2) {
                    margin-top: 20px;
                    margin-left: 40px;
                    & > p:nth-child(1) {
                        font-size: 14px;
                        color: #122F46;
                    }
                    & > p:nth-child(2) {
                        font-size: 12px;
                        color: rgba(18, 47, 70, 0.5);
                    }
                }
                & > div:nth-child(3) {
                    width: 160px;
                    height: 30px;
                    background: #2FB7EC;
                    color: #ffffff;
                    font-size: 12px;
                    font-weight: bold;
                    text-align: center;
                    line-height: 30px;
                    margin-top: 10px;
                    margin-left: 120px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
