<template>
  <div id="app">
    <!-- Detail中每次都需要获取新的iid-重新创建组件，所以不应该保持状态 -->
    <!-- 注意：使用include/exclude属性，需要给vue类的name赋值，否则不生效 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabBar/MainTabBar";

  export default {
    name: 'App',
    data() {
      return {
      }
    },
    components: {
      MainTabBar
    }
  }
</script>

<style>
 @import 'assets/css/base.css';
</style>
