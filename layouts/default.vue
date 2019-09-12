<template>
  <nuxt></nuxt>
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    created(){
        this.$axios.get('/shop_web/shopInfo/getCurrentDomain').then((res)=>{
            if(res.status === 200){
                let data = res.data;
                if(data.status === 0){
                    if(data.data.rootPath.indexOf(".dev-") !== -1){
                        let obj = {};
                        obj.editorDomain = "http://editor.dev-zuma.com";
                        obj.wwwDomain = "http://www.dev-zuma.com";
                        obj.jzDomain = "http://jz.dev-zuma.com";
                        obj.wwwDomain_phone = "http://m.dev-zuma.com";
                        this.$store.commit("changeDomain",obj);
                    }else if(data.data.rootPath.indexOf(".pre-") !== -1){
                        let obj = {};
                        obj.editorDomain = "https://editor.pre-zuma.com";
                        obj.wwwDomain = "https://www.pre-zuma.com";
                        obj.jzDomain = "https://jz.pre-zuma.com";
                        obj.wwwDomain_phone = "https://m.pre-zuma.com";
                        this.$store.commit("changeDomain",obj);
                    }else{
                        let obj = {};
                        obj.editorDomain = "https://editor.zuma.com";
                        obj.wwwDomain = "https://www.zuma.com";
                        obj.jzDomain = "https://jz.zuma.com";
                        obj.wwwDomain_phone = "https://m.zuma.com";
                        this.$store.commit("changeDomain",obj);
                    }
                }
            }
        },(err)=>{
            console.log(err);
        })
    },
    mounted(){
      let windowWidth = document.querySelector("body").clientWidth;
      let windowHeight = window.innerHeight;
      this.$store.commit("changeWindowWidth",windowWidth);
      this.$store.commit("changeWindowHeight",windowHeight);
      if(/(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent)){
        this.$store.commit("changeIsPC",false);
      }else{
        this.$store.commit("changeIsPC",true);
      }
      window.addEventListener("click",(e)=>{
        let event = e || window.event;
        this.$store.commit("changeClickEvent",event);
      },false);
      window.addEventListener("touchstart",(e)=>{
        let event = e || window.event;
        this.$store.commit("changeClickEvent",event);
      },false);
        let el = document.getElementsByTagName('html')[0];
        el.scrollTop += 1;
        if (el.scrollTop === 0) {
            el = document.getElementsByTagName('body')[0];
        }
        el.scrollTop = 0;
      window.addEventListener("scroll", ()=>{
        let el = document.getElementsByTagName('html')[0];
        if (el.scrollTop === 0) {
            el = document.getElementsByTagName('body')[0];
        }
        this.$store.commit("changeScrollTop",el.scrollTop);
      },false);
        sessionStorage.setItem("prevUrl","");
      if(!this.$store.state.isErrorPage){
          sessionStorage.setItem("prevUrl",window.location.href);
      }
    },
  }
</script>


