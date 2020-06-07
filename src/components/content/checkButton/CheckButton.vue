<template>
  <div class="check-button" :class="{check:isChecked}"> 
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default:false,
    }
  }
}
</script>

<style scoped>
  .check-button img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border:1px solid rgba(100,100,100,.2);
  }
  .check img{
    background-color:var(--color-tint);
  }
</style>