<template>
    <div class="toTop" id="toTopShow" @click.stop.prevent="smoothscroll()">
        <svg t="1555030819949" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1993" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26">
            <path class='top' d="M557.654996 981.669904c-6.499999 59.041994-88.986991 53.776995-92.179991 0-0.083-40.896996-0.083-641.390937-0.083-641.390937l-283.839972 273.963973c-44.472996 38.308996-97.43499-22.922998-64.344994-63.215994 125.709988-121.895988 351.289966-340.004967 356.507965-345.049966 20.810998-22.608998 53.572995-23.779998 75.721993 0 41.406996 40.037996 348.700966 336.328967 358.028965 346.989966 31.166997 38.741996-19.223998 96.073991-62.242994 63.773994C834.109969 607.310941 557.739996 340.267967 557.739996 340.267967M116.396039 3.332l786.487923 0 0 89.285991L116.396039 92.617991 116.396039 3.332z"></path>
        </svg>
        <p>置顶</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
          temporaryval:0,
        }
    },
    methods:{
        smoothscroll(){
            $("body,html").animate({
                scrollTop:0
            },700,'linear')
        }
    }
}
</script>
<style lang="less" scoped>
.toTop{
    display:block;
    opacity:1;
    transition:0.5s;
    position:fixed;
    bottom:90px;
    right:30px;
    width:60px;
    height:60px;
    background-color:rgba(255,255,255,1);
    border-radius:10px;
    box-shadow:0px 0px 5px rgba(0,0,0,0.098);
    font-size:14px;
    color: rgb(18, 47, 70);
    text-align:center;
    padding-top:6px;
    z-index:50;
    cursor:pointer;
    .top{
        fill:#1E8CCB;
    }
}
</style>
