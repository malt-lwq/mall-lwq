<template>
    <div class="profile">
      <nav-bar class="nav-bar">
        <div slot="center">个人界面</div>
      </nav-bar>
      <login></login>

    </div>
</template>
  
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Login from './childComps/Login'
  export default {
    name: "Profile",
    components: {
      NavBar,
      Login
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: #ff8198;
    color: #fff;
  }
</style>
