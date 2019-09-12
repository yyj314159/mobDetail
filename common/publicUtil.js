let publicUtil = {
    getCookie(key){
        let str=document.cookie.replace(/;\s*/,';');
        let cookieArr=str.split(';');
        let cookieObj={};
        let len=cookieArr.length;
        for(let i=0; i<len; i++){
            let item=cookieArr[i];
            let k=item.split('=')[0].replace(/(^\s*)|(\s*$)/g,"");
            let v=item.split('=')[1];
            cookieObj[k]=v;
        }
        if(cookieObj[key]){
            return decodeURIComponent(cookieObj[key]);
        }else{
            return "";
        }
    },
    setCookie(key, value, t){
        let oDate=new Date();
        oDate.setDate(oDate.getDate()+t);
        document.cookie=key+"="+encodeURIComponent(value)+";expires="+oDate.toUTCString()+";domain="+this.getCookieDomain()+";path=/";
        if(this.getCookie(key)){
            console.log('设置成功');
        }else{
            console.log('设置失败');
        }
    },
    removeCookie(key){
        document.cookie=key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        if(!this.getCookie(key)){
            console.log('删除成功');
        }else{
            console.log('删除失败');
        }

    },
    getCookieDomain(){
        let host = location.hostname;
        let ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (ip.test(host) === true || host === 'localhost') return host;
        let regex = /([^]*).*/;
        let match = host.match(regex);
        if (typeof match !== "undefined" && null !== match) host = match[1];
        if (typeof host !== "undefined" && null !== host) {
            let strAry = host.split(".");
            if (strAry.length > 1) {
                host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
            }
        }
        return '.' + host;
    },
    //maxWidth:设置图片的width（具体像素值），maxHeight:设置图片的height(具体像素值) 自适应截取
    handleImg(e,maxWidth,maxHeight){
        let image = new Image();
        // 获取允许的最大宽度和最大高度
        let iWidth = maxWidth;
        let iHeight = maxHeight;
        image.src = e.target.src;
        if (image.width > 0 && image.height > 0) {
            if(image.width / image.height == iWidth / iHeight){
                // 方图
                e.target.width = iWidth;
                e.target.height = iHeight;
                $(e.target).css("marginTop",0);
                $(e.target).css("marginLeft",0);
            }else{
                if(image.width / image.height > iWidth / iHeight){
                    // 横图
                    e.target.width = (image.width * iHeight) / image.height;
                    e.target.height = iHeight;
                    $(e.target).css("marginTop",0);
                    $(e.target).css("marginLeft","-"+Math.ceil(e.target.width-maxWidth)/2+"px");
                }else{
                    // 竖图
                    e.target.width = iWidth;
                    e.target.height = (image.height * iWidth) / image.width;
                    $(e.target).css("marginTop","-"+Math.ceil(e.target.height-maxHeight)/2+"px");
                    $(e.target).css("marginLeft",0);
                }
            }
        }
    },
    //maxWidth:设置图片的width（具体像素值），maxHeight:设置图片的height(具体像素值) 自适应填充
    handleImg1(e,maxWidth,maxHeight){
        let image = new Image();
        // 获取允许的最大宽度和最大高度
        let iWidth = maxWidth;
        let iHeight = maxHeight;
        image.src = e.target.src;
        if (image.width > 0 && image.height > 0) {
            if (image.width / image.height >= iWidth / iHeight) {
                // 横图
                if (image.width > iWidth) {
                    // 大图，进行缩放
                    e.target.width = iWidth;
                    e.target.height = (image.height * iHeight) / image.width;
                } else {
                    // 小图，原始比例
                    e.target.width = image.width;
                    e.target.height = image.height;
                }
            } else {
                // 竖图
                if (image.height > iHeight) {
                    // 大图
                    e.target.width = (image.width * iHeight) / image.height;
                    e.target.height = iHeight;
                } else {
                    e.target.width = image.width;
                    e.target.height = image.height;
                }
            }
        }
    }
};
export default publicUtil