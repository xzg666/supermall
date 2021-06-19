<template>
  <div>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import mainTabBar from 'content/mainTab/mainTabBar'
  export default {
    components:{
      mainTabBar
    }
  }
</script>

<style  scoped>
@import "assets/css/base.css";

</style>