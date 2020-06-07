<template>
  <div class="bottom-bar">
    <div class="bottom-bar-left">
      <div class="service">
        <img src="~assets/img/detail/service.svg" alt="">
        <div>客服</div>
      </div>
      <div class="shop">
        <img src="~assets/img/detail/shop.svg" alt="">
        <div>店铺</div>
      </div>
      <div class="select">
        <img src="~assets/img/detail/select.svg" alt="">
        <div>收藏</div>
      </div>
    </div>
    <div class="bottom-bar-right">
      <div class="cart" @click="addToCart" >加入购物车</div>
      <div class="buy" @click="toBuy" >立即购买</div>
    </div>
    
  </div>
</template>

<script>
export default {
  methods: {
    addToCart() {
        this.$emit('addCart')        
    },
    toBuy() {
      this.$emit('toBuy')
    }
  }
 
}
</script>

<style scoped>
  .bottom-bar {
    
    border-top: 1px solid rgba(0,0,0,.1);
    background-color: #fff;
    position: fixed;
    height: 54px;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    
   
  }
  .bottom-bar-left,.bottom-bar-right {
    /* position: relative;
    z-index: 1000;
    bottom: 49px;
    height: 49px; */
    
    display: flex;
    width: 50%;
    /* justify-content: space-between; */
  }
  .bottom-bar-left img{
    width: 23px;
    height: 23px;
    margin-top: 8px ;
    margin-left: 3px;
    
  
  }
  .bottom-bar-left >div {
    flex: 1;

  }
  .service {
    margin-left: 17px;
  }
  .bottom-bar-right >div {
    flex: 1;
  }
  .cart,.buy {
    font-size: 16px;
    line-height: 54px;
    height: 54px;
    text-align: center;
    border-radius: 3px;
  }
  .cart {
    background-color:pink;
    color: #999;
  }
  .buy {
    
    background-color: palevioletred;
    color: #fff;
  }
</style>