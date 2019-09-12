<template>
    <div
            class="zm-demo-video zm-demo-video2"
            :style="{width:videotempdata.width+'px',height:videotempdata.height+'px',cursor:moveing?'':'none'}"
            @mousemove="tempmousemove($event,videotempdata.index)"
    >
        <video class="demoVideo" :class="'a'+videotempdata.index" :poster="videotempdata.imgurl"
               style="width= 100%; height=100%; object-fit: fill"
               @pause="isPause()" @play="isPlay()" @timeupdate="timeUpDate($event)">
            <source :src="videotempdata.videourl" type="video/mp4"/>
        </video>
        <div class="playBtn" @click.stop.prevent="pauseClick(videotempdata.index)" v-show="moveing">
            <i class="iconfont" :class="{'icon-pause':isPaused,'icon-pause1':!isPaused}"></i>
        </div>
        <!-- 视频控件  -->
        <div class="video-control" v-show="moveing">
            <!-- <div class="controls" :style="{width:curWidth+'px'}"> -->
            <div class="controls">
                <!-- 播放 -->
                <span class="btn-play iconfont" :class="{'play icon-play':isPaused, 'pause icon-plays':!isPaused}"
                      @click.stop.prevent="pauseClick(videotempdata.index)"></span>
                <div class="progress1">
                    <!-- <div class="clickProgress" :style="{width:curBgcWidth + 'px'}" @mousedown.prevent="jumpProgress($event)"></div> -->
                    <div class="clickProgress" @mousedown.prevent="jumpProgress($event,videotempdata.index)"></div>
                    <i :style="{left:currentTimeProgress}" class="progressBall"
                       @mousedown.stop.prevent="ballDown($event,videotempdata.index)"></i>
                    <span :style="{width:currentTimeProgress}" class="bgcProgress"></span>
                    <span class="bgcProgress2" :style="{width:videotempdata.width-161+'px'}"></span>
                </div>
                <!-- 音量 -->
                <div class="volume">
                    <i class=" iconfont icon-volume"></i>
                    <div class="bgvolumeBox">
                        <span class="bgvolume"></span>
                        <i :style="{bottom:currentvolumeY+'px'}" class="volumeBall"
                           @mousedown.stop.prevent="changeVolume($event,videotempdata.index)"></i>
                        <span class="volume2" :style="{'height':currentvolumeY+'px'}"></span>
                    </div>
                </div>
                <!-- 全屏 -->
                <span class="btn-full iconfont icon-fullscreen btn_full"
                      @click.stop.prevent="videoFullScreen($event,videotempdata.index)"></span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "videotemp",
        props: ['videotempdata'],
        data() {
            return {
                isPaused: true, // 视频播放是否暂停
                videotempindex: NaN,
                isControls: true,
                times: null,
                isTrans: true,
                currentTimeProgress: 0,
                currentvolume: {state: false, y: ''},
                currentvolumeY: 104,
                lengthTime: "0:30",
                currentTime: 0,
                curBgcWidth: 0,
                curHeight: 540,
                isFullScreen: false,
                curWidth: "",
                curWidthCopy: "",
                ctrWidth: "",
                moveing: true,
            };
        },
        methods: {
            // 视频暂停事件
            isPause(index) {
                this.isPaused = true;
            },
            // 视频播放事件
            isPlay(index) {
                this.isPaused = false;
            },
            // 播放按钮点击事件
            pauseClick(index) {
                var video = document.getElementsByTagName("video");
                for (var i = 0; i < video.length; i++) {
                    if (i == index) {
                        this.isPaused = !this.isPaused;
                        if (video[index].paused) {
                            video[index].play();
                            this.isPaused = false;
                        } else {
                            video[index].pause();
                            this.isPaused = true;
                        }
                    } else {
                        video[i].pause();
                    }
                }

            },

            // 播放按钮点击事件
            jumpProgress(e, index) {
                let clickProgressDiv = e.target,
                    video = document.getElementsByClassName("demoVideo")[index];
                let lengthTime = video.duration,
                    nowTime = "";
                let scale = (e.offsetX / clickProgressDiv.offsetWidth).toFixed(3) * 100;
                scale = scale > 100 ? 100 : scale;
                nowTime = lengthTime * scale / 100;
                nowTime = nowTime > lengthTime ? lengthTime : nowTime;
                video.currentTime = nowTime;
                this.currentTimeProgress = scale + "%";
            },
            changeVolume(e, index) {
                let video = document.getElementsByClassName("demoVideo")[index];
                this.currentvolume.y = e.clientY;
                this.currentvolume.state = true;
                let _this = this;
                let height = _this.currentvolumeY;
                document.onmousemove = function (e) {
                    if (_this.currentvolume.state) {
                        let bottom = height - (e.clientY - _this.currentvolume.y);
                        _this.currentvolumeY = bottom;
                        if (_this.currentvolumeY <= 5) {
                            _this.currentvolumeY = 5;
                            video.volume = 0;
                            return;
                        }
                        if (_this.currentvolumeY >= 104) {
                            _this.currentvolumeY = 104;
                            video.volume = 1;
                            return;
                        }
                        video.volume = bottom / 100;
                    }
                };

                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    _this.currentvolume.state = false;
                    _this.currentvolume.y = e.clientY;
                };

            },
            ballDown(e, index) {
                stopDefault(e);
                let video = document.getElementsByClassName("demoVideo")[index];
                let ball = e.target,
                    father = ball.parentNode;
                let width = father.getElementsByClassName("bgcProgress2")[0].offsetWidth;
                let bgcDiv = father.getElementsByClassName("bgcProgress")[0];
                let moveX,
                    nowX,
                    scale,
                    lengthTime = video.duration;
                let fatherLeft = offsetLeft(
                    father.getElementsByClassName("bgcProgress2")[0]
                );
                document.onmousemove = function (e) {
                    stopDefault(e);
                    e = e || event;
                    moveX = e.clientX;
                    let left = moveX - fatherLeft;
                    scale = (left / width).toFixed(4);
                    scale = scale > 1 ? 1 : scale;
                    scale = scale < 0 ? 0 : scale;
                    this.currentTimeProgress = scale * 100 + "%";
                    ball.style.left = scale * 100 + "%";
                    bgcDiv.style.width = scale * 100 + "%";
                    video.currentTime = lengthTime * scale;
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };

                function offsetLeft(element) {
                    var left = element.offsetLeft;
                    var parent = element.offsetParent;
                    while (parent !== null) {
                        left += parent.offsetLeft;
                        parent = parent.offsetParent;
                    }
                    return left;
                }

                function stopDefault(e) {
                    if (e && e.preventDefault) {
                        e.preventDefault();
                    } else {
                        window.event.returnValue = false;
                    }
                    return false;
                }
            },
            timeUpDate(e) {
                //视频播放持续中事件
                let currentTime = e.target.currentTime; //已播放时间
                let duration = e.target.duration; //视频时间总长
                this.currentTime = this.time(currentTime);
                this.lengthTime = this.time(duration);
                let scale = (currentTime / duration).toFixed(3) * 100;
                this.currentTimeProgress = scale + "%";
            },
            videoFullScreen(event, index) {
                // 是否全屏flag切换
                this.isFullScreen = !this.isFullScreen;
                this.videotempindex = index;
                const videoBox = document.getElementsByClassName("zm-demo-video")[index];
                const btnFull = document.getElementsByClassName("btn-full")[index];

                if (!!window.ActiveXObject || "ActiveXObject" in window) {

                    var reg = /10\.0/;
                    var str = navigator.userAgent;
                    if (reg.test(str)) {
                        document.getElementsByClassName("btn_full")[index].onclick = function (e) {
                            e.preventDefault();
                        }
                    } else {

                        console.log('ie浏览器', document.body.clientWidth, videoBox.style.width)
                        if (videoBox.style.width == '100vw') {
                            videoBox.style.width = this.videotempdata.width + 'px';
                            videoBox.style.height = this.videotempdata.height + 'px';
                            videoBox.style.position = 'relative';
                            document.body.height = 'auto';
                            console.log("视频还原");


                        } else {
                            btnFull.classList.add("icon-zm-small");
                            document.getElementsByClassName("demoVideo")[index].msRequestFullscreen();

                        }

                    }
                }
                if (navigator.userAgent.indexOf("Firefox") != -1) {
                    if (videoBox.style.width == '100vw') {
                        videoBox.style.width = this.videotempdata.width + 'px';
                        videoBox.style.height = this.videotempdata.height + 'px';
                        videoBox.style.position = 'relative';
                        document.body.height = 'auto';
                        btnFull.classList.add("icon-fullscreen");
                        btnFull.classList.remove("icon-zm-small");
                    } else {
                        videoBox.style.width = '100vw';
                        videoBox.style.height = '100vh';
                        videoBox.style.position = 'fixed';
                        document.body.height = '100vh';
                        btnFull.classList.add("icon-zm-small");
                        btnFull.classList.remove("icon-fullscreen");
                    }
                    console.log('火狐浏览器')
                }
                if (navigator.userAgent.indexOf("Chrome") != -1) {
                    if (videoBox.style.width == '100vw') {
                        videoBox.style.width = this.videotempdata.width + 'px';
                        videoBox.style.height = this.videotempdata.height + 'px';
                        videoBox.style.position = 'relative';
                        document.body.height = 'auto';
                        btnFull.classList.add("icon-fullscreen");
                        btnFull.classList.remove("icon-zm-small");
                        console.log('谷歌浏览器111')
                    } else {
                        document.body.height = '100vh';
                        btnFull.classList.add("icon-zm-small");
                        btnFull.classList.remove("icon-fullscreen");
                        console.log('谷歌浏览器222')
                    }
                }

                let self = this;
                let box = document.getElementsByClassName("controls")[index];
                let wrap = document.getElementsByClassName('zm-demo-video')[index];
                let bgcWidth = document.getElementsByClassName("progress1")[index].offsetWidth + 10;
                const video = document.getElementsByClassName("demoVideo")[index];
                const doc = document;

                if (self.isFullScreen) {
                    btnFull.classList.add("icon-zm-small");
                    btnFull.classList.remove("icon-fullscreen");
                    let vsmall = false;
                    window.onresize = function () {
                        vsmall = !vsmall;
                        if (vsmall == false && self.isFullScreen) {
                            document.getElementsByClassName("btn_full")[index].click();
                        }
                    };
                    if (video.webkitRequestFullScreen) {
                        // Safari5. and Chrome 15
                        wrap.webkitRequestFullScreen();
                        this.curWidth = window.screen.width;
                        document.getElementsByClassName("progress1")[index].style.width = window.screen.width - 171 + "px";
                        this.curBgcWidth = window.screen.width - 161;
                        box.style.left = 0;
                        box.style.zIndex = "9999999991";
                        wrap.style.height = window.screen.availHeight + 'px';
                        wrap.style.width = window.screen.width + 'px';
                    } else if (video.mozRequestFullScreen) {
                        // Firefox 10+
                        video.mozRequestFullScreen();
                        this.curWidth = window.screen.width;
                        this.curBgcWidth = window.screen.width - 161;
                        document.getElementsByClassName("progress1")[index].style.width =
                            window.screen.width - 171 + "px";
                        box.style.left = 0;
                        box.style.zIndex = "9999999991";
                    } else if (video.requestFullscreen) {
                        // W3C标准
                        video.requestFullscreen();
                        this.curWidth = window.screen.width;
                        box.style.left = 0;
                        box.style.zIndex = "9999999991";
                        this.curBgcWidth = window.screen.width - 161;
                        document.getElementsByClassName("progress1")[index].style.width =
                            window.screen.width - 171 + "px";
                    }

                } else {
                    btnFull.classList.remove("icon-zm-small");
                    btnFull.classList.add("icon-fullscreen");
                    wrap.classList.remove('zm-demo-video2');
                    wrap.style.height = this.curHeight + 'px';
                    if (doc.webkitCancelFullScreen) {
                        // Safari5. and Chrome 15
                        doc.webkitCancelFullScreen();
                        videoBox.style.width = this.videotempdata.width + 'px';
                        this.curWidth = this.curWidthCopy;
                        document.getElementsByClassName("progress1")[index].style.width = this.ctrWidth - 171 + "px";
                        this.curBgcWidth = this.ctrWidth - 161;
                        box.style.zIndex = "0";
                        console.log('chrome');
                    } else if (doc.mozCancelFullScreen) {
                        // Firefox 10+
                        doc.mozCancelFullScreen();
                        this.curWidth = this.curWidthCopy;
                        document.getElementsByClassName("progress1")[index].style.width =
                            this.ctrWidth - 171 + "px";
                        this.curBgcWidth = this.ctrWidth - 161;
                        box.style.zIndex = "0";
                    } else if (doc.exitFullscreen) {
                        // W3C标准
                        //doc.exitFullscreen();
                        this.curWidth = this.curWidthCopy;
                        document.getElementsByClassName("progress1")[index].style.width =
                            this.ctrWidth - 171 + "px";
                        this.curBgcWidth = this.ctrWidth - 161;
                        box.style.zIndex = "0";
                        console.log('w3c标准')
                    }
                }
            },
            time(n) {
                var time = n - 0;
                var str;
                if (time - 0 < 60) {
                    if (Math.floor(time) < 10) {
                        str = 0 + ":" + "0" + Math.floor(time);
                    } else {
                        str = 0 + ":" + Math.floor(time);
                    }
                } else if (time - 0 < 3600) {
                    var M = Math.floor((time - 0) / 60);
                    var s = Math.round(time - M * 60);
                    str = M + ":" + s;
                } else {
                    var num = time - 0;
                    var H = num / 3600;
                    H = Math.floor(H);
                    var M = Math.floor(num / 60);
                    M = M - H * 60;
                    var s = num - H * 3600 - M * 60;
                    s = s.toFixed(0);
                    str = H + ":" + M + ":" + s;
                }
                return str;
            },
            tempmousemove(e, index) {
                if (this.isFullScreen) {
                    let that = this;
                    var
                        div = document.getElementsByClassName("controls")[index],
                        event = e || window.event,
                        x = event.clientX,
                        y = event.clientY,
                        divX1 = div.offsetLeft,
                        divY1 = div.offsetTop,
                        divX2 = div.offsetLeft + div.offsetWidth,
                        divY2 = div.offsetTop + div.offsetHeight;
                    if (x < divX1 || x > divX2 || y < divY1 || y > divY2) {
                        //如果鼠标不在控制条上，则执行。。
                        that.moveing = true;
                        clearTimeout(window.timer); // 移动时
                        window.timer = setTimeout(function () {
                            that.moveing = false; // 静止后
                        }, 1500);
                    } else {
                        clearTimeout(window.timer);
                        that.moveing = true; // 静止
                    }
                } else {
                    this.moveing = true;
                }
            },
        },
        mounted() {
            this.curHeight = document.getElementsByClassName('zm-demo-video')[0].offsetHeight;
            this.ctrWidth = document.getElementsByClassName("controls")[0].offsetWidth;
            this.curWidth = this.ctrWidth;
            this.curWidthCopy = this.ctrWidth;
            this.curBgcWidth = this.ctrWidth - 161;
            this.currentTime = this.time(0);
            this.lengthTime = "0:30";
            if (window.ActiveXObject) {
                var reg = /10\.0/;
                var str = navigator.userAgent;
                if (reg.test(str)) {
                    document.getElementsByClassName("progress1")[0].style.width = 'calc(100% - 160px)';
                }
            }
        },


        beforeDestroy() {
            clearInterval(this.times);
        }
    };
