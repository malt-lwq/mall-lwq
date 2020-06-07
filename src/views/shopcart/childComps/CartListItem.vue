<template>
  <div class="cart-item">
    <div class="item-check">
      <check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="">
    </div>
    <div class="item-info">
      <div class="title">{{product.title}}</div>
      <div class="desc">{{product.desc}}</div>
      <div class="item-bottom">
        <div class="price">￥{{product.price}}</div>
        <div class="count">x{{product.count}}</div>
      </div>

    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  components: {
    CheckButton
  },
  props: {
    product: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked
    }
  }
}
</script>

<style scoped>
  .cart-item {
    display: flex;
    width: 100%;
    padding: 3px;
    border-bottom: 2px solid rgba(100,100,100,.2);
  }
  .item-check {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .item-img img{
    display: block;

    width: 70px;
    height: 90px;
    margin:2px 4px;

    border-radius: 5px;
    
  }
  .item-info {
    position: relative;
    font-size: 15px;
    color: #777;
    padding: 2px 4px;
    overflow: hidden;
  }
  .title,.desc {
    margin-bottom: 10px;

    white-space: nowrap;    /* 强制不换行 */
    overflow: hidden;       /* 超出隐藏 */
    text-overflow: ellipsis;/* 溢出部分显示... */
  }
  .desc {
    font-size: 13px;
    color: #888;
  }
  .item-bottom {
    display: flex;
    margin-top: 28px;
  }
  .price {
    color: var(--color-high-text);
  }
  .count {
    position: relative;
    left:135px;

  }
</style>