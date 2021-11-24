<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
import MainTabBar from "./components/content/mainTabbar/MainTabbar.vue";
export default {
  name: "app",
  components: { MainTabBar },
};
</script>
<style lang="less">
@import "assets/css/basc.css";
</style>
