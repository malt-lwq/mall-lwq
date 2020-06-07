<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList" 
                      :key="index" 
                      :product="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from './CartListItem'

  import Scroll from 'components/common/scroll/Scroll'
export default {
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    cartList() {
      return this.$store.state.cartList
    }
  }

}
</script>

<style scoped>
  .cart-list {
    height: 100%
  }
  .content {
    
    height: calc(100vh - 44px - 49px - 38px);
    overflow: hidden;

  }
</style>