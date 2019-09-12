<template>
    <svg  version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 200 200" style="enable-background:new 0 0 200 200;" :style="{width:styleObj.width,height:styleObj.height,fill:styleObj.fill}" xml:space="preserve">
<path style="display:none;" d="M99.9,0.2C45.5,0.2,1.3,43.6,0,97.7c1.2-47.2,37-85.1,81.2-85.1c44.8,0,81.2,39.1,81.2,87.4
	c0,10.3,8.4,18.7,18.7,18.7c10.3,0,18.7-8.4,18.7-18.7C199.8,44.9,155.1,0.2,99.9,0.2z M99.9,200c54.4,0,98.6-43.5,99.9-97.6
	c-1.1,47.2-37,85.1-81.1,85.1c-44.8,0-81.2-39.2-81.2-87.4c0-10.3-8.4-18.7-18.7-18.7C8.4,81.3,0,89.7,0,100.1
	C0,155.3,44.7,200,99.9,200z"/>
<path d="M100,0C45.6,0,1.3,41.9,0.1,96c1.2-47.2,37.1-83.4,81.2-83.4c44.9,0,81.2,39.2,81.2,87.5c0,10.4,8.4,18.7,18.7,18.7
	c10.3,0,18.7-8.4,18.7-18.7C200,44.8,155.2,0,100,0z"/>
<path d="M100,200c54.4,0,98.7-41.8,99.9-95.9c-1.9,47.3-37.1,83.4-81.2,83.4c-44.9,0-81.2-39.2-81.2-87.5c0-10.3-8.4-18.7-18.7-18.7
	C8.4,81.3,0,89.6,0,100C0,155.2,44.8,200,100,200z"/>
</svg>
</template>

<script>
    export default {
        name: "loading",
        props:['styleObj']
    }
</script>

<style scoped lang="less">
    svg{
        animation:rotateAni 1s infinite linear;
    }
    @keyframes rotateAni {
        0%{
            transform: rotate(0deg);
        }
        25%{
            transform: rotate(90deg);
        }
        50%{
            transform: rotate(180deg);
        }
        75%{
            transform: rotate(270deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>