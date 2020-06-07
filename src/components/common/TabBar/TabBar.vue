<template>
    <div id="tabBar">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>

  #tabBar {
    width: 100%;
    height: 49px;
    background-color: #f6f6f6;
    box-shadow: 0 -3px 3px rgba(100, 100, 100,.02);
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
