<template>
  <div>
    <error404 v-if="error.statusCode === 404"></error404>
    <error500 v-else></error500>
  </div>
</template>

<script>
  import error404 from '~/components/errorPage/error404';
  import error500 from '~/components/errorPage/error500';
    export default {
      props:['error'],
      components:{
        error404,
        error500,
      },
      data(){
        return {

        }
      },
      created(){
        this.$store.commit("changeErrorPageStatus",true);
      },
      mounted(){

      }
    }
</script>

<style scoped>

</style>
