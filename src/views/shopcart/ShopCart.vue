<template>
    <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar/>
    </div>
</template>

<script>
  import NavBar from  'components/common/navbar/NavBar'
  import cartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  export default {
    name: "ShopCart",
    components: {
      NavBar,
      cartList,
      CartBottomBar
    },
    computed: {
      // 可使用mapgetter辅助函数-将store中的getter映射到局部计算属性
      cartLength() {
        return this.$store.state.cartList.length
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    height: 44px;
  }
</style>