</script>

<style lang="less" scoped>
    @import '../../assets/font/iconfont/iconfont.css';

    .zm-demo-video {
        margin: 0 auto;
        position: relative;
        background: #000;
        border: 1px solid #ccc;
        &:hover {
            .playBtn, .controls {
                opacity: 1
            }
        }
        video {
            width: 100%;
            height: 100%;
        }
        .playBtn {
            cursor: pointer;
            opacity: 0;
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, .4);
            border-radius: 50%;
            border: 1px solid #756c6c;
            i {
                font-size: 38px;
                color: #fff;
            }
        }
        .controls {
            opacity: 0;
            width: 100%;
            height: 49px;
            line-height: 30px;
            position: absolute;
            bottom: 0;
            display: flex;
            align-items: center;
            color: #797979;
            background: rgba(0, 0, 0, 0.22);
            .iconfont {
                cursor: pointer;
            }
            .btn-play {
                width: 31px;
                height: 30px;
                padding-left: 20px;
                font-size: 23px;
                color: #f2f2f2;
                &:hover {
                    color: #fff;
                }
            }
            .time {
                width: 80px;
                margin: 0px 5px;

            }
            .progress1 {
                // width: 80%;
                width: calc(100% - 130px);
                height: 6px;
                background-color: #bbb;
                position: relative;
                margin: 13px 20px 13px 18px;
                i {
                    width: 19px;
                    height: 19px;
                    border-radius: 50%;
                    border: 5px solid #fff;
                    background: #4285f4;
                    position: absolute;
                    left: 0;
                    top: -7px;
                    &:hover {
                        border: none;
                        width: 19px;
                        height: 19px;
                        border-radius: 50%;
                        background: #fff url(/images/onlineTeaching/u544.png) center/ 140% no-repeat;
                    }
                }
            }
            .volume {
                width: 30px;
                height: 30px;
                position: relative;
                margin-right: 15px;
                &:hover {
                    .bgvolumeBox {
                        display: block;
                    }
                    .icon-volume {
                        color: #fff;
                    }
                }
                .icon-volume {
                    font-size: 30px;
                }
                .bgvolumeBox {
                    width: 26px;
                    height: 114px;
                    margin-top: 3px;
                    padding: 0 10px 10px;
                    position: absolute;
                    bottom: 25px;
                    left: -2px;
                    display: none;
                    .bgvolume {
                        background: #797979;
                        width: 6px;
                        height: 100%;
                        display: block;
                        border-radius: 10px;
                    }
                    .volumeBall {
                        position: absolute;
                        bottom: 3%;
                        width: 19px;
                        height: 19px;
                        border-radius: 50%;
                        border: 5px solid #fff;
                        background: #4285f4;
                        position: absolute;
                        left: 4px;
                        cursor: pointer;
                        z-index: 5;
                        &:hover {
                            border: none;
                            width: 19px;
                            height: 19px;
                            border-radius: 50%;
                            background: #fff url(/images/onlineTeaching/u544.png) center/ 140% no-repeat;
                        }
                    }
                    .volume2 {
                        background: #3d9be9;
                        width: 6px;
                        height: calc(100% - 10px);
                        display: none;
                        display: block;
                        border-radius: 10px;
                        bottom: 10px;
                        position: absolute;
                    }
                }

            }
            .btn-full {
                width: 28px;
                height: 28px;
                font-size: 25px;
                margin: 1px 20px 1px 1px;
                &:hover {
                    color: #fff;
                }
            }
        }
        video::-webkit-media-controls-enclosure {
            display: none !important;
        }

        .clickProgress {
            width: 100%;
            height: 20px;
            background-color: transparent;
            position: absolute;
            top: -8px;
            left: 0;
            z-index: 2;
            cursor: pointer;
        }

        .bgcProgress {
            display: block;
            position: absolute;
            height: 6px;
            background-color: #3d9be9;
            z-index: 1;
        }

        .bgcProgress2 {
            display: block;
            position: absolute;
            height: 6px;
            background-color: #ddd;
        }

        .progressBall {
            cursor: pointer;
            z-index: 5;
        }
    }

    .zm-demo-video2 video {
        width: 100%;
        height: 100%;
    }

</style>

