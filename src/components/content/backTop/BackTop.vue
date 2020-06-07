<template>
  <div class="back">
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods: {
    }
  }
</script>

<style scoped>
  .back {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back img {
    width: 43px;
    height: 43px;
  }
</style>
